import { FeilVarselContext } from '@/FeilVarselProvider';
import {
    Avslagsårsaker,
    Avtale,
    Beregningsgrunnlag,
    GodkjentPaVegneAvArbeidsgiverGrunner,
    GodkjentPaVegneAvDeltakerGrunner,
    GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner,
    Maal,
} from '@/types/avtale';
import { ApiError, AutentiseringError } from '@/types/errors';
import { Maalkategori } from '@/types/maalkategorier';
import amplitude from '@/utils/amplitude';
import { LogReturn } from 'amplitude-js';
import React, { FunctionComponent, useContext, useState } from 'react';
import OpphevGodkjenningerModal from './komponenter/modal/OpphevGodkjenningerModal';
import { useAsyncError } from './komponenter/useError';
import * as RestService from './services/rest-service';
import { Avtaleinnhold } from './types/avtale';
import { handterFeil } from './utils/apiFeilUtils';

export const noenHarGodkjentMenIkkeAlle = (avtale: Avtale) => {
    return Boolean(avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver) && !avtale.godkjentAvVeileder;
};

export interface TemporaryLagring {
    id?: string;
    kategori: Maalkategori;
    beskrivelse: string;
}

export type SettAvtaleVerdi = <K extends keyof NonNullable<Avtaleinnhold>, T extends Avtaleinnhold>(
    felt: K,
    verdi: T[K]
) => void;

export type SettFlereAvtaleVerdier = (endringer: Partial<Avtaleinnhold>, lagre?: boolean) => Avtale | undefined;
type SettOgKalkulerBeregningsverdier = (endringer: Partial<Beregningsgrunnlag>) => Promise<void>;

export interface Context {
    avtale: Avtale;
    overtaAvtale: () => Promise<void>;
    gjenopprettAvtale: () => Promise<void>;
    annullerAvtale: (annullerGrunn: string) => Promise<void>;
    avbrytAvtale: (avbruttDato: string, avbruttGrunn: string) => Promise<void>;
    endretSteg: () => void;
    godkjenn: () => Promise<void>;
    godkjennTilskudd: (enhet: string) => Promise<void>;
    avslåTilskudd: (avslagsårsaker: Set<Avslagsårsaker>, avslagsforklaring: string) => Promise<void>;
    godkjennPaVegneAvDeltaker: (paVegneGrunn: GodkjentPaVegneAvDeltakerGrunner) => Promise<void>;
    godkjennPaVegneAvArbeidsgiver: (paVegneGrunn: GodkjentPaVegneAvArbeidsgiverGrunner) => Promise<void>;
    godkjennPaVegneAvDeltakerOgArbeidsgiver: (
        paVegneGrunn: GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner
    ) => Promise<void>;
    ulagredeEndringer: boolean;
    hentAvtale: (avtaleId?: string) => Promise<void>;
    lagreAvtale: () => Promise<void>;
    lagreMaal: (maal: Maal) => Promise<void>;
    setMellomLagring: (maalInput: TemporaryLagring | undefined) => void;
    mellomLagring: TemporaryLagring | undefined;
    settOgKalkulerBeregningsverdier: SettOgKalkulerBeregningsverdier;
    settAvtaleVerdi: SettAvtaleVerdi;
    settAvtaleVerdier: SettFlereAvtaleVerdier;
    slettMaal: (maal: Maal) => Promise<void>;
    laasOpp: () => Promise<void>;
    utforHandlingHvisRedigerbar: (callback: () => void) => void;
    sendTilbakeTilBeslutter: () => Promise<void>;
    oppdatereAvtaleContext: (oppdatertAvtale: Avtale) => void;
}

export const AvtaleContext = React.createContext<Context>({} as Context);

const AvtaleProvider: FunctionComponent = (props) => {
    const throwError = useAsyncError();
    const [avtale, setAvtale] = useState<Avtale>({} as Avtale);
    const [ulagredeEndringer, setUlagredeEndringer] = useState(false);
    const [opphevGodkjenningerModalIsOpen, setOpphevGodkjenningerModalIsOpen] = useState(false);
    const visFeilmelding = useContext(FeilVarselContext);
    const [mellomLagring, setMellomLagring] = useState<TemporaryLagring | undefined>(undefined);
    const [underLagring, setUnderLagring] = useState(false);

    const sendToAmplitude = (eventName: string): LogReturn =>
        amplitude.logEvent(eventName, {
            tiltakstype: avtale.tiltakstype,
        });

    const bekreftOpphevGodkjenninger = async (): Promise<void> => {
        await RestService.opphevGodkjenninger(avtale.id);
        await hentAvtale();
        setOpphevGodkjenningerModalIsOpen(false);
    };

    const lagreAvtale = async (nyAvtale = avtale, forceLagring = false): Promise<void> => {
        if (underLagring) {
            return;
        }
        if (noenHarGodkjentMenIkkeAlle(avtale) && !ulagredeEndringer) {
            return;
        }
        if (!forceLagring && !ulagredeEndringer) {
            return;
        }
        setUnderLagring(true);
        try {
            const lagretAvtale = await RestService.lagreAvtale(nyAvtale);
            sendToAmplitude('#tiltak-avtale-lagret');
            setAvtale({ ...avtale, ...lagretAvtale });
            setUlagredeEndringer(false);
            setUnderLagring(false);
        } finally {
            setUnderLagring(false);
        }
    };

    const oppdatereAvtaleContext = (oppdatertAvtale: Avtale): void => setAvtale(oppdatertAvtale);

    const hentAvtale = (avtaleId: string = avtale.id): Promise<void> =>
        RestService.hentAvtale(avtaleId).then(setAvtale);

    const annullerAvtale = async (annullerGrunn: string): Promise<void> => {
        await RestService.annullerAvtale(avtale, annullerGrunn);
        sendToAmplitude('#tiltak-avtale-annullert');
        await hentAvtale();
    };

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

    const settAvtaleVerdier = (endringer: Partial<Avtale>, lagre = false): Avtale | undefined => {
        if (noenHarGodkjentMenIkkeAlle(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            const nyAvtale = { ...avtale, ...endringer };
            setAvtale(nyAvtale);
            setUlagredeEndringer(true);
            if (lagre) {
                lagreAvtale(nyAvtale, true);
            }
            return nyAvtale;
        }
    };

    const settOgKalkulerBeregningsverdier = async (endringer: Partial<Beregningsgrunnlag>) => {
        if (noenHarGodkjentMenIkkeAlle(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            try {
                const nyAvtale = { ...avtale, ...endringer };
                settAvtaleVerdier(nyAvtale);
                const etterDryRun = await RestService.lagreAvtaleDryRun(nyAvtale);
                settAvtaleVerdier(etterDryRun);
            } catch (error: any) {
                handterFeil(error, visFeilmelding);
            }
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

    const finnFeilkodeForFeilVedHentingAvtale = (error: AutentiseringError | ApiError | Error): void => {
        switch (error.constructor) {
            case AutentiseringError:
                return window.location.reload();
            case ApiError:
                return visFeilmelding(error.message || 'Det har skjedd en uventet feil');
            default:
                throwError(error);
        }
    };

    const endretSteg = async (): Promise<void> => {
        if (ulagredeEndringer) {
            try {
                await lagreAvtale();
            } catch (error: any) {
                handterFeil(error, visFeilmelding);
            }
        } else {
            try {
                await hentAvtale(avtale.id);
            } catch (error: any) {
                finnFeilkodeForFeilVedHentingAvtale(error);
            }
        }
    };

    const godkjenn = async (): Promise<void> => {
        await RestService.godkjennAvtale(avtale);
        sendToAmplitude('#tiltak-avtale-godkjent');
        await hentAvtale(avtale.id);
    };

    const godkjennTilskudd = async (enhet: string): Promise<void> => {
        await RestService.godkjennTilskuddsperiode(avtale.id, enhet);
        sendToAmplitude('#tiltak-tilskudd-godkjent');
        await hentAvtale(avtale.id);
    };

    const avslåTilskudd = async (avslagsårsaker: Set<Avslagsårsaker>, avslagsforklaring: string): Promise<void> => {
        await RestService.avslåTilskuddsperiode(avtale.id, avslagsårsaker, avslagsforklaring);
        sendToAmplitude('#tiltak-tilskudd-avslag');
        await hentAvtale(avtale.id);
    };

    const godkjennPaVegneAvDeltaker = async (paVegneGrunn: GodkjentPaVegneAvDeltakerGrunner): Promise<void> => {
        await RestService.godkjennAvtalePaVegne(avtale, paVegneGrunn);
        sendToAmplitude('#tiltak-avtale-godkjent-pavegneav');
        await hentAvtale(avtale.id);
    };
    const godkjennPaVegneAvArbeidsgiver = async (paVegneGrunn: GodkjentPaVegneAvArbeidsgiverGrunner): Promise<void> => {
        await RestService.godkjennAvtalePaVegneAvArbeidsgiver(avtale, paVegneGrunn);
        sendToAmplitude('#tiltak-avtale-godkjent-pavegneav-ag');
        await hentAvtale(avtale.id);
    };
    const godkjennPaVegneAvDeltakerOgArbeidsgiver = async (
        paVegneGrunn: GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner
    ): Promise<void> => {
        await RestService.godkjennAvtalePaVegneAvDeltakerOgArbeidsgiver(avtale, paVegneGrunn);
        sendToAmplitude('#tiltak-avtale-godkjent-pavegneav-deltaker-og-ag');
        await hentAvtale(avtale.id);
    };

    const sendTilbakeTilBeslutter = async () => {
        await RestService.sendTilbakeTilBeslutter(avtale);
        await hentAvtale(avtale.id);
    };

    const avtaleContext: Context = {
        avtale,
        settAvtaleVerdi,
        settOgKalkulerBeregningsverdier,
        settAvtaleVerdier: settAvtaleVerdier,
        hentAvtale,
        annullerAvtale,
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
        godkjennPaVegneAvDeltaker,
        godkjennPaVegneAvArbeidsgiver,
        godkjennPaVegneAvDeltakerOgArbeidsgiver,
        godkjennTilskudd,
        avslåTilskudd,
        ulagredeEndringer,
        mellomLagring,
        setMellomLagring,
        sendTilbakeTilBeslutter,
        oppdatereAvtaleContext,
    };

    return (
        <>
            <AvtaleContext.Provider value={avtaleContext}>{props.children}</AvtaleContext.Provider>
            <div aria-hidden={!opphevGodkjenningerModalIsOpen}>
                <OpphevGodkjenningerModal
                    modalIsOpen={opphevGodkjenningerModalIsOpen}
                    bekreftOpphevGodkjenninger={bekreftOpphevGodkjenninger}
                    lukkModal={() => setOpphevGodkjenningerModalIsOpen(false)}
                />
            </div>
        </>
    );
};

export default AvtaleProvider;
