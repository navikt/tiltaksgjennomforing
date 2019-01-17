import moment from 'moment';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Varsel from './komponenter/Varsel/Varsel';
import { Avtale, Maal, Oppgave } from './AvtaleSide/avtale';
import { ApiError } from './AvtaleSide/ApiError';
import { Knapp } from 'nav-frontend-knapper';
import RestService from './services/rest-service';

export const tomAvtale: Avtale = {
    id: '',
    opprettetTidspunkt: '',
    versjon: '',

    deltakerFnr: '',
    deltakerFornavn: '',
    deltakerEtternavn: '',
    deltakerAdresse: '',
    deltakerPostnummer: '',
    deltakerPoststed: '',

    bedriftNavn: '',
    bedriftAdresse: '',
    bedriftPostnummer: '',
    bedriftPoststed: '',

    arbeidsgiverFnr: '',
    arbeidsgiverFornavn: '',
    arbeidsgiverEtternavn: '',
    arbeidsgiverEpost: '',
    arbeidsgiverTlf: '',

    veilederNavIdent: '',
    veilederFornavn: '',
    veilederEtternavn: '',
    veilederEpost: '',
    veilederTlf: '',

    oppfolging: '',
    tilrettelegging: '',

    startDatoTimestamp: moment().valueOf(),
    arbeidstreningLengde: 1,
    arbeidstreningStillingprosent: 0,

    maal: [],
    oppgaver: [],

    bekreftetAvBruker: false,
    bekreftetAvArbeidsgiver: false,
    bekreftetAvVeileder: false,
};

export interface Context {
    avtale: Avtale;
    rolle: Rolle;
    settAvtaleVerdi: (felt: string, verdi: any) => void;
    lagreAvtale: () => void;
    lagreMaal: (maal: Maal) => void;
    slettMaal: (maal: Maal) => void;
    lagreOppgave: (oppgave: Oppgave) => void;
    slettOppgave: (oppgave: Oppgave) => void;
    hentAvtale: (avtaleId: string) => void;
    opprettAvtale: (
        deltakerFnr: string,
        arbeidsgiverFnr: string
    ) => Promise<Avtale>;
    hentRolle: (avtaleId: string) => void;
}

export type Rolle = 'DELTAKER' | 'ARBEIDSGIVER' | 'VEILEDER' | 'INGEN_ROLLE';

const AvtaleContext = React.createContext<Context>({} as Context);

export const AvtaleConsumer = AvtaleContext.Consumer;

interface State {
    avtaler: Map<string, Avtale>;
    avtale: Avtale;
    feilmelding: string;
    rolle: Rolle;
}

export class TempAvtaleProvider extends React.Component<any, State> {
    service: RestService;

    constructor(props: any) {
        super(props);

        this.state = {
            avtaler: new Map<string, Avtale>(),
            avtale: tomAvtale,
            feilmelding: '',
            rolle: 'INGEN_ROLLE',
        };

        this.settAvtaleVerdi = this.settAvtaleVerdi.bind(this);
        this.hentAvtale = this.hentAvtale.bind(this);
        this.lagreAvtale = this.lagreAvtale.bind(this);
        this.opprettAvtale = this.opprettAvtale.bind(this);
        this.lagreMaal = this.lagreMaal.bind(this);
        this.slettMaal = this.slettMaal.bind(this);
        this.lagreOppgave = this.lagreOppgave.bind(this);
        this.slettOppgave = this.slettOppgave.bind(this);
        this.visFeilmelding = this.visFeilmelding.bind(this);
        this.fjernFeilmelding = this.fjernFeilmelding.bind(this);
        this.hentRolle = this.hentRolle.bind(this);
        this.service = new RestService();
    }

    handterApiFeil = (error: any) => {
        if (error instanceof ApiError) {
            this.visFeilmelding(error.message);
        } else {
            throw error;
        }
    };

    shouldComponentUpdate(nextProps: any, nextState: State): boolean {
        return (
            nextState.avtale.maal.every(maal => maal.id !== undefined) &&
            nextState.avtale.oppgaver.every(maal => maal.id !== undefined)
        );
    }

    componentDidMount() {
        this.service
            .hentAvtaler()
            .then((avtaler: Map<string, Avtale>) => {
                this.setState({ avtaler });
            })
            .catch(this.handterApiFeil);
    }

    visFeilmelding(feilmelding: string) {
        this.setState({ feilmelding });
    }

    settAvtaleVerdi(felt: string, verdi: any) {
        const avtale = this.state.avtale;
        if (avtale) {
            // @ts-ignore
            avtale[felt] = verdi;
            this.setState({ avtale });
        }
    }

    lagreAvtale() {
        const avtale = this.state.avtale;
        if (avtale) {
            return this.service
                .lagreAvtale(avtale)
                .then(() => {
                    this.hentAvtale(avtale.id);
                })
                .catch(this.handterApiFeil);
        }
        return Promise.reject();
    }

    lagreMaal(maalTilLagring: Maal) {
        const avtale = this.state.avtale;
        if (avtale) {
            const nyeMaal = avtale.maal.filter(
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
        return Promise.reject();
    }

    hentAvtale(avtaleId: string) {
        this.service
            .hentAvtale(avtaleId)
            .then(avtale => {
                this.setState({ avtale });
            })
            .catch(this.handterApiFeil);
    }

    hentRolle(avtaleId: string) {
        this.service
            .hentRolle(avtaleId)
            .then(rolle => {
                this.setState({ rolle });
            })
            .catch(this.handterApiFeil);
    }

    slettMaal(maalTilSletting: Maal) {
        const avtale = this.state.avtale;
        if (avtale) {
            const nyeMaal = avtale.maal.filter(
                (maal: Maal) => maal.id !== maalTilSletting.id
            );
            this.settAvtaleVerdi('maal', nyeMaal);
            return this.lagreAvtale();
        }
        return Promise.reject();
    }

    lagreOppgave(oppgaveTilLagring: Oppgave) {
        const avtale = this.state.avtale;
        if (avtale) {
            const nyeOppgaver = avtale.oppgaver.filter(
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
        return Promise.reject();
    }

    slettOppgave(oppgaveTilSletting: Oppgave) {
        const avtale = this.state.avtale;
        if (avtale) {
            const nyeOppgaver = avtale.oppgaver.filter(
                (oppgave: Oppgave) => oppgave.id !== oppgaveTilSletting.id
            );
            this.settAvtaleVerdi('oppgaver', nyeOppgaver);
            return this.lagreAvtale();
        }
        return Promise.reject();
    }

    opprettAvtale(
        deltakerFnr: string,
        arbeidsgiverFnr: string
    ): Promise<Avtale> {
        return this.service
            .opprettAvtale(deltakerFnr, arbeidsgiverFnr)
            .then((avtale: Avtale) => {
                const nyeAvtaler: Map<string, Avtale> = new Map<string, Avtale>(
                    this.state.avtaler
                );
                nyeAvtaler.set(avtale.id, avtale);
                this.setState({
                    avtaler: nyeAvtaler,
                    avtale,
                });
                return Promise.resolve(avtale);
            })
            .catch(() => {
                this.visFeilmelding('Kunne ikke opprette avtale');
                return Promise.reject(tomAvtale);
            });
    }

    fjernFeilmelding() {
        this.setState({ feilmelding: '' });
    }

    render() {
        const context: Context = {
            avtale: this.state.avtale,
            rolle: this.state.rolle,
            settAvtaleVerdi: this.settAvtaleVerdi,
            lagreAvtale: this.lagreAvtale,
            lagreMaal: this.lagreMaal,
            slettMaal: this.slettMaal,
            lagreOppgave: this.lagreOppgave,
            slettOppgave: this.slettOppgave,
            hentAvtale: this.hentAvtale,
            opprettAvtale: this.opprettAvtale,
            hentRolle: this.hentRolle,
        };

        return (
            <AvtaleContext.Provider value={context}>
                {this.state.feilmelding && (
                    <Varsel lukkVarsel={this.fjernFeilmelding}>
                        {this.state.feilmelding}
                    </Varsel>
                )}
                {/* TODO: Fjern */}
                <Knapp onClick={() => this.setState({ rolle: 'DELTAKER' })}>
                    BLI DELTAKER
                </Knapp>
                <Knapp onClick={() => this.setState({ rolle: 'VEILEDER' })}>
                    BLI VEILEDER
                </Knapp>
                {this.props.children}
            </AvtaleContext.Provider>
        );
    }
}

export const AvtaleProvider = withRouter(TempAvtaleProvider);

export function medContext<PROPS>(
    Component: React.ComponentType<Context & PROPS>
): React.ComponentType<PROPS> {
    return (props: PROPS) => (
        <AvtaleConsumer>
            {(context: Context) => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
}
