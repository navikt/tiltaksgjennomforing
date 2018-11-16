import * as React from 'react';
import { Avtale } from './avtale';
import { hentAvtale, lagreAvtale } from '../services/firebase';
import * as moment from 'moment';
import { medAlleAvtalerContext } from './avtaleOversiktcontext';

export const tomAvtale: Avtale = {
    id: '',
    opprettetTidspunkt: '',

    deltakerFornavn: '',
    deltakerEtternavn: '',
    deltakerAdresse: '',
    deltakerPostnummer: '',
    deltakerPoststed: '',

    bedriftNavn: '',
    bedriftAdresse: '',
    bedriftPostnummer: '',
    bedriftPoststed: '',

    arbeidsgiverFornavn: '',
    arbeidsgiverEtternavn: '',
    arbeidsgiverEpost: '',
    arbeidsgiverTlf: '',

    veilederFornavn: '',
    veilederEtternavn: '',
    veilederEpost: '',
    veilederTlf: '',

    startDatoTimestamp: moment().valueOf(),
    sluttDatoTimestamp: moment().valueOf(),
    maalsetninger: [],

    bekreftetAvBruker: false,
    bekreftetAvArbeidsgiver: false,
    bekreftetAvVeileder: false,
};

export interface Context {
    avtale: Avtale;
    settAvtaleVerdi: (felt: string, verdi: any) => void;
    lagreAvtale: () => void;
    valgtAvtaleId: string;
}

const AvtaleContext = React.createContext<Context>({
    avtale: tomAvtale,
    settAvtaleVerdi: () => {}, // tslint:disable-line
    lagreAvtale: () => {}, // tslint:disable-line
    valgtAvtaleId: '',
});

export const AvtaleConsumer = AvtaleContext.Consumer;

interface State {
    avtale: Avtale;
}

interface Props {
    valgtAvtaleId: string;
}

class AvtaleProviderr extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { avtale: tomAvtale };
        this.settAvtaleVerdi = this.settAvtaleVerdi.bind(this);
        this.lagreAvtale = this.lagreAvtale.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        // Skal bare hente avtale hvis IDen er satt og den er ny
        if (
            this.props.valgtAvtaleId !== '' &&
            this.props.valgtAvtaleId !== prevProps.valgtAvtaleId
        ) {
            hentAvtale(this.props.valgtAvtaleId).then(avtale => {
                console.log('Oppdaterer!', this.props.valgtAvtaleId); // tslint:disable-line no-console
                this.setState({ avtale });
            });
        }
    }

    settAvtaleVerdi(felt: string, verdi: any) {
        const avtale = { ...this.state.avtale };
        avtale[felt] = verdi;
        this.setState({ avtale });
    }

    lagreAvtale() {
        lagreAvtale(this.state.avtale);
    }

    render() {
        const context: Context = {
            avtale: this.state.avtale,
            settAvtaleVerdi: this.settAvtaleVerdi,
            lagreAvtale: this.lagreAvtale,
            valgtAvtaleId: this.props.valgtAvtaleId,
        };

        return (
            <AvtaleContext.Provider value={context}>
                {this.props.children}
            </AvtaleContext.Provider>
        );
    }
}

export const AvtaleProvider = medAlleAvtalerContext(AvtaleProviderr);

export const medContext = (Component: any) => {
    return (props: any) => (
        <AvtaleConsumer>
            {context => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
};
