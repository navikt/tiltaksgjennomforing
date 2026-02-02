import { FeilVarselContext } from '@/FeilVarselProvider';
import {
    Returårsaker,
    Avtale,
    Beregningsgrunnlag,
    GodkjentPaVegneAvArbeidsgiverGrunner,
    GodkjentPaVegneAvDeltakerGrunner,
    GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner,
    Maal,
} from '@/types/avtale';
import { ApiError, AutentiseringError } from '@/types/errors';
import { Maalkategori } from '@/types/maalkategorier';
import React, { FunctionComponent, PropsWithChildren, useContext, useState } from 'react';
import OpphevGodkjenningerModal from './komponenter/modal/OpphevGodkjenningerModal';
import { useAsyncError } from './komponenter/useError';
import * as RestService from './services/rest-service';
import { Avtaleinnhold } from './types/avtale';
import { handterFeil } from './utils/apiFeilUtils';

export const noenHarGodkjentMenIkkeInngått = (avtale: Avtale) => {
    const noenHarGodkjent = Boolean(
        avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver || avtale.godkjentAvVeileder,
    );
    return noenHarGodkjent && !avtale.erAvtaleInngått;
};

export interface TemporaryLagring {
    id?: string;
    kategori: Maalkategori;
    beskrivelse: string;
}

export type SettAvtaleInnholdVerdi = <K extends keyof NonNullable<Avtaleinnhold>, T extends Avtaleinnhold>(
    felt: K,
    verdi: T[K],
) => void;

export type SettFlereAvtaleInnholdVerdier = (endringer: Partial<Avtaleinnhold>, lagre?: boolean) => Avtale | undefined;
type SettOgKalkulerBeregningsverdier = (endringer: Partial<Beregningsgrunnlag>) => Promise<void>;

export interface Context {
    avtale: Avtale;
    overtaAvtale: () => Promise<void>;
    annullerAvtale: (annullerGrunn: string) => Promise<void>;
    endretSteg: () => void;
    godkjenn: () => Promise<void>;
    godkjennTilskudd: (enhet: string) => Promise<void>;
    returnerTilskuddsperiode: (returårsaker: Set<Returårsaker>, returforklaring: string) => Promise<void>;
    godkjennPaVegneAvDeltaker: (paVegneGrunn: GodkjentPaVegneAvDeltakerGrunner) => Promise<void>;
    godkjennPaVegneAvArbeidsgiver: (paVegneGrunn: GodkjentPaVegneAvArbeidsgiverGrunner) => Promise<void>;
    godkjennPaVegneAvDeltakerOgArbeidsgiver: (
        paVegneGrunn: GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner,
    ) => Promise<void>;
    ulagredeEndringer: boolean;
    hentAvtale: (avtaleId?: string) => Promise<void>;
    lagreAvtale: () => Promise<void>;
    lagreMaal: (maal: Maal) => Promise<void>;
    setMellomLagring: (maalInput: TemporaryLagring | undefined) => void;
    mellomLagring: TemporaryLagring | undefined;
    settOgKalkulerBeregningsverdier: SettOgKalkulerBeregningsverdier;
    settOgKalkulerMentorBeregningsverdier: SettOgKalkulerBeregningsverdier;
    settAvtaleInnholdVerdi: SettAvtaleInnholdVerdi;
    settAvtaleInnholdVerdier: SettFlereAvtaleInnholdVerdier;
    slettMaal: (maal: Maal) => Promise<void>;
    utforHandlingHvisRedigerbar: (callback: () => void) => void;
    sendTilbakeTilBeslutter: () => Promise<void>;
    oppdatereAvtaleContext: (oppdatertAvtale: Avtale) => void;
    oppdaterMentorFnr: (data: { mentorFnr: string }) => Promise<void>;
    underLagring: boolean;
}

export const AvtaleContext = React.createContext<Context>({} as Context);
export const useAvtale = () => useContext(AvtaleContext);

const AvtaleProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const throwError = useAsyncError();
    const [avtale, setAvtale] = useState<Avtale>({} as Avtale);
    const [ulagredeEndringer, setUlagredeEndringer] = useState(false);
    const [opphevGodkjenningerModalIsOpen, setOpphevGodkjenningerModalIsOpen] = useState(false);
    const visFeilmelding = useContext(FeilVarselContext);
    const [mellomLagring, setMellomLagring] = useState<TemporaryLagring | undefined>(undefined);
    const [underLagring, setUnderLagring] = useState(false);

    const bekreftOpphevGodkjenninger = async (): Promise<void> => {
        await RestService.opphevGodkjenninger(avtale);
        await hentAvtale();
        setOpphevGodkjenningerModalIsOpen(false);
    };

    const lagreAvtale = async (nyAvtale = avtale, forceLagring = false): Promise<void> => {
        if (underLagring) {
            return;
        }
        if (noenHarGodkjentMenIkkeInngått(avtale) && !ulagredeEndringer) {
            return;
        }
        if (!forceLagring && !ulagredeEndringer) {
            return;
        }
        setUnderLagring(true);
        try {
            const lagretAvtale = await RestService.lagreAvtale(nyAvtale);
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
        const annullertAvtale = await RestService.annullerAvtale(avtale, annullerGrunn);
        setAvtale(annullertAvtale);
    };

    const overtaAvtale = async (): Promise<void> => {
        await RestService.overtaAvtale(avtale);
        await hentAvtale();
    };

    const settAvtaleInnholdVerdi = <K extends keyof NonNullable<Avtaleinnhold>, T extends Avtaleinnhold>(
        felt: K,
        verdi: T[K],
    ): Avtale | undefined => {
        if (noenHarGodkjentMenIkkeInngått(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            const nyAvtale = { ...avtale, gjeldendeInnhold: { ...avtale.gjeldendeInnhold, [felt]: verdi } };
            setAvtale(nyAvtale);
            setUlagredeEndringer(true);
            return nyAvtale;
        }
    };

    const settAvtaleInnholdVerdier = (endringer: Partial<Avtaleinnhold>, lagre = false): Avtale | undefined => {
        if (noenHarGodkjentMenIkkeInngått(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            const nyAvtale = { ...avtale, gjeldendeInnhold: { ...avtale.gjeldendeInnhold, ...endringer } };
            setAvtale(nyAvtale);
            setUlagredeEndringer(true);
            if (lagre) {
                lagreAvtale(nyAvtale, true);
            }
            return nyAvtale;
        }
    };

    const settOgKalkulerBeregningsverdier = async (endringer: Partial<Beregningsgrunnlag>) => {
        if (noenHarGodkjentMenIkkeInngått(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            try {
                const nyAvtale = { ...avtale, gjeldendeInnhold: { ...avtale.gjeldendeInnhold, ...endringer } };
                settAvtaleInnholdVerdier(endringer);
                const avtaleEtterDryRun = await RestService.lagreAvtaleDryRun(nyAvtale);
                settAvtaleInnholdVerdier(avtaleEtterDryRun.gjeldendeInnhold);
            } catch (error: any) {
                handterFeil(error, visFeilmelding);
            }
        }
    };

    const settOgKalkulerMentorBeregningsverdier = async (endringer: Partial<Beregningsgrunnlag>) => {
        if (noenHarGodkjentMenIkkeInngått(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            try {
                const nyAvtale = { ...avtale, gjeldendeInnhold: { ...avtale.gjeldendeInnhold, ...endringer } };
                settAvtaleInnholdVerdier(endringer);
                const avtaleEtterDryRun = await RestService.lagreAvtaleDryRun(nyAvtale);
                const { mentorTimelonn, feriepengerBelop, otpBelop, arbeidsgiveravgiftBelop, sumLonnsutgifter } =
                    avtaleEtterDryRun.gjeldendeInnhold;
                settAvtaleInnholdVerdier({
                    ...endringer,
                    mentorTimelonn,
                    feriepengerBelop,
                    otpBelop,
                    arbeidsgiveravgiftBelop,
                    sumLonnsutgifter,
                });
            } catch (error: any) {
                handterFeil(error, visFeilmelding);
            }
        }
    };

    const utforHandlingHvisRedigerbar = (callback: () => void): void => {
        if (noenHarGodkjentMenIkkeInngått(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            callback();
        }
    };

    const lagreMaal = (maalTilLagring: Maal): Promise<void> => {
        const nyeMaal = avtale.gjeldendeInnhold.maal.filter((maal: Maal) => maal.id !== maalTilLagring.id);
        nyeMaal.push(maalTilLagring);
        const nyAvtale = settAvtaleInnholdVerdi('maal', nyeMaal);
        return lagreAvtale(nyAvtale);
    };

    const slettMaal = (maalTilSletting: Maal): Promise<void> => {
        const nyeMaal = avtale.gjeldendeInnhold.maal.filter((maal: Maal) => maal.id !== maalTilSletting.id);
        const nyAvtale = settAvtaleInnholdVerdi('maal', nyeMaal);
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
        await hentAvtale(avtale.id);
    };

    const godkjennTilskudd = async (enhet: string): Promise<void> => {
        await RestService.godkjennTilskuddsperiode(avtale, enhet);
        await hentAvtale(avtale.id);
    };

    const returnerTilskuddsperiode = async (
        returårsaker: Set<Returårsaker>,
        returforklaring: string,
    ): Promise<void> => {
        await RestService.returnerTilskuddsperiode(avtale, returårsaker, returforklaring);
        await hentAvtale(avtale.id);
    };

    const godkjennPaVegneAvDeltaker = async (paVegneGrunn: GodkjentPaVegneAvDeltakerGrunner): Promise<void> => {
        await RestService.godkjennAvtalePaVegne(avtale, paVegneGrunn);
        await hentAvtale(avtale.id);
    };
    const godkjennPaVegneAvArbeidsgiver = async (paVegneGrunn: GodkjentPaVegneAvArbeidsgiverGrunner): Promise<void> => {
        await RestService.godkjennAvtalePaVegneAvArbeidsgiver(avtale, paVegneGrunn);
        await hentAvtale(avtale.id);
    };
    const godkjennPaVegneAvDeltakerOgArbeidsgiver = async (
        paVegneGrunn: GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner,
    ): Promise<void> => {
        await RestService.godkjennAvtalePaVegneAvDeltakerOgArbeidsgiver(avtale, paVegneGrunn);
        await hentAvtale(avtale.id);
    };

    const sendTilbakeTilBeslutter = async () => {
        await RestService.sendTilbakeTilBeslutter(avtale);
        await hentAvtale(avtale.id);
    };

    // TODO: Fjern etter migreringsjobb er ferdig og ingen mentorfnr mangler
    const oppdaterMentorFnr = async (data: { mentorFnr: string }) => {
        setUnderLagring(true);
        try {
            const oppdatertAvtale = await RestService.oppdaterMentorFnr(avtale.id, {
                sistEndret: avtale.sistEndret,
                mentorFnr: data.mentorFnr,
            });
            setAvtale({
                ...avtale,
                sistEndret: oppdatertAvtale.sistEndret,
                mentorFnr: oppdatertAvtale.mentorFnr,
                gjeldendeInnhold: {
                    ...avtale.gjeldendeInnhold,
                    mentorFornavn: oppdatertAvtale.gjeldendeInnhold.mentorFornavn,
                    mentorEtternavn: oppdatertAvtale.gjeldendeInnhold.mentorEtternavn,
                },
            });
        } finally {
            setUnderLagring(false);
        }
    };

    const avtaleContext: Context = {
        avtale,
        settAvtaleInnholdVerdi,
        settOgKalkulerBeregningsverdier,
        settOgKalkulerMentorBeregningsverdier,
        settAvtaleInnholdVerdier,
        hentAvtale,
        annullerAvtale,
        lagreAvtale,
        overtaAvtale,
        utforHandlingHvisRedigerbar,
        lagreMaal,
        slettMaal,
        endretSteg,
        godkjenn,
        godkjennPaVegneAvDeltaker,
        godkjennPaVegneAvArbeidsgiver,
        godkjennPaVegneAvDeltakerOgArbeidsgiver,
        godkjennTilskudd,
        returnerTilskuddsperiode,
        ulagredeEndringer,
        mellomLagring,
        setMellomLagring,
        sendTilbakeTilBeslutter,
        oppdatereAvtaleContext,
        oppdaterMentorFnr,
        underLagring,
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
