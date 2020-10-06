import { FeilVarselContext } from '@/FeilVarselProvider';
import { AltAvtaleinnhold, Avtale, GodkjentPaVegneGrunner, Maal } from '@/types/avtale';
import { ApiError, AutentiseringError, FeilkodeError, UfullstendigError } from '@/types/errors';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import { Maalkategori } from '@/types/maalkategorier';
import amplitude from '@/utils/amplitude';
import * as React from 'react';
import { FunctionComponent, useContext, useState } from 'react';
import OpphevGodkjenningerModal from './komponenter/modal/OpphevGodkjenningerModal';
import * as RestService from './services/rest-service';
import { FellesAvtaleinnhold } from './types/avtale';

export const noenHarGodkjentMenIkkeAlle = (avtale: Avtale<FellesAvtaleinnhold>) => {
    return (avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver) && !avtale.godkjentAvVeileder;
};

export interface TemporaryLagring {
    maal?: Maalkategori;
    maalTekst: string;
}

type SettAvtaleVerdi<K extends keyof Avtale> = (felt: K, verdi: Avtale[K]) => void;

type SettFlereAvtaleVerdier = (endringer: Partial<Avtale>) => void;

export interface Context {
    avtale: Avtale<AltAvtaleinnhold>;
    overtaAvtale: () => Promise<void>;
    gjenopprettAvtale: () => Promise<void>;
    avbrytAvtale: (avbruttDato: string, avbruttGrunn: string) => Promise<any>;
    endretSteg: () => void;
    godkjenn: (godkjent: boolean) => Promise<any>;
    godkjennPaVegne: (paVegneGrunn: GodkjentPaVegneGrunner) => Promise<any>;
    ulagredeEndringer: boolean;
    hentAvtale: (avtaleId: string) => Promise<any>;
    lagreAvtale: () => Promise<any>;
    lagreMaal: (maal: Maal) => Promise<any>;
    setMellomLagring: (maalInput: TemporaryLagring | undefined) => void;
    mellomLagring: TemporaryLagring | undefined;
    settAvtaleVerdi: SettAvtaleVerdi<any>;
    settAvtaleVerdier: SettFlereAvtaleVerdier;
    slettMaal: (maal: Maal) => Promise<any>;
    laasOpp: () => Promise<any>;
    utforHandlingHvisRedigerbar: (callback: () => void) => void;
}

export const AvtaleContext = React.createContext<Context>({} as Context);

const AvtaleProvider: FunctionComponent = props => {
    const [avtale, setAvtale] = useState<Avtale>({} as Avtale);
    const [ulagredeEndringer, setUlagredeEndringer] = useState(false);
    const [opphevGodkjenningerModalIsOpen, setOpphevGodkjenningerModalIsOpen] = useState(false);
    const visFeilmelding = useContext(FeilVarselContext);
    const [mellomLagring, setMellomLagring] = useState<TemporaryLagring>();

    const sendToAmplitude = (eventName: string) =>
        amplitude.logEvent(eventName, {
            tiltakstype: avtale.tiltakstype,
        });

    const bekreftOpphevGodkjenninger = async () => {
        await RestService.opphevGodkjenninger(avtale.id);
        await hentAvtale();
        setOpphevGodkjenningerModalIsOpen(false);
    };

    const lagreAvtale = async (nyAvtale = avtale) => {
        if (noenHarGodkjentMenIkkeAlle(avtale) && !ulagredeEndringer) {
            // Du har de siste endringene
        } else {
            const lagretAvtale = await RestService.lagreAvtale(nyAvtale);
            sendToAmplitude('#tiltak-avtale-lagret');
            setAvtale({ ...avtale, ...lagretAvtale });
            setUlagredeEndringer(false);
        }
    };

    const hentAvtale = (avtaleId: string = avtale.id) => RestService.hentAvtale(avtaleId).then(setAvtale);

    const avbrytAvtale = async (avbruttDato: string, avbruttGrunn: string) => {
        await RestService.avbrytAvtale(avtale, avbruttDato, avbruttGrunn);
        sendToAmplitude('#tiltak-avtale-avbrutt');
        await hentAvtale();
    };

    const overtaAvtale = async () => {
        await RestService.overtaAvtale(avtale.id);
        sendToAmplitude('#tiltak-avtale-overtatt');
        await hentAvtale();
    };

    /**
     * @deprecated Bruk heller settAvtaleVerdier, som har bedre typesetting
     */
    const settAvtaleVerdi = (felt: keyof Avtale, verdi: any) => {
        if (noenHarGodkjentMenIkkeAlle(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            const nyAvtale = { ...avtale, [felt]: verdi };
            setAvtale(nyAvtale);
            setUlagredeEndringer(true);
            return nyAvtale;
        }
    };

    const settAvtaleVerdier = (endringer: Partial<Avtale>) => {
        if (noenHarGodkjentMenIkkeAlle(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            const nyAvtale = { ...avtale, ...endringer };
            setAvtale(nyAvtale);
            setUlagredeEndringer(true);
            return nyAvtale;
        }
    };

    const laasOpp = async () => {
        await RestService.låsOppAvtale(avtale.id);
        sendToAmplitude('#tiltak-avtale-laastOpp');
        await hentAvtale(avtale.id);
    };

    const gjenopprettAvtale = async () => {
        await RestService.gjenopprettAvtale(avtale.id);
        sendToAmplitude('#tiltak-avtale-gjenopprettet');
        await hentAvtale(avtale.id);
    };

    const utforHandlingHvisRedigerbar = (callback: () => void) => {
        if (noenHarGodkjentMenIkkeAlle(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            callback();
        }
    };

    const lagreMaal = (maalTilLagring: Maal) => {
        const nyeMaal = avtale.maal.filter((maal: Maal) => maal.id !== maalTilLagring.id);
        nyeMaal.push(maalTilLagring);
        const nyAvtale = settAvtaleVerdi('maal', nyeMaal);
        sendToAmplitude('#tiltak-avtale-maal-lagret');
        return lagreAvtale(nyAvtale);
    };

    const slettMaal = (maalTilSletting: Maal) => {
        const nyeMaal = avtale.maal.filter((maal: Maal) => maal.id !== maalTilSletting.id);
        const nyAvtale = settAvtaleVerdi('maal', nyeMaal);
        sendToAmplitude('#tiltak-avtale-maal-slettet');
        return lagreAvtale(nyAvtale);
    };

    const endretSteg = async () => {
        if (ulagredeEndringer) {
            try {
                await lagreAvtale();
            } catch (error) {
                if (error instanceof FeilkodeError) {
                    visFeilmelding(Feilmeldinger[error.message as Feilkode]);
                } else if (error instanceof AutentiseringError) {
                    // Ikke logget inn
                    visFeilmelding('Innloggingen din har utløpt. Ta vare på endringene dine og oppfrisk siden.');
                } else if (error instanceof ApiError || error instanceof UfullstendigError) {
                    visFeilmelding(error.message);
                } else {
                    visFeilmelding('Det har skjedd en uventet feil');
                    throw error;
                }
            }
        } else {
            try {
                await hentAvtale(avtale.id);
            } catch (error) {
                if (error instanceof AutentiseringError) {
                    // Ikke logget inn
                    window.location.reload();
                } else if (error instanceof ApiError) {
                    visFeilmelding(error.message);
                } else {
                    throw error;
                }
            }
        }
    };

    const godkjenn = async () => {
        await RestService.godkjennAvtale(avtale);
        sendToAmplitude('#tiltak-avtale-godkjent');
        await hentAvtale(avtale.id);
    };

    const godkjennPaVegne = async (paVegneGrunn: GodkjentPaVegneGrunner) => {
        await RestService.godkjennAvtalePaVegne(avtale, paVegneGrunn);
        sendToAmplitude('#tiltak-avtale-godkjent-pavegneav');
        await hentAvtale(avtale.id);
    };

    const avtaleContext: Context = {
        avtale,
        settAvtaleVerdi,
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
