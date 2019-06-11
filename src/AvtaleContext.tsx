import moment from 'moment';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Avtale, Maal, Oppgave } from './AvtaleSide/avtale';
import Varsel from './komponenter/Varsel/Varsel';
import RestService from './services/rest-service';
import ApiError from './api-error';

export const tomAvtale: Avtale = {
    id: '',
    opprettetTidspunkt: '',
    versjon: '',

    deltakerFnr: '',
    deltakerFornavn: '',
    deltakerEtternavn: '',

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
};

export interface Context {
    avtale: Avtale;
    rolle: Rolle;
    settAvtaleVerdi: (felt: keyof Avtale, verdi: any) => void;
    lagreAvtale: () => Promise<any>;
    lagreMaal: (maal: Maal) => Promise<any>;
    slettMaal: (maal: Maal) => Promise<any>;
    lagreOppgave: (oppgave: Oppgave) => Promise<any>;
    slettOppgave: (oppgave: Oppgave) => Promise<any>;
    hentAvtale: (avtaleId: string) => Promise<any>;
    opprettAvtale: (deltakerFnr: string, bedriftNr: string) => Promise<Avtale>;
    hentRolle: (avtaleId: string) => Promise<any>;
    godkjenn: (godkjent: boolean) => Promise<any>;
    visFeilmelding: (feilmelding: string) => void;
    endretSteg: () => void;
}

export type Rolle = 'DELTAKER' | 'ARBEIDSGIVER' | 'VEILEDER' | 'INGEN_ROLLE';

const AvtaleContext = React.createContext<Context>({} as Context);

export const AvtaleConsumer = AvtaleContext.Consumer;

interface State {
    avtale: Avtale;
    feilmelding: string;
    rolle: Rolle;
    ulagredeEndringer: boolean;
}

export class TempAvtaleProvider extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            avtale: tomAvtale,
            feilmelding: '',
            rolle: 'INGEN_ROLLE',
            ulagredeEndringer: false,
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
        this.godkjennAvtale = this.godkjennAvtale.bind(this);
        this.endretSteg = this.endretSteg.bind(this);
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

    konverterGodkjentTilBool = (avtale: Avtale) => {
        const {
            godkjentAvArbeidsgiver,
            godkjentAvDeltaker,
            godkjentAvVeileder,
        } = avtale;

        let godkjenninger = {
            godkjentAvArbeidsgiver: godkjentAvArbeidsgiver,
            godkjentAvDeltaker: godkjentAvDeltaker,
            godkjentAvVeileder: godkjentAvVeileder,
        };

        if (
            godkjentAvArbeidsgiver &&
            typeof godkjentAvArbeidsgiver !== 'boolean'
        ) {
            godkjenninger.godkjentAvArbeidsgiver = true;
        }
        if (godkjentAvDeltaker && typeof godkjentAvDeltaker !== 'boolean') {
            godkjenninger.godkjentAvDeltaker = true;
        }
        if (godkjentAvVeileder && typeof godkjentAvVeileder !== 'boolean') {
            godkjenninger.godkjentAvVeileder = true;
        }
        return godkjenninger;
    };

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

    async opprettAvtale(
        deltakerFnr: string,
        bedriftNr: string
    ): Promise<Avtale> {
        const avtale = await RestService.opprettAvtale(deltakerFnr, bedriftNr);
        this.setState({
            avtale,
        });
        return avtale;
    }

    async godkjennAvtale() {
        const avtaleId = this.state.avtale.id;
        await RestService.godkjennAvtale(avtaleId);
        await this.hentAvtale(avtaleId);
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
            godkjenn: this.godkjennAvtale,
            visFeilmelding: this.visFeilmelding,
            endretSteg: this.endretSteg,
        };

        return (
            <>
                {this.state.feilmelding && (
                    <Varsel
                        kanLukkes={true}
                        onLukkVarsel={this.fjernFeilmelding}
                        type={'info'}
                    >
                        {this.state.feilmelding}
                    </Varsel>
                )}
                <AvtaleContext.Provider value={context}>
                    {this.props.children}
                </AvtaleContext.Provider>
            </>
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
