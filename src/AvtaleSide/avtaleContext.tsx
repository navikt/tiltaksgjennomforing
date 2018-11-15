import * as React from 'react';
import { Avtale } from './avtale';
import { hentAvtale } from '../services/firebase';
import * as moment from 'moment';
import { EndreAvtale } from './EndreAvtale';

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

type Context = Avtale & EndreAvtale;

const AvtaleContext = React.createContext<Context>({
    ...tomAvtale,
    settAvtaleVerdi: () => {}, // tslint:disable-line
});

export const AvtaleConsumer = AvtaleContext.Consumer;

export class AvtaleProvider extends React.Component<{}, Avtale> {
    constructor(props: {}) {
        super(props);
        this.state = tomAvtale;
        this.settAvtaleVerdi = this.settAvtaleVerdi.bind(this);
    }

    componentWillMount() {
        hentAvtale('-LQIc8uXV0lEGTRPNwuG').then(avtale => {
            this.setState(avtale);
        });
    }

    settAvtaleVerdi(felt: string, verdi: any) {
        const avtale = this.state;
        avtale[felt] = verdi;
        this.setState(avtale);
    }

    render() {
        const context = {
            ...this.state,
            settAvtaleVerdi: this.settAvtaleVerdi,
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
                return <Component {...props} {...context} />;
            }}
        </AvtaleConsumer>
    );
};
