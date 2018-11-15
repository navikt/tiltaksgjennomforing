import * as React from 'react';
import { Avtale } from './avtale';
import { hentAvtale } from '../services/firebase';
import * as moment from 'moment';

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

interface Context {
    avtale: Avtale;
    endreAvtale: (felt: string, verdi: any) => void;
}

const AvtaleContext = React.createContext<Context>({
    avtale: tomAvtale,
    endreAvtale: () => {}, // tslint:disable-line
});

export const AvtaleConsumer = AvtaleContext.Consumer;

export class AvtaleProvider extends React.Component<{}, Avtale> {
    constructor(props: {}) {
        super(props);
        this.state = tomAvtale;
        this.endreAvtale = this.endreAvtale.bind(this);
    }

    componentWillMount() {
        hentAvtale('-LQIc8uXV0lEGTRPNwuG').then(avtale => {
            this.setState(avtale);
        });
    }

    endreAvtale(felt: string, verdi: any) {
        const avtale = this.state;
        avtale[felt] = verdi;
        this.setState(avtale);
    }

    render() {
        const context: Context = {
            avtale: this.state,
            endreAvtale: this.endreAvtale,
        };

        return (
            <AvtaleContext.Provider value={context}>
                {this.props.children}
            </AvtaleContext.Provider>
        );
    }
}

export const medContext = (Component: any) => {
    return (props: any) => (
        <AvtaleConsumer>
            {context => {
                return <Component {...props} {...context.avtale} />;
            }}
        </AvtaleConsumer>
    );
};
