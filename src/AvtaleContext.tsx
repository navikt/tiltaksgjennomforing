import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { Avtale, GodkjentPaVegneGrunner, Maal, Oppgave } from '@/types/avtale';
import { ApiError } from '@/types/errors';
import Varsel from '@/types/varsel';
import moment from 'moment';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import RestService from './services/rest-service';
import amplitude from '@/utils/amplitude';
import { Maalkategori } from '@/types/maalkategorier';

export const tomAvtale: Avtale = {
    id: '',
    opprettetTidspunkt: '',
    sistEndret: '',
    versjon: 1,
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

    oppfolging: '',
    tilrettelegging: '',

    startDato: moment().valueOf(),
    sluttDato: moment().valueOf(),

    maal: [],
    oppgaver: [],

    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: '',
    kanAvbrytes: true,
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
    lonnstilskuddProsent: '',

    arbeidsgiverKontonummer: '',
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
    avbryt: () => Promise<any>;
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
        };

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
        const avtale = this.state.avtale;
        if (avtale) {
            // @ts-ignore
            avtale[felt] = verdi;
            this.setState({ avtale, ulagredeEndringer: true });
        }
    }

    async lagreAvtale() {
        const nyAvtale = await RestService.lagreAvtale(this.state.avtale);
        this.sendToAmplitude('avtale-lagret');
        this.setState({
            avtale: { ...this.state.avtale, ...nyAvtale },
            ulagredeEndringer: false,
        });
    }

    lagreMaal(maalTilLagring: Maal) {
        const nyeMaal = this.state.avtale.maal.filter((maal: Maal) => maal.id !== maalTilLagring.id);
        nyeMaal.push(maalTilLagring);
        nyeMaal.sort((a: Maal, b: Maal) => (b.opprettetTimestamp || 0) - (a.opprettetTimestamp || 0));
        this.settAvtaleVerdi('maal', nyeMaal);
        this.sendToAmplitude('avtale-maal-lagret');
        return this.lagreAvtale();
    }

    visFeilmelding = (feilmelding: string): void => {
        this.setState({ feilmelding });
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
        this.sendToAmplitude('avtale-maal-slettet');
        return this.lagreAvtale();
    }

    lagreOppgave(oppgaveTilLagring: Oppgave) {
        const nyeOppgaver = this.state.avtale.oppgaver.filter(
            (oppgave: Oppgave) => oppgave.id !== oppgaveTilLagring.id
        );
        nyeOppgaver.push(oppgaveTilLagring);
        nyeOppgaver.sort((a: Oppgave, b: Oppgave) => (b.opprettetTimestamp || 0) - (a.opprettetTimestamp || 0));
        this.settAvtaleVerdi('oppgaver', nyeOppgaver);
        this.sendToAmplitude('avtale-oppgave-lagret');
        return this.lagreAvtale();
    }

    slettOppgave(oppgaveTilSletting: Oppgave) {
        const avtale = this.state.avtale;
        const nyeOppgaver = avtale.oppgaver.filter((oppgave: Oppgave) => oppgave.id !== oppgaveTilSletting.id);
        this.settAvtaleVerdi('oppgaver', nyeOppgaver);
        this.sendToAmplitude('avtale-oppgave-slettet');
        return this.lagreAvtale();
    }

    async godkjennAvtale() {
        const avtale = this.state.avtale;
        await RestService.godkjennAvtale(avtale);
        this.sendToAmplitude('avtale-godkjent');
        await this.hentAvtale(avtale.id);
    }

    async godkjennAvtalePaVegne(paVegneGrunn: GodkjentPaVegneGrunner) {
        const avtale = this.state.avtale;
        await RestService.godkjennAvtalePaVegne(avtale, paVegneGrunn);
        this.sendToAmplitude('avtale-godkjent-pavegneav');
        await this.hentAvtale(avtale.id);
    }
    async avbrytAvtale() {
        const avtale = this.state.avtale;
        await RestService.avbrytAvtale(avtale);
        this.sendToAmplitude('avtale-avbrutt');
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

        await this.hentAvtale(avtale.id);
    }
    render() {
        const context: Context = {
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
        };

        return (
            <>
                {this.state.feilmelding && (
                    <VarselKomponent kanLukkes={true} onLukkVarsel={this.fjernFeilmelding} type={'advarsel'}>
                        {this.state.feilmelding}
                    </VarselKomponent>
                )}
                <AvtaleContext.Provider value={context}>{this.props.children}</AvtaleContext.Provider>
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
