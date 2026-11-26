import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReactElement } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { endreInkluderingstilskudd } from '@/services/rest-service';
import { FeatureToggleContext, FeatureToggleProviderInitialState } from '@/FeatureToggles/FeatureToggleProvider';
import EndreInkluderingsutgifter from '../GodkjenningSteg/endringAvAvtaleInnhold/EndreInkluderingsutgifter/EndreInkluderingsutgifter';
import OpprettEnTilskuddsutgift from './OpprettEnTilskuddsutgift';
import TilskuddsutgiftSkjema, { TilskuddsutgiftSkjemaProps } from './TilskuddsutgiftSkjema';

vi.mock('@/AvtaleProvider', async () => {
    const { createContext } = await import('react');
    return {
        AvtaleContext: createContext({
            avtale: {
                gjeldendeInnhold: {
                    inkluderingstilskuddsutgift: [],
                    inkluderingstilskuddSats: 1000,
                },
            },
            hentAvtale: vi.fn().mockResolvedValue(undefined),
        }),
    };
});

vi.mock('@/services/rest-service', () => ({
    endreInkluderingstilskudd: vi.fn().mockResolvedValue(undefined),
}));

beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function () {
        this.open = true;
    };
    HTMLDialogElement.prototype.close = function () {
        this.open = false;
        this.dispatchEvent(new Event('close'));
    };
});

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

const skjemaProps: TilskuddsutgiftSkjemaProps = {
    leggTilTilskuddsutgift: vi.fn(),
    totalBeløp: 0,
    inkluderingstilskuddSats: 1000,
};

const renderMedFeatureToggle = (ui: ReactElement, inkluderingstilskuddAvtale = true) =>
    render(
        <FeatureToggleContext.Provider value={{ ...FeatureToggleProviderInitialState, inkluderingstilskuddAvtale }}>
            {ui}
        </FeatureToggleContext.Provider>,
    );

const fyllUtSkjema = (beløp = '100') => {
    fireEvent.change(screen.getByLabelText('Navn på utgift'), { target: { value: 'Arbeidssko' } });
    fireEvent.change(screen.getByLabelText('Kategori'), { target: { value: 'UTSTYR' } });
    fireEvent.change(screen.getByLabelText('Begrunnelse'), { target: { value: 'Tilpasset arbeidsplassen' } });
    const input = screen.getByLabelText('Beløp inntil');
    fireEvent.change(input, { target: { value: beløp } });
    fireEvent.blur(input);
};

describe('TilskuddsutgiftSkjema', () => {
    it('lagrer med bare kategori og beløp når inkluderingstilskuddAvtale er av', async () => {
        renderMedFeatureToggle(<TilskuddsutgiftSkjema {...skjemaProps} />, false);

        expect(screen.queryByLabelText('Navn på utgift')).toBeNull();
        expect(screen.queryByLabelText('Begrunnelse')).toBeNull();
        fireEvent.change(screen.getByLabelText('Kategori'), { target: { value: 'UTSTYR' } });
        const input = screen.getByLabelText('Beløp inntil');
        fireEvent.change(input, { target: { value: '100' } });
        fireEvent.blur(input);
        fireEvent.click(screen.getByRole('button', { name: 'Legg til utgift' }));

        await waitFor(() => expect(skjemaProps.leggTilTilskuddsutgift).toHaveBeenCalledWith('', 100, '', 'UTSTYR'));
    });

    it('krever kategori og beløp når inkluderingstilskuddAvtale er av', async () => {
        renderMedFeatureToggle(<TilskuddsutgiftSkjema {...skjemaProps} />, false);
        fireEvent.click(screen.getByRole('button', { name: 'Legg til utgift' }));

        expect(await screen.findByText('Vennligst velg en type utgift')).toBeTruthy();
        expect(screen.getByText('Vennligst oppgi et kostnadsoverslag')).toBeTruthy();
        expect(skjemaProps.leggTilTilskuddsutgift).not.toHaveBeenCalled();
    });

    it('åpner skjemaet i en modal fra steg og lukker etter lagring', async () => {
        renderMedFeatureToggle(
            <OpprettEnTilskuddsutgift
                {...skjemaProps}
                setIRedigeringsmodus={vi.fn()}
                iRegideringsmodus={false}
                tilskuddsutgift={[]}
            />,
        );
        expect(screen.queryByLabelText('Navn på utgift')).toBeNull();
        fireEvent.click(screen.getByRole('button', { name: 'Legg til utgift' }));
        expect(screen.getAllByRole('dialog')).toHaveLength(1);
        fyllUtSkjema();
        fireEvent.click(screen.getByRole('button', { name: 'Lagre' }));

        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
        expect(skjemaProps.leggTilTilskuddsutgift).toHaveBeenCalledWith(
            'Arbeidssko',
            100,
            'Tilpasset arbeidsplassen',
            'UTSTYR',
        );
    });

    it('viser skjemaet direkte i endringsmodalen og holder den åpen til Endre velges', async () => {
        renderMedFeatureToggle(<EndreInkluderingsutgifter />);
        fireEvent.click(screen.getByRole('menuitem', { name: 'Legg til inkluderings utgift' }));
        expect(screen.getAllByRole('dialog')).toHaveLength(1);
        fyllUtSkjema();
        fireEvent.click(screen.getByRole('button', { name: 'Legg til utgift' }));

        await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(2));
        expect(screen.getAllByRole('dialog')).toHaveLength(1);
        expect(endreInkluderingstilskudd).not.toHaveBeenCalled();
        expect((screen.getByLabelText('Navn på utgift') as HTMLInputElement).value).toBe('');
        expect((screen.getByLabelText('Beløp inntil') as HTMLInputElement).value).toBe('');

        fireEvent.click(screen.getByRole('button', { name: 'Endre' }));

        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
        expect(endreInkluderingstilskudd).toHaveBeenCalledWith(expect.anything(), [
            { navn: 'Arbeidssko', beløp: 100, beskrivelse: 'Tilpasset arbeidsplassen', type: 'UTSTYR' },
        ]);
    });

    it('viser påkrevde felt og avbryter uten å legge til en utgift', async () => {
        renderMedFeatureToggle(<TilskuddsutgiftSkjema {...skjemaProps} />);
        fireEvent.click(screen.getByRole('button', { name: 'Legg til utgift' }));

        expect(await screen.findByText('Vennligst oppgi et navn på utgiften')).toBeTruthy();
        expect(screen.getByText('Vennligst velg en type utgift')).toBeTruthy();
        expect(screen.getByText('Vennligst oppgi en beskrivelse')).toBeTruthy();
        expect(screen.getByText('Vennligst oppgi et kostnadsoverslag')).toBeTruthy();

        fyllUtSkjema();
        fireEvent.click(screen.getByRole('button', { name: 'Avbryt' }));

        await waitFor(() => expect((screen.getByLabelText('Navn på utgift') as HTMLInputElement).value).toBe(''));
        expect((screen.getByLabelText('Beløp inntil') as HTMLInputElement).value).toBe('');
        expect(skjemaProps.leggTilTilskuddsutgift).not.toHaveBeenCalled();
    });

    it.each(['100,50', '100.50'])('avviser desimalbeløpet %s med heltallsfeil', async (beløp) => {
        renderMedFeatureToggle(<TilskuddsutgiftSkjema {...skjemaProps} />);
        fyllUtSkjema(beløp);
        fireEvent.click(screen.getByRole('button', { name: 'Legg til utgift' }));

        expect(await screen.findByText('Beløp inntil må være et heltall')).toBeTruthy();
        expect(skjemaProps.leggTilTilskuddsutgift).not.toHaveBeenCalled();
    });

    it('avviser beløp over gjenværende sats og godtar den nøyaktige grensen', async () => {
        renderMedFeatureToggle(<TilskuddsutgiftSkjema {...skjemaProps} totalBeløp={900} />);
        fyllUtSkjema('101');
        fireEvent.click(screen.getByRole('button', { name: 'Legg til utgift' }));

        expect(await screen.findByText(/Det totale beløpet overskrider/)).toBeTruthy();
        expect(skjemaProps.leggTilTilskuddsutgift).not.toHaveBeenCalled();

        const input = screen.getByLabelText('Beløp inntil');
        fireEvent.change(input, { target: { value: '100' } });
        fireEvent.blur(input);
        fireEvent.click(screen.getByRole('button', { name: 'Legg til utgift' }));

        await waitFor(() =>
            expect(skjemaProps.leggTilTilskuddsutgift).toHaveBeenCalledWith(
                'Arbeidssko',
                100,
                'Tilpasset arbeidsplassen',
                'UTSTYR',
            ),
        );
    });
});
