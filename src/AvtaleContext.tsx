import moment from 'moment';
import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Varsel from './komponenter/Varsel/Varsel';
import { pathTilKontaktinformasjonSteg, pathTilOversikt } from './paths';
import Service from './services/service';
import { createService } from './services/service-factory';
import { Avtale, Maal, Oppgave } from './AvtaleSide/avtale';
import AvtaleOversikt from './AvtaleSide/AvtaleOversikt';
import { ApiError } from './AvtaleSide/ApiError';

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
    settAvtaleVerdi: (felt: string, verdi: any) => void;
    lagreAvtale: () => void;
    lagreMaal: (maal: Maal) => void;
    slettMaal: (maal: Maal) => void;
    lagreOppgave: (oppgave: Oppgave) => void;
    slettOppgave: (oppgave: Oppgave) => void;
    hentAvtale: (avtaleId: string) => void;
    opprettAvtale: () => void;
}

// tslint:disable no-empty
const AvtaleContext = React.createContext<Context>({
    avtale: tomAvtale,
    settAvtaleVerdi: () => {},
    lagreAvtale: () => {},
    lagreMaal: () => {},
    slettMaal: () => {},
    lagreOppgave: () => {},
    slettOppgave: () => {},
    hentAvtale: () => {},
    opprettAvtale: () => {},
});
// tslint:enable

export const AvtaleConsumer = AvtaleContext.Consumer;

interface State {
    avtaler: Map<string, Avtale>;
    avtale: Avtale;
    valgtAvtaleId: string;
    feilmelding?: string;
}

export class TempAvtaleProvider extends React.Component<any, State> {
    service: Service;

    constructor(props: any) {
        super(props);

        this.state = {
            avtaler: new Map<string, Avtale>(),
            avtale: tomAvtale,
            valgtAvtaleId: props.location.pathname.split('/')[3],
        };

        this.settAvtaleVerdi = this.settAvtaleVerdi.bind(this);
        this.hentAvtale = this.hentAvtale.bind(this);
        this.lagreAvtale = this.lagreAvtale.bind(this);
        this.avtaleKlikk = this.avtaleKlikk.bind(this);
        this.opprettAvtaleKlikk = this.opprettAvtaleKlikk.bind(this);
        this.lagreMaal = this.lagreMaal.bind(this);
        this.slettMaal = this.slettMaal.bind(this);
        this.lagreOppgave = this.lagreOppgave.bind(this);
        this.slettOppgave = this.slettOppgave.bind(this);
        this.visFeilmelding = this.visFeilmelding.bind(this);
        this.service = createService();
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

        const paaAvtaleSide = this.state.valgtAvtaleId !== undefined;
        if (paaAvtaleSide) {
            this.service
                .hentAvtale(this.state.valgtAvtaleId)
                .then(avtale => this.setState({ avtale }));
        }
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
        this.service.hentAvtale(avtaleId).then(avtale => {
            this.setState({ avtale });
        });
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

    avtaleKlikk(avtaleId: string) {
        this.service.hentAvtale(avtaleId).then(avtale => {
            this.setState({ avtale }, () => {
                this.props.history.push(
                    pathTilKontaktinformasjonSteg(avtaleId)
                );
            });
        });
    }

    opprettAvtaleKlikk() {
        this.service.opprettAvtale().then((avtale: Avtale) => {
            const nyeAvtaler: Map<string, Avtale> = new Map<string, Avtale>(
                this.state.avtaler
            );
            nyeAvtaler.set(avtale.id, avtale);
            this.setState(
                {
                    avtaler: nyeAvtaler,
                    valgtAvtaleId: avtale.id,
                    avtale,
                },
                () => {
                    this.props.history.push(
                        pathTilKontaktinformasjonSteg(avtale.id)
                    );
                }
            );
        });
    }

    render() {
        const context: Context = {
            avtale: this.state.avtale,
            settAvtaleVerdi: this.settAvtaleVerdi,
            lagreAvtale: this.lagreAvtale,
            lagreMaal: this.lagreMaal,
            slettMaal: this.slettMaal,
            lagreOppgave: this.lagreOppgave,
            slettOppgave: this.slettOppgave,
            hentAvtale: this.hentAvtale,
            opprettAvtale: this.opprettAvtaleKlikk,
        };

        return (
            <AvtaleContext.Provider value={context}>
                {this.state.feilmelding && (
                    <Varsel>{this.state.feilmelding}</Varsel>
                )}
                <Switch>
                    <Route
                        path={pathTilOversikt}
                        exact={true}
                        render={() => (
                            <AvtaleOversikt
                                avtaler={this.state.avtaler}
                                avtaleKlikk={this.avtaleKlikk}
                                opprettAvtaleKlikk={this.opprettAvtaleKlikk}
                            />
                        )}
                    />
                    {this.props.children}
                </Switch>
            </AvtaleContext.Provider>
        );
    }
}

export const AvtaleProvider = withRouter(TempAvtaleProvider);

export const medContext = (Component: any) => {
    return (props: any) => (
        <AvtaleConsumer>
            {context => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
};
