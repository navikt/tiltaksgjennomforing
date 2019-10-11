import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { Avtale, GodkjentPaVegneGrunner, Maal, Oppgave } from '@/types/avtale';
import { ApiError } from '@/types/errors';
import Varsel from '@/types/varsel';
import moment from 'moment';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import RestService from './services/rest-service';

export const tomAvtale: Avtale = {
    id: '',
    baseAvtaleId: '',
    opprettetTidspunkt: '',
    versjon: '',
    godkjentVersjon: '',
    deltakerFnr: '',
    deltakerFornavn: '',
    deltakerEtternavn: '',
    deltakerTlf: '',

    bedriftNavn: '',
    bedriftNr: '',

    arbeidsgiverFnr: '',
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
    arbeidstreningLengde: 1,
    arbeidstreningStillingprosent: 0,

    maal: [],
    oppgaver: [],

    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: '',
    kanAvbrytes: true,
    avbrutt: false,
    godkjentPaaVegneAv: false,
    godkjentPaVegneGrunn: {
        ikkeBankId: false,
        reservert: false,
        digitalKompetanse: false,
    },
};

export interface TemporaryLagring {
    maal: string;
    maalTekst: string;
}

export interface TemporaryLagringArbeidsoppgave {
    oppgaveTittel: string;
    oppgaveBeskrivelse: string;
    oppgaveOpplaering: string;
}

const tomTemporaryLagring: TemporaryLagring = {
    maal: '',
    maalTekst: '',
};

const tomTemporaryLagringArbeidsoppgave: TemporaryLagringArbeidsoppgave = {
    oppgaveTittel: '',
    oppgaveBeskrivelse: '',
    oppgaveOpplaering: '',
};

export interface Context {
    avtale: Avtale;
    varsler: Varsel[];
    rolle: Rolle;
    mellomLagring: TemporaryLagring;
    mellomLagringArbeidsoppgave: TemporaryLagringArbeidsoppgave;
    settAvtaleVerdi: (felt: keyof Avtale, verdi: any) => void;
    lagreAvtale: () => Promise<any>;
    lagreMaal: (maal: Maal) => Promise<any>;
    slettMaal: (maal: Maal) => Promise<any>;
    lagreOppgave: (oppgave: Oppgave) => Promise<any>;
    slettOppgave: (oppgave: Oppgave) => Promise<any>;
    hentAvtale: (avtaleId: string) => Promise<any>;
    //  opprettAvtale: (deltakerFnr: string, bedriftNr: string) => Promise<Avtale>;
    opprettNyAvaleGodkjentVersjon: (avtale: Avtale) => Promise<Avtale>;
    hentRolle: (avtaleId: string) => Promise<any>;
    godkjenn: (godkjent: boolean) => Promise<any>;
    godkjennPaVegne: (paVegneGrunn: GodkjentPaVegneGrunner) => Promise<any>;
    avbryt: () => Promise<any>;
    visFeilmelding: (feilmelding: string) => void;
    endretSteg: () => void;
    mellomLagreMaal: (maalInput: TemporaryLagring) => void;
    setMellomLagreMaalTom: () => void;
    mellomLagreArbeidsoppgave: (
        arbeidsoppgaveInput: TemporaryLagringArbeidsoppgave
    ) => void;
    setMellomLagreArbeidsoppgaveTom: () => void;
    hentVarsler: (avtaleId: string) => Promise<any>;
    settVarselTilLest: (varselId: string) => Promise<void>;
    kanLaasesOpp: (avtaleId: string) => Promise<Avtale>;
    harUlagredeEndringer: () => boolean;
}

export type Rolle = 'DELTAKER' | 'ARBEIDSGIVER' | 'VEILEDER' | 'INGEN_ROLLE';

const AvtaleContext = React.createContext<Context>({} as Context);

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

        this.settAvtaleVerdi = this.settAvtaleVerdi.bind(this);
        this.hentAvtale = this.hentAvtale.bind(this);
        this.lagreAvtale = this.lagreAvtale.bind(this);
        this.lagreMaal = this.lagreMaal.bind(this);
        this.slettMaal = this.slettMaal.bind(this);
        this.lagreOppgave = this.lagreOppgave.bind(this);
        this.slettOppgave = this.slettOppgave.bind(this);
        this.visFeilmelding = this.visFeilmelding.bind(this);
        this.fjernFeilmelding = this.fjernFeilmelding.bind(this);
        this.hentRolle = this.hentRolle.bind(this);
        this.godkjennAvtale = this.godkjennAvtale.bind(this);
        this.avbrytAvtale = this.avbrytAvtale.bind(this);
        this.godkjennAvtalePaVegne = this.godkjennAvtalePaVegne.bind(this);
        this.endretSteg = this.endretSteg.bind(this);
        this.mellomLagreMaal = this.mellomLagreMaal.bind(this);
        this.setMellomLagreMaalTom = this.setMellomLagreMaalTom.bind(this);
        this.mellomLagreArbeidsoppgave = this.mellomLagreArbeidsoppgave.bind(
            this
        );
        this.setMellomLagreArbeidsoppgaveTom = this.setMellomLagreArbeidsoppgaveTom.bind(
            this
        );
        this.hentVarsler = this.hentVarsler.bind(this);
        this.settVarselTilLest = this.settVarselTilLest.bind(this);
        this.harUlagredeEndringer = this.harUlagredeEndringer.bind(this);
    }

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

    mellomLagreArbeidsoppgave(
        arbeidsoppgaveInput: TemporaryLagringArbeidsoppgave
    ): void {
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
        this.setState({ avtale: nyAvtale, ulagredeEndringer: false });
    }

    lagreMaal(maalTilLagring: Maal) {
        const nyeMaal = this.state.avtale.maal.filter(
            (maal: Maal) => maal.id !== maalTilLagring.id
        );
        nyeMaal.push(maalTilLagring);
        nyeMaal.sort(
            (a: Maal, b: Maal) =>
                (b.opprettetTimestamp || 0) - (a.opprettetTimestamp || 0)
        );
        this.settAvtaleVerdi('maal', nyeMaal);
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

        this.setState({ avtale: avtaleBool });
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
        const nyeMaal = this.state.avtale.maal.filter(
            (maal: Maal) => maal.id !== maalTilSletting.id
        );
        this.settAvtaleVerdi('maal', nyeMaal);
        return this.lagreAvtale();
    }

    lagreOppgave(oppgaveTilLagring: Oppgave) {
        const nyeOppgaver = this.state.avtale.oppgaver.filter(
            (oppgave: Oppgave) => oppgave.id !== oppgaveTilLagring.id
        );
        nyeOppgaver.push(oppgaveTilLagring);
        nyeOppgaver.sort(
            (a: Oppgave, b: Oppgave) =>
                (b.opprettetTimestamp || 0) - (a.opprettetTimestamp || 0)
        );
        this.settAvtaleVerdi('oppgaver', nyeOppgaver);
        return this.lagreAvtale();
    }

    slettOppgave(oppgaveTilSletting: Oppgave) {
        const avtale = this.state.avtale;
        const nyeOppgaver = avtale.oppgaver.filter(
            (oppgave: Oppgave) => oppgave.id !== oppgaveTilSletting.id
        );
        this.settAvtaleVerdi('oppgaver', nyeOppgaver);
        return this.lagreAvtale();
    }

    /*async opprettAvtale(
        deltakerFnr: string,
        bedriftNr: string
    ): Promise<Avtale> {
        const avtale = await RestService.opprettAvtale(deltakerFnr, bedriftNr);
        this.setState({
            avtale,
        });
        return avtale;
    }*/

    async opprettNyAvtaleGodkjentVersjon(avtale: Avtale): Promise<Avtale> {
        avtale = await RestService.opprettNyAvtaleGodkjentVersjon(avtale);
        this.setState({ avtale });
        return avtale;
    }

    async godkjennAvtale() {
        const avtale = this.state.avtale;
        await RestService.godkjennAvtale(avtale);
        await this.hentAvtale(avtale.id);
    }

    async godkjennAvtalePaVegne(paVegneGrunn: GodkjentPaVegneGrunner) {
        const avtale = this.state.avtale;
        await RestService.godkjennAvtalePaVegne(avtale, paVegneGrunn);
        await this.hentAvtale(avtale.id);
    }

    async avbrytAvtale() {
        const avtale = this.state.avtale;
        await RestService.avbrytAvtale(avtale);
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

    async kanLaasesOpp(avtaleId: string) {
        const avtaleGodkjentVersjonIkkeGodkjent = await RestService.kanLaasesOpp(
            avtaleId
        );
        return avtaleGodkjentVersjonIkkeGodkjent;
    }

    render() {
        const context: Context = {
            avtale: this.state.avtale,
            varsler: this.state.varsler,
            rolle: this.state.rolle,
            mellomLagring: this.state.mellomLagring,
            mellomLagringArbeidsoppgave: this.state.mellomLagringArbeidsoppgave,
            settAvtaleVerdi: this.settAvtaleVerdi,
            lagreAvtale: this.lagreAvtale,
            lagreMaal: this.lagreMaal,
            slettMaal: this.slettMaal,
            lagreOppgave: this.lagreOppgave,
            slettOppgave: this.slettOppgave,
            hentAvtale: this.hentAvtale,
            // opprettAvtale: this.opprettAvtale,
            opprettNyAvaleGodkjentVersjon: this.opprettNyAvtaleGodkjentVersjon,
            hentRolle: this.hentRolle,
            godkjenn: this.godkjennAvtale,
            avbryt: this.avbrytAvtale,
            godkjennPaVegne: this.godkjennAvtalePaVegne,
            visFeilmelding: this.visFeilmelding,
            endretSteg: this.endretSteg,
            mellomLagreMaal: this.mellomLagreMaal,
            setMellomLagreMaalTom: this.setMellomLagreMaalTom,
            mellomLagreArbeidsoppgave: this.mellomLagreArbeidsoppgave,
            setMellomLagreArbeidsoppgaveTom: this
                .setMellomLagreArbeidsoppgaveTom,
            hentVarsler: this.hentVarsler,
            settVarselTilLest: this.settVarselTilLest,
            kanLaasesOpp: this.kanLaasesOpp,
            harUlagredeEndringer: this.harUlagredeEndringer,
        };

        return (
            <>
                {this.state.feilmelding && (
                    <VarselKomponent
                        kanLukkes={true}
                        onLukkVarsel={this.fjernFeilmelding}
                        type={'advarsel'}
                    >
                        {this.state.feilmelding}
                    </VarselKomponent>
                )}
                <AvtaleContext.Provider value={context}>
                    {this.props.children}
                </AvtaleContext.Provider>
            </>
        );
    }
}

export const AvtaleProvider = withRouter(TempAvtaleProvider);

export function medContext(
    Component: React.ComponentType<any>
): React.ComponentType<any> {
    return props => (
        <AvtaleConsumer>
            {(context: Context) => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
}
