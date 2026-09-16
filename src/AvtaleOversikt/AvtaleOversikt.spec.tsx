import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { FunctionComponent, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { PageableAvtale, PageableAvtalelisteRessurs } from '@/types/avtale';
import { ApiError } from '@/types/errors';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Status } from '@/types/nettressurs';

import AvtaleOversikt from './AvtaleOversikt';
import { FiltreringContext } from './Filtrering/FiltreringProvider';

/**
 * Låser kontrollflyten i useEffect-en i AvtaleOversikt.
 *
 * To ting testes:
 *
 * 1. Mangler `sokId` i url'en er GET-søkene umulige. Før falt koden gjennom til
 *    `searchParams.get('sokId')!` og sendte null til backend, som svarte 400.
 *    Nå skal POST-grenen ta over og skaffe en ny sokId.
 *
 * 2. Begge GET-grenene må ha .catch. Uten den ble `nettressursCtx` stående på
 *    LASTER_INN for alltid, og vakten øverst i effekten hindret ethvert forsøk
 *    på å komme videre. Tabellen hang i skeleton uten feilmelding.
 */

vi.mock('@/komponenter/Banner/Banner', () => ({ default: () => null }));
vi.mock('@/komponenter/Banner/BannerNAVAnsatt', () => ({ default: () => null }));

vi.mock('@/services/rest-service', async (importOriginal) => ({
    ...(await importOriginal<typeof import('@/services/rest-service')>()),
    hentAvtalerForInnloggetBrukerMedPost: vi.fn(),
    hentAvtalerForInnloggetBrukerMedSokId: vi.fn(),
    hentUlesteVarsler: vi.fn(),
}));

const {
    hentAvtalerForInnloggetBrukerMedPost: hentMedPost,
    hentAvtalerForInnloggetBrukerMedSokId: hentMedSokId,
    hentUlesteVarsler,
} = vi.mocked(await import('@/services/rest-service'));

const veileder: InnloggetBruker = {
    identifikator: 'Z123456',
    erNavAnsatt: true,
    rolle: 'VEILEDER',
    altinnTilganger: { hierarki: [], tilganger: {} },
    navEnheter: [],
};

const lagSvar = (overstyr: Partial<PageableAvtale> = {}): PageableAvtale => ({
    currentPage: 0,
    avtaler: [],
    size: 10,
    totalItems: 0,
    totalPages: 1,
    sokId: 'sok-1',
    sokeParametere: {},
    sorteringskolonne: 'sistEndret',
    sorteringOrder: 'DESC',
    ...overstyr,
});

/** Minimal stand-in for FiltreringProvider, slik at setterne faktisk oppdaterer state. */
const Testoppsett: FunctionComponent<{ startFiltre: Filtrering; startRessurs: PageableAvtalelisteRessurs }> = (
    props,
) => {
    const [filtre, setFiltre] = useState<Filtrering>(props.startFiltre);
    const [ressurs, setRessurs] = useState<PageableAvtalelisteRessurs>(props.startRessurs);

    return (
        <FiltreringContext.Provider value={[filtre, setFiltre, ressurs, setRessurs]}>
            <span data-testid="status">{Status[ressurs.status]}</span>
            <AvtaleOversikt />
        </FiltreringContext.Provider>
    );
};

const rendre = (url: string, startFiltre: Filtrering, data: PageableAvtale) =>
    render(
        <CookiesProvider>
            <MemoryRouter initialEntries={[url]} useTransitions={false}>
                <InnloggetBrukerContext.Provider value={veileder}>
                    <Testoppsett startFiltre={startFiltre} startRessurs={{ status: Status.LASTET, data }} />
                </InnloggetBrukerContext.Provider>
            </MemoryRouter>
        </CookiesProvider>,
    );

const status = () => screen.getByTestId('status').textContent;

const standardFiltre: Filtrering = { page: '1', sorteringskolonne: 'sistEndret', sorteringOrder: 'DESC' };

beforeEach(() => {
    vi.clearAllMocks();
    hentUlesteVarsler.mockResolvedValue([]);
});

afterEach(cleanup);

describe('AvtaleOversikt uten sokId i url', () => {
    it('faller tilbake til POST i stedet for å kalle GET med null', async () => {
        hentMedPost.mockResolvedValue(lagSvar({ sokId: 'sok-ny' }));

        rendre('/?page=1&sorteringskolonne=sistEndret&sorteringOrder=DESC', standardFiltre, lagSvar());

        await waitFor(() => expect(hentMedPost).toHaveBeenCalledTimes(1));
        expect(hentMedSokId).not.toHaveBeenCalled();
    });

    it('ender i LASTET, ikke hengende LASTER_INN', async () => {
        hentMedPost.mockResolvedValue(lagSvar({ sokId: 'sok-ny' }));

        rendre('/?page=1&sorteringskolonne=sistEndret&sorteringOrder=DESC', standardFiltre, lagSvar());

        await waitFor(() => expect(status()).toBe('LASTET'));
    });
});

describe('AvtaleOversikt når GET-søket feiler', () => {
    it('setter FEIL når page er endret (GET-gren for page/sortering)', async () => {
        hentMedSokId.mockRejectedValue(new ApiError('Baksystemet svarte ikke'));

        rendre(
            '/?sokId=sok-1&page=2&sorteringskolonne=sistEndret&sorteringOrder=DESC',
            { ...standardFiltre, page: '2' },
            lagSvar(),
        );

        await waitFor(() => expect(hentMedSokId).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(status()).toBe('FEIL'));
    });

    it('setter FEIL ved navigering til en annen sokId (GET-gren for navigering)', async () => {
        hentMedSokId.mockRejectedValue(new ApiError('Baksystemet svarte ikke'));

        rendre(
            '/?sokId=sok-2&page=1&sorteringskolonne=sistEndret&sorteringOrder=DESC',
            standardFiltre,
            lagSvar({ sokId: 'sok-1' }),
        );

        await waitFor(() => expect(hentMedSokId).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(status()).toBe('FEIL'));
    });

    it('viser ikke skeleton etter at feilen er håndtert', async () => {
        hentMedSokId.mockRejectedValue(new ApiError('Baksystemet svarte ikke'));

        rendre(
            '/?sokId=sok-1&page=2&sorteringskolonne=sistEndret&sorteringOrder=DESC',
            { ...standardFiltre, page: '2' },
            lagSvar(),
        );

        await waitFor(() => expect(status()).toBe('FEIL'));
        expect(screen.queryByTestId('avtale-oversikt-skeleton')).toBeNull();
    });
});
