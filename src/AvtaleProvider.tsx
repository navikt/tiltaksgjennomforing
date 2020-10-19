import { FeilVarselContext } from '@/FeilVarselProvider';
import { Avtale, GodkjentPaVegneGrunner, Maal } from '@/types/avtale';
import { ApiError, AutentiseringError, FeilkodeError, UfullstendigError } from '@/types/errors';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import { Maalkategori } from '@/types/maalkategorier';
import amplitude from '@/utils/amplitude';
import * as React from 'react';
import { FunctionComponent, useContext, useState } from 'react';
import OpphevGodkjenningerModal from './komponenter/modal/OpphevGodkjenningerModal';
import * as RestService from './services/rest-service';
import { Avtaleinnhold } from './types/avtale';
import { LogReturn } from 'amplitude-js';

export const noenHarGodkjentMenIkkeAlle = (avtale: Avtale) => {
    return (avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver) && !avtale.godkjentAvVeileder;
};

export interface TemporaryLagring {
    maal?: Maalkategori;
    maalTekst: string;
}

type SettAvtaleVerdi = <K extends keyof NonNullable<Avtaleinnhold>, T extends Avtaleinnhold>(
    felt: K,
    verdi: T[K]
) => void;

type SettFlereAvtaleVerdier = (endringer: Partial<Avtaleinnhold>) => void;

export interface Context {
    avtale: Avtale;
    overtaAvtale: () => Promise<void>;
    gjenopprettAvtale: () => Promise<void>;
    avbrytAvtale: (avbruttDato: string, avbruttGrunn: string) => Promise<void>;
    endretSteg: () => void;
    godkjenn: (godkjent: boolean) => Promise<void>;
    godkjennPaVegne: (paVegneGrunn: GodkjentPaVegneGrunner) => Promise<void>;
    ulagredeEndringer: boolean;
    hentAvtale: (avtaleId: string) => Promise<void>;
    lagreAvtale: () => Promise<void>;
    lagreMaal: (maal: Maal) => Promise<void>;
    setMellomLagring: (maalInput: TemporaryLagring | undefined) => void;
    mellomLagring: TemporaryLagring | undefined;
    settAvtaleVerdi: SettAvtaleVerdi;
    settAvtaleVerdier: SettFlereAvtaleVerdier;
    slettMaal: (maal: Maal) => Promise<void>;
    laasOpp: () => Promise<void>;
    utforHandlingHvisRedigerbar: (callback: () => void) => void;
}

export const AvtaleContext = React.createContext<Context>({} as Context);

const AvtaleProvider: FunctionComponent = props => {
    const [avtale, setAvtale] = useState<Avtale>({} as Avtale);
    const [ulagredeEndringer, setUlagredeEndringer] = useState(false);
    const [opphevGodkjenningerModalIsOpen, setOpphevGodkjenningerModalIsOpen] = useState(false);
    const visFeilmelding = useContext(FeilVarselContext);
    const [mellomLagring, setMellomLagring] = useState<TemporaryLagring>();

    const sendToAmplitude = (eventName: string): LogReturn =>
        amplitude.logEvent(eventName, {
            tiltakstype: avtale.tiltakstype,
        });

    const bekreftOpphevGodkjenninger = async (): Promise<void> => {
        await RestService.opphevGodkjenninger(avtale.id);
        await hentAvtale();
        setOpphevGodkjenningerModalIsOpen(false);
    };

    const lagreAvtale = async (nyAvtale = avtale): Promise<void> => {
        if (noenHarGodkjentMenIkkeAlle(avtale) && !ulagredeEndringer) {
            // Du har de siste endringene
        } else {
            const lagretAvtale = await RestService.lagreAvtale(nyAvtale);
            sendToAmplitude('#tiltak-avtale-lagret');
            setAvtale({ ...avtale, ...lagretAvtale });
            setUlagredeEndringer(false);
        }
    };

    const hentAvtale = (avtaleId: string = avtale.id): Promise<void> =>
        RestService.hentAvtale(avtaleId).then(setAvtale);

    const avbrytAvtale = async (avbruttDato: string, avbruttGrunn: string): Promise<void> => {
        await RestService.avbrytAvtale(avtale, avbruttDato, avbruttGrunn);
        sendToAmplitude('#tiltak-avtale-avbrutt');
        await hentAvtale();
    };

    const overtaAvtale = async (): Promise<void> => {
        await RestService.overtaAvtale(avtale.id);
        sendToAmplitude('#tiltak-avtale-overtatt');
        await hentAvtale();
    };

    const settAvtaleVerdi = <K extends keyof NonNullable<Avtaleinnhold>, T extends Avtaleinnhold>(
        felt: K,
        verdi: T[K]
    ): Avtale | undefined => {
        if (noenHarGodkjentMenIkkeAlle(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            const nyAvtale = { ...avtale, [felt]: verdi };
            setAvtale(nyAvtale);
            setUlagredeEndringer(true);
            return nyAvtale;
        }
    };

    const settAvtaleVerdier = (endringer: Partial<Avtale>): Avtale | undefined => {
        if (noenHarGodkjentMenIkkeAlle(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            const nyAvtale = { ...avtale, ...endringer };
            setAvtale(nyAvtale);
            setUlagredeEndringer(true);
            return nyAvtale;
        }
    };

    const laasOpp = async (): Promise<void> => {
        await RestService.låsOppAvtale(avtale.id);
        sendToAmplitude('#tiltak-avtale-laastOpp');
        await hentAvtale(avtale.id);
    };

    const gjenopprettAvtale = async (): Promise<void> => {
        await RestService.gjenopprettAvtale(avtale.id);
        sendToAmplitude('#tiltak-avtale-gjenopprettet');
        await hentAvtale(avtale.id);
    };

    const utforHandlingHvisRedigerbar = (callback: () => void): void => {
        if (noenHarGodkjentMenIkkeAlle(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            callback();
        }
    };

    const lagreMaal = (maalTilLagring: Maal): Promise<void> => {
        const nyeMaal = avtale.maal.filter((maal: Maal) => maal.id !== maalTilLagring.id);
        nyeMaal.push(maalTilLagring);
        const nyAvtale = settAvtaleVerdi('maal', nyeMaal);
        sendToAmplitude('#tiltak-avtale-maal-lagret');
        return lagreAvtale(nyAvtale);
    };

    const slettMaal = (maalTilSletting: Maal): Promise<void> => {
        const nyeMaal = avtale.maal.filter((maal: Maal) => maal.id !== maalTilSletting.id);
        const nyAvtale = settAvtaleVerdi('maal', nyeMaal);
        sendToAmplitude('#tiltak-avtale-maal-slettet');
        return lagreAvtale(nyAvtale);
    };

    const finnFeilkodeForFeilVedLagringAvtale = (
        error: FeilkodeError | AutentiseringError | ApiError | Error
    ): void => {
        switch (error.constructor) {
            case FeilkodeError:
                return visFeilmelding(Feilmeldinger[error.message as Feilkode]);
            case AutentiseringError:
                return visFeilmelding('Innloggingen din har utløpt. Ta vare på endringene dine og oppfrisk siden.');
            case ApiError:
            case UfullstendigError:
                return visFeilmelding(error.message);
            default:
                visFeilmelding('Det har skjedd en uventet feil');
                throw error;
        }
    };

    const finnFeilkodeForFeilVedHentingAvtale = (error: AutentiseringError | ApiError | Error): void => {
        switch (error.constructor) {
            case AutentiseringError:
                return window.location.reload();
            case ApiError:
                return visFeilmelding(error.message);
            default:
                throw error;
        }
    };

    const endretSteg = async (): Promise<void> => {
        if (ulagredeEndringer) {
            try {
                await lagreAvtale();
            } catch (error) {
                finnFeilkodeForFeilVedLagringAvtale(error);
            }
        } else {
            try {
                await hentAvtale(avtale.id);
            } catch (error) {
                finnFeilkodeForFeilVedHentingAvtale(error);
            }
        }
    };

    const godkjenn = async (): Promise<void> => {
        await RestService.godkjennAvtale(avtale);
        sendToAmplitude('#tiltak-avtale-godkjent');
        await hentAvtale(avtale.id);
    };

    const godkjennPaVegne = async (paVegneGrunn: GodkjentPaVegneGrunner): Promise<void> => {
        await RestService.godkjennAvtalePaVegne(avtale, paVegneGrunn);
        sendToAmplitude('#tiltak-avtale-godkjent-pavegneav');
        await hentAvtale(avtale.id);
    };

    const avtaleContext: Context = {
        avtale,
        settAvtaleVerdi: settAvtaleVerdi,
        settAvtaleVerdier: settAvtaleVerdier,
        hentAvtale,
        avbrytAvtale,
        lagreAvtale,
        overtaAvtale,
        laasOpp,
        gjenopprettAvtale,
        utforHandlingHvisRedigerbar,
        lagreMaal,
        slettMaal,
        endretSteg,
        godkjenn,
        godkjennPaVegne,
        ulagredeEndringer,
        mellomLagring,
        setMellomLagring,
    };

    return (
        <>
            <AvtaleContext.Provider value={avtaleContext}>{props.children}</AvtaleContext.Provider>
            <OpphevGodkjenningerModal
                modalIsOpen={opphevGodkjenningerModalIsOpen}
                bekreftOpphevGodkjenninger={bekreftOpphevGodkjenninger}
                lukkModal={() => setOpphevGodkjenningerModalIsOpen(false)}
            />
        </>
    );
};

export default AvtaleProvider;
