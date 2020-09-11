import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { Avtale, GodkjentPaVegneGrunner, Maal, Oppgave } from '@/types/avtale';
import { ApiError } from '@/types/errors';
import { Maalkategori } from '@/types/maalkategorier';
import Varsel from '@/types/varsel';
import amplitude from '@/utils/amplitude';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import OpphevGodkjenningerModal from './komponenter/modal/OpphevGodkjenningerModal';
import RestService from './services/rest-service';

export const tomAvtale: Avtale = {
    id: '',
    opprettetTidspunkt: '',
    sistEndret: '',
    versjoner: [],

    deltakerFnr: '',
    deltakerFornavn: '',
    deltakerEtternavn: '',
    deltakerTlf: '',

    bedriftNavn: '',
    bedriftNr: '',

    arbeidsgiverFornavn: '',
    arbeidsgiverEtternavn: '',
    arbeidsgiverTlf: '',

    veilederNavIdent: '',
    veilederFornavn: '',
    veilederEtternavn: '',
    veilederTlf: '',

    mentorFornavn: '',
    mentorEtternavn: '',
    mentorOppgaver: '',
    mentorAntallTimer: 0,
    mentorTimelonn: 0,

    oppfolging: '',
    tilrettelegging: '',

    startDato: '',
    sluttDato: '',

    maal: [],
    oppgaver: [],

    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: '',
    kanAvbrytes: true,
    kanGjenopprettes: false,
    kanLåsesOpp: false,
    avbrutt: false,
    tiltakstype: 'ARBEIDSTRENING',
    godkjentPaVegneAv: false,
    godkjentPaVegneGrunn: {
        ikkeBankId: false,
        reservert: false,
        digitalKompetanse: false,
    },

    manedslonn: undefined,
    feriepengesats: 12.0,
    arbeidsgiveravgift: 14.1,
    stillingprosent: 100,
    lonnstilskuddProsent: undefined,

    arbeidsgiverKontonummer: '',
    harFamilietilknytning: false,
    familietilknytningForklaring: undefined,
    avbruttDato: '',
    avbruttGrunn: '',
};

export const noenHarGodkjentMenIkkeAlle = (avtale: Avtale) => {
    return (avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver) && !avtale.godkjentAvVeileder;
};

export interface TemporaryLagring {
    maal?: Maalkategori;
    maalTekst: string;
}

export interface TemporaryLagringArbeidsoppgave {
    oppgaveTittel: string;
    oppgaveBeskrivelse: string;
    oppgaveOpplaering: string;
}

const tomTemporaryLagring: TemporaryLagring = {
    maal: undefined,
    maalTekst: '',
};

const tomTemporaryLagringArbeidsoppgave: TemporaryLagringArbeidsoppgave = {
    oppgaveTittel: '',
    oppgaveBeskrivelse: '',
    oppgaveOpplaering: '',
};

export interface Context {
    overtaAvtale: () => Promise<void>;
    gjenopprettAvtale: () => Promise<void>;
    avbryt: (avbruttDato: string, avbruttGrunn: string) => Promise<any>;
    avtale: Avtale;
    endretSteg: () => void;
    godkjenn: (godkjent: boolean) => Promise<any>;
    godkjennPaVegne: (paVegneGrunn: GodkjentPaVegneGrunner) => Promise<any>;
    harUlagredeEndringer: () => boolean;
    hentAvtale: (avtaleId: string) => Promise<any>;
    hentRolle: (avtaleId: string) => Promise<any>;
    hentVarsler: (avtaleId: string) => Promise<any>;
    lagreAvtale: () => Promise<any>;
    lagreMaal: (maal: Maal) => Promise<any>;
    lagreOppgave: (oppgave: Oppgave) => Promise<any>;
    mellomLagreArbeidsoppgave: (arbeidsoppgaveInput: TemporaryLagringArbeidsoppgave) => void;
    mellomLagreMaal: (maalInput: TemporaryLagring) => void;
    mellomLagring: TemporaryLagring;
    mellomLagringArbeidsoppgave: TemporaryLagringArbeidsoppgave;
    rolle: Rolle;
    setMellomLagreArbeidsoppgaveTom: () => void;
    setMellomLagreMaalTom: () => void;
    settAvtaleVerdi: (felt: keyof Avtale, verdi: any) => void;
    settVarselTilLest: (varselId: string) => Promise<void>;
    slettMaal: (maal: Maal) => Promise<any>;
    slettOppgave: (oppgave: Oppgave) => Promise<any>;
    varsler: Varsel[];
    visFeilmelding: (feilmelding: string) => void;
    laasOpp: () => Promise<any>;
    utforHandlingHvisRedigerbar: (callback: () => void) => void;
}

export type Rolle = 'DELTAKER' | 'ARBEIDSGIVER' | 'VEILEDER' | 'INGEN_ROLLE';

export const AvtaleContext = React.createContext<Context>({} as Context);

export const AvtaleConsumer = AvtaleContext.Consumer;

interface State {
    avtale: Avtale;
    feilmelding: string;
    rolle: Rolle;
    ulagredeEndringer: boolean;
    mellomLagring: TemporaryLagring;
    mellomLagringArbeidsoppgave: TemporaryLagringArbeidsoppgave;
    varsler: Varsel[];
    opphevGodkjenningerModalIsOpen: boolean;
}

export class TempAvtaleProvider extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            avtale: tomAvtale,
            feilmelding: '',
            rolle: 'INGEN_ROLLE',
            ulagredeEndringer: false,
            mellomLagring: tomTemporaryLagring,
            mellomLagringArbeidsoppgave: tomTemporaryLagringArbeidsoppgave,
            varsler: [],
            opphevGodkjenningerModalIsOpen: false,
        };

        this.overtaAvtale = this.overtaAvtale.bind(this);
        this.gjenopprettAvtale = this.gjenopprettAvtale.bind(this);
        this.avbrytAvtale = this.avbrytAvtale.bind(this);
        this.endretSteg = this.endretSteg.bind(this);
        this.fjernFeilmelding = this.fjernFeilmelding.bind(this);
        this.godkjennAvtale = this.godkjennAvtale.bind(this);
        this.godkjennAvtalePaVegne = this.godkjennAvtalePaVegne.bind(this);
        this.harUlagredeEndringer = this.harUlagredeEndringer.bind(this);
        this.hentAvtale = this.hentAvtale.bind(this);
        this.hentRolle = this.hentRolle.bind(this);
        this.hentVarsler = this.hentVarsler.bind(this);
        this.lagreAvtale = this.lagreAvtale.bind(this);
        this.lagreMaal = this.lagreMaal.bind(this);
        this.lagreOppgave = this.lagreOppgave.bind(this);
        this.mellomLagreArbeidsoppgave = this.mellomLagreArbeidsoppgave.bind(this);
        this.mellomLagreMaal = this.mellomLagreMaal.bind(this);
        this.setMellomLagreArbeidsoppgaveTom = this.setMellomLagreArbeidsoppgaveTom.bind(this);
        this.setMellomLagreMaalTom = this.setMellomLagreMaalTom.bind(this);
        this.settAvtaleVerdi = this.settAvtaleVerdi.bind(this);
        this.settVarselTilLest = this.settVarselTilLest.bind(this);
        this.slettMaal = this.slettMaal.bind(this);
        this.slettOppgave = this.slettOppgave.bind(this);
        this.visFeilmelding = this.visFeilmelding.bind(this);
        this.laasOpp = this.laasOpp.bind(this);
        this.utforHandlingHvisRedigerbar = this.utforHandlingHvisRedigerbar.bind(this);
    }

    sendToAmplitude = (eventName: string) => {
        if (this.harUlagredeEndringer()) {
            amplitude.logEvent(eventName, {
                tiltakstype: this.state.avtale.tiltakstype,
            });
        }
    };

    mellomLagreMaal(maalInput: TemporaryLagring): void {
        this.setState({
            mellomLagring: maalInput,
        });
    }

    setMellomLagreMaalTom(): void {
        this.setState({
            mellomLagring: tomTemporaryLagring,
        });
    }

    mellomLagreArbeidsoppgave(arbeidsoppgaveInput: TemporaryLagringArbeidsoppgave): void {
        this.setState({ mellomLagringArbeidsoppgave: arbeidsoppgaveInput });
    }

    setMellomLagreArbeidsoppgaveTom(): void {
        this.setState({
            mellomLagringArbeidsoppgave: tomTemporaryLagringArbeidsoppgave,
        });
    }

    shouldComponentUpdate(nextProps: any, nextState: State): boolean {
        return (
            nextState.avtale.maal.every(maal => maal.id !== undefined) &&
            nextState.avtale.oppgaver.every(maal => maal.id !== undefined)
        );
    }

    async endretSteg() {
        if (this.state.ulagredeEndringer) {
            try {
                await this.lagreAvtale();
            } catch (error) {
                if (error instanceof ApiError) {
                    this.visFeilmelding(error.message);
                } else {
                    throw error;
                }
            }
        } else {
            try {
                await this.hentAvtale(this.state.avtale.id);
            } catch (error) {
                if (error instanceof ApiError) {
                    this.visFeilmelding(error.message);
                } else {
                    throw error;
                }
            }
        }
    }

    settAvtaleVerdi(felt: keyof Avtale, verdi: any) {
        if (noenHarGodkjentMenIkkeAlle(this.state.avtale)) {
            this.setState({ opphevGodkjenningerModalIsOpen: true });
        } else {
            const avtale = this.state.avtale;
            if (avtale) {
                // @ts-ignore
                avtale[felt] = verdi;
                this.setState({ avtale, ulagredeEndringer: true });
            }
        }
    }

    async lagreAvtale() {
        if (noenHarGodkjentMenIkkeAlle(this.state.avtale)) {
            return Promise.reject();
        } else {
            const nyAvtale = await RestService.lagreAvtale(this.state.avtale);
            this.sendToAmplitude('#tiltak-avtale-lagret');
            this.setState({
                avtale: { ...this.state.avtale, ...nyAvtale },
                ulagredeEndringer: false,
            });
        }
    }

    lagreMaal(maalTilLagring: Maal) {
        const nyeMaal = this.state.avtale.maal.filter((maal: Maal) => maal.id !== maalTilLagring.id);
        nyeMaal.push(maalTilLagring);
        this.settAvtaleVerdi('maal', nyeMaal);
        this.sendToAmplitude('#tiltak-avtale-maal-lagret');
        return this.lagreAvtale();
    }

    visFeilmelding = (feilmelding: string): void => {
        this.setState({ feilmelding });
    };

    utforHandlingHvisRedigerbar = (callback: () => void) => {
        if (noenHarGodkjentMenIkkeAlle(this.state.avtale)) {
            this.setState({ opphevGodkjenningerModalIsOpen: true });
        } else {
            callback();
        }
    };

    fjernFeilmelding = (): void => {
        this.setState({ feilmelding: '' });
    };

    async hentAvtale(avtaleId: string) {
        const avtale = await RestService.hentAvtale(avtaleId);
        const godkjenningerBool = this.konverterGodkjentTilBool(avtale);
        const avtaleBool = { ...avtale, ...godkjenningerBool };
        this.setState({ avtale: { ...this.state.avtale, ...avtaleBool } });
    }

    konverterGodkjentTilBool = (avtale: Avtale) => ({
        godkjentAvArbeidsgiver: Boolean(avtale.godkjentAvArbeidsgiver),
        godkjentAvDeltaker: Boolean(avtale.godkjentAvDeltaker),
        godkjentAvVeileder: Boolean(avtale.godkjentAvVeileder),
    });

    async hentRolle(avtaleId: string) {
        const rolle = await RestService.hentRolle(avtaleId);
        this.setState({ rolle });
    }

    slettMaal(maalTilSletting: Maal) {
        const nyeMaal = this.state.avtale.maal.filter((maal: Maal) => maal.id !== maalTilSletting.id);
        this.settAvtaleVerdi('maal', nyeMaal);
        this.sendToAmplitude('#tiltak-avtale-maal-slettet');
        return this.lagreAvtale();
    }

    lagreOppgave(oppgaveTilLagring: Oppgave) {
        const nyeOppgaver = this.state.avtale.oppgaver.filter(
            (oppgave: Oppgave) => oppgave.id !== oppgaveTilLagring.id
        );
        nyeOppgaver.push(oppgaveTilLagring);
        this.settAvtaleVerdi('oppgaver', nyeOppgaver);
        this.sendToAmplitude('#tiltak-avtale-oppgave-lagret');
        return this.lagreAvtale();
    }

    slettOppgave(oppgaveTilSletting: Oppgave) {
        const avtale = this.state.avtale;
        const nyeOppgaver = avtale.oppgaver.filter((oppgave: Oppgave) => oppgave.id !== oppgaveTilSletting.id);
        this.settAvtaleVerdi('oppgaver', nyeOppgaver);
        this.sendToAmplitude('#tiltak-avtale-oppgave-slettet');
        return this.lagreAvtale();
    }

    async godkjennAvtale() {
        const avtale = this.state.avtale;
        await RestService.godkjennAvtale(avtale);
        this.sendToAmplitude('#tiltak-avtale-godkjent');
        await this.hentAvtale(avtale.id);
    }

    async godkjennAvtalePaVegne(paVegneGrunn: GodkjentPaVegneGrunner) {
        const avtale = this.state.avtale;
        await RestService.godkjennAvtalePaVegne(avtale, paVegneGrunn);
        this.sendToAmplitude('#tiltak-avtale-godkjent-pavegneav');
        await this.hentAvtale(avtale.id);
    }

    async overtaAvtale(): Promise<void> {
        const id = this.state.avtale.id;
        await RestService.overtaAvtale(id);
        this.sendToAmplitude('#tiltak-avtale-overtatt');
        await this.hentAvtale(id);
    }

    async gjenopprettAvtale() {
        const id = this.state.avtale.id;
        await RestService.gjenopprettAvtale(id);
        this.sendToAmplitude('#tiltak-avtale-gjenopprettet');
        await this.hentAvtale(id);
    }

    async avbrytAvtale(avbruttDato: string, avbruttGrunn: string) {
        const avtale = this.state.avtale;
        await RestService.avbrytAvtale(avtale, avbruttDato, avbruttGrunn);
        this.sendToAmplitude('#tiltak-avtale-avbrutt');
        await this.hentAvtale(avtale.id);
    }

    async hentVarsler(avtaleId: string) {
        try {
            const varsler = await RestService.hentAvtaleVarsler(avtaleId);
            this.setState({ varsler });
        } catch (e) {}
    }

    async settVarselTilLest(varselId: string) {
        await RestService.settVarselTilLest(varselId);
        return this.hentVarsler(this.state.avtale.id);
    }

    harUlagredeEndringer() {
        return this.state.ulagredeEndringer;
    }

    async laasOpp() {
        const avtale = this.state.avtale;
        await RestService.låsOppAvtale(avtale.id);
        this.sendToAmplitude('#tiltak-avtale-laastOpp');
        await this.hentAvtale(avtale.id);
    }

    render() {
        const context: Context = {
            overtaAvtale: this.overtaAvtale,
            gjenopprettAvtale: this.gjenopprettAvtale,
            avbryt: this.avbrytAvtale,
            avtale: this.state.avtale,
            endretSteg: this.endretSteg,
            godkjenn: this.godkjennAvtale,
            godkjennPaVegne: this.godkjennAvtalePaVegne,
            harUlagredeEndringer: this.harUlagredeEndringer,
            hentAvtale: this.hentAvtale,
            hentRolle: this.hentRolle,
            hentVarsler: this.hentVarsler,
            lagreAvtale: this.lagreAvtale,
            lagreMaal: this.lagreMaal,
            lagreOppgave: this.lagreOppgave,
            mellomLagreArbeidsoppgave: this.mellomLagreArbeidsoppgave,
            mellomLagreMaal: this.mellomLagreMaal,
            mellomLagring: this.state.mellomLagring,
            mellomLagringArbeidsoppgave: this.state.mellomLagringArbeidsoppgave,
            rolle: this.state.rolle,
            setMellomLagreArbeidsoppgaveTom: this.setMellomLagreArbeidsoppgaveTom,
            setMellomLagreMaalTom: this.setMellomLagreMaalTom,
            settAvtaleVerdi: this.settAvtaleVerdi,
            settVarselTilLest: this.settVarselTilLest,
            slettMaal: this.slettMaal,
            slettOppgave: this.slettOppgave,
            varsler: this.state.varsler,
            visFeilmelding: this.visFeilmelding,
            laasOpp: this.laasOpp,
            utforHandlingHvisRedigerbar: this.utforHandlingHvisRedigerbar,
        };

        const bekreftOpphevGodkjenninger = async () => {
            const opphevetAvtale = await RestService.opphevGodkjenninger(this.state.avtale.id);
            this.setState({ avtale: opphevetAvtale, opphevGodkjenningerModalIsOpen: false });
        };

        const opphevGodkjenningerModal = (
            <OpphevGodkjenningerModal
                modalIsOpen={this.state.opphevGodkjenningerModalIsOpen}
                bekreftOpphevGodkjenninger={bekreftOpphevGodkjenninger}
                lukkModal={() => this.setState({ opphevGodkjenningerModalIsOpen: false })}
            />
        );

        return (
            <>
                {this.state.feilmelding && (
                    <VarselKomponent kanLukkes={true} onLukkVarsel={this.fjernFeilmelding} type={'advarsel'}>
                        {this.state.feilmelding}
                    </VarselKomponent>
                )}
                <AvtaleContext.Provider value={context}>{this.props.children}</AvtaleContext.Provider>
                {opphevGodkjenningerModal}
            </>
        );
    }
}

export const AvtaleProvider = withRouter(TempAvtaleProvider);

export function medContext(Component: React.ComponentType<any>): React.ComponentType<any> {
    return props => (
        <AvtaleConsumer>
            {(context: Context) => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
}
