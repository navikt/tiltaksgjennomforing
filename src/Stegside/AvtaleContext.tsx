import moment from 'moment';
import { string } from 'prop-types';
import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Varsel from '../komponenter/Varsel/Varsel';
import { pathTilKontaktinformasjonSteg, pathTilOversikt } from '../paths';
import Service from '../services/service';
import { createService } from '../services/service-factory';
import { Avtale, Maal, Oppgave } from './avtale';
import AvtaleOversikt from './AvtaleOversikt';
import { ApiFeil } from './ApiFeil';

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
});
// tslint:enable

export const AvtaleConsumer = AvtaleContext.Consumer;

interface State {
    avtaler: Map<string, Avtale>;
    valgtAvtaleId: string;
    feilmelding?: string;
}

export class TempAvtaleProvider extends React.Component<any, State> {
    service: Service;

    constructor(props: any) {
        super(props);

        this.state = {
            avtaler: new Map<string, Avtale>(),
            valgtAvtaleId: '' + props.location.pathname.split('/')[3],
        };

        this.settAvtaleVerdi = this.settAvtaleVerdi.bind(this);
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

    componentDidMount() {
        this.service
            .hentAvtaler()
            .then((avtaler: Map<string, Avtale>) => {
                this.setState({ avtaler });
            })
            .catch((feilmelding: any) => {
                const melding = JSON.stringify(feilmelding);
                if (feilmelding instanceof string) {
                    this.visFeilmelding('Kunne ikke h');
                }
            });
    }

    visFeilmelding(feilmelding: string) {
        this.setState({ feilmelding });
    }

    settAvtaleVerdi(felt: string, verdi: any, callback?: () => void) {
        const avtale = this.state.avtaler.get(this.state.valgtAvtaleId);
        if (avtale) {
            // @ts-ignore
            avtale[felt] = verdi;

            const nyeAvtaler: Map<string, Avtale> = new Map<string, Avtale>(
                this.state.avtaler
            );
            nyeAvtaler.set(this.state.valgtAvtaleId, avtale);

            this.setState({ avtaler: nyeAvtaler }, callback);
        }
    }

    lagreAvtale() {
        const avtale = this.state.avtaler.get(this.state.valgtAvtaleId);
        if (avtale) {
            return this.service
                .lagreAvtale(avtale)
                .then((respons: { versjon: string }) => {
                    this.settAvtaleVerdi('versjon', respons.versjon);
                })
                .catch(this.visFeilmelding);
        }
        return Promise.reject();
    }

    lagreMaal(maalTilLagring: Maal) {
        const avtale = this.state.avtaler.get(this.state.valgtAvtaleId);
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

    slettMaal(maalTilSletting: Maal) {
        const avtale = this.state.avtaler.get(this.state.valgtAvtaleId);
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
        const avtale = this.state.avtaler.get(this.state.valgtAvtaleId);
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
        const avtale = this.state.avtaler.get(this.state.valgtAvtaleId);
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
        this.setState({ valgtAvtaleId: avtaleId });
        this.props.history.push(pathTilKontaktinformasjonSteg(avtaleId));
    }

    opprettAvtaleKlikk() {
        this.service.opprettAvtale().then((avtale: Avtale) => {
            const nyeAvtaler: Map<string, Avtale> = new Map<string, Avtale>(
                this.state.avtaler
            );
            nyeAvtaler.set(avtale.id, avtale);
            this.setState({
                avtaler: nyeAvtaler,
                valgtAvtaleId: avtale.id,
            });
            this.props.history.push(pathTilKontaktinformasjonSteg(avtale.id));
        });
    }

    render() {
        const context: Context = {
            avtale:
                this.state.avtaler.get(this.state.valgtAvtaleId) || tomAvtale,
            settAvtaleVerdi: this.settAvtaleVerdi,
            lagreAvtale: this.lagreAvtale,
            lagreMaal: this.lagreMaal,
            slettMaal: this.slettMaal,
            lagreOppgave: this.lagreOppgave,
            slettOppgave: this.slettOppgave,
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
