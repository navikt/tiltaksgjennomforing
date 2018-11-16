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

    // Metoden blir bare kjørt en gang når komponenten rendres for første gang.
    // Da er this.props.valgtAvtaleId ikke satt enda.
    // hentAvtale() må kjøres når this.props.valgtAvtaleId endres.
    componentDidMount() {
        if (this.props.valgtAvtaleId === '') {
            console.log('valgtAvtaleId er undefined, oppdaterer ikke.'); // tslint:disable-line no-console
            return;
        }
        console.log('Oppdaterer!'); // tslint:disable-line no-console
        hentAvtale(this.props.valgtAvtaleId).then(avtale => {
            this.setState({ avtale });
        });
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

// export const AvtaleProvider = AvtaleProviderr;
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
