import { Avtale, GodkjentPaVegneGrunner, Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import OpphevGodkjenningerModal from './komponenter/modal/OpphevGodkjenningerModal';
import * as RestService from './services/rest-service';
import amplitude from '@/utils/amplitude';

export const noenHarGodkjentMenIkkeAlle = (avtale: Avtale) => {
    return (avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver) && !avtale.godkjentAvVeileder;
};

export interface TemporaryLagring {
    maal?: Maalkategori;
    maalTekst: string;
}

const tomTemporaryLagring: TemporaryLagring = {
    maal: undefined,
    maalTekst: '',
};

type SettAvtaleVerdi<K extends keyof Avtale> = (felt: K, verdi: Avtale[K]) => void;

interface Context {
    avtale: Avtale;
    overtaAvtale: () => Promise<void>;
    gjenopprettAvtale: () => Promise<void>;
    avbrytAvtale: (avbruttDato: string, avbruttGrunn: string) => Promise<any>;
    endretSteg: () => void;
    godkjenn: (godkjent: boolean) => Promise<any>;
    godkjennPaVegne: (paVegneGrunn: GodkjentPaVegneGrunner) => Promise<any>;
    harUlagredeEndringer: () => boolean;
    hentAvtale: (avtaleId: string) => Promise<any>;
    lagreAvtale: () => Promise<any>;
    lagreMaal: (maal: Maal) => Promise<any>;
    mellomLagreMaal: (maalInput: TemporaryLagring) => void;
    mellomLagring: TemporaryLagring;
    setMellomLagreMaalTom: () => void;
    settAvtaleVerdi: SettAvtaleVerdi<any>;
    settVarselTilLest: (varselId: string) => Promise<void>;
    slettMaal: (maal: Maal) => Promise<any>;
    laasOpp: () => Promise<any>;
    utforHandlingHvisRedigerbar: (callback: () => void) => void;
}

export type Rolle = 'DELTAKER' | 'ARBEIDSGIVER' | 'VEILEDER' | 'INGEN_ROLLE';

export const AvtaleContext = React.createContext<Partial<Context>>({} as Context);

const NyAvtaleContext: FunctionComponent = props => {
    const [avtale, setAvtale] = useState<Avtale>({} as Avtale);
    const [ulagredeEndringer, setUlagredeEndringer] = useState(false);
    const [opphevGodkjenningerModalIsOpen, setOpphevGodkjenningerModalIsOpen] = useState(false);

    const sendToAmplitude = (eventName: string) =>
        amplitude.logEvent(eventName, {
            tiltakstype: avtale.tiltakstype,
        });

    const bekreftOpphevGodkjenninger = async () => {
        const opphevetAvtale = await RestService.opphevGodkjenninger(avtale.id);
        setAvtale(opphevetAvtale);
    };

    const opphevGodkjenningerModal = (
        <OpphevGodkjenningerModal
            modalIsOpen={opphevGodkjenningerModalIsOpen}
            bekreftOpphevGodkjenninger={bekreftOpphevGodkjenninger}
            lukkModal={() => setOpphevGodkjenningerModalIsOpen(false)}
        />
    );

    const lagreAvtale = async () => {
        if (noenHarGodkjentMenIkkeAlle(avtale) && !ulagredeEndringer) {
            // Du har de siste endringene
        } else {
            const nyAvtale = await RestService.lagreAvtale(avtale);
            sendToAmplitude('#tiltak-avtale-lagret');
            setAvtale({ ...avtale, ...nyAvtale });
            setUlagredeEndringer(false);
        }
    };

    const hentAvtale = () => RestService.hentAvtale(avtale.id).then(setAvtale);

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

    const settAvtaleVerdi = (felt: keyof Avtale, verdi: any) => {
        if (noenHarGodkjentMenIkkeAlle(avtale)) {
            setOpphevGodkjenningerModalIsOpen(true);
        } else {
            setAvtale({ ...avtale, [felt]: verdi });
            setUlagredeEndringer(true);
        }
    };

    const laasOpp = async () => {
        await RestService.låsOppAvtale(avtale.id);
        sendToAmplitude('#tiltak-avtale-laastOpp');
        await hentAvtale();
    };

    const gjenopprettAvtale = async () => {
        await RestService.gjenopprettAvtale(avtale.id);
        sendToAmplitude('#tiltak-avtale-gjenopprettet');
        await hentAvtale();
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
        settAvtaleVerdi('maal', nyeMaal);
        sendToAmplitude('#tiltak-avtale-maal-lagret');
        return lagreAvtale();
    };

    const slettMaal = (maalTilSletting: Maal) => {
        const nyeMaal = avtale.maal.filter((maal: Maal) => maal.id !== maalTilSletting.id);
        settAvtaleVerdi('maal', nyeMaal);
        sendToAmplitude('#tiltak-avtale-maal-slettet');
        return lagreAvtale();
    };

    const avtaleContext: Partial<Context> = {
        avtale,
        settAvtaleVerdi,
        hentAvtale,
        avbrytAvtale,
        lagreAvtale,
        overtaAvtale,
        laasOpp,
        gjenopprettAvtale,
        utforHandlingHvisRedigerbar,
        lagreMaal,
        slettMaal,
    };

    return (
        <>
            <AvtaleContext.Provider value={avtaleContext}>{props.children}</AvtaleContext.Provider>
            {opphevGodkjenningerModal}
        </>
    );
};

export default NyAvtaleContext;
