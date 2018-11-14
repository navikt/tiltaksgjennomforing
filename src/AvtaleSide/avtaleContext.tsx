import * as React from 'react';
import { Avtale } from './avtale';
import * as moment from 'moment';
import { hentAvtale } from '../services/firebase';

interface AvtaleContext {
    avtale: Avtale;
    endreAvtale: (felt: string, verdi: any) => void;
}

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

export const defaultAvtaleContext: AvtaleContext = {
    avtale: tomAvtale,
    endreAvtale: (felt: string, verdi: any) => {}, // tslint:disable-line no-empty
};

export const avtaleContext = React.createContext<AvtaleContext>(
    defaultAvtaleContext
);

export const AvtaleConsumer = avtaleContext.Consumer;

export class AvtaleProvider extends React.Component<any, AvtaleContext> {
    private endreVerdi: (felt: string, verdi: any) => void;

    constructor(props: any) {
        super(props);

        this.endreVerdi = (felt: string, verdi: any) => {
            const avtale = { ...this.state.avtale };
            avtale[felt] = verdi;
            this.setState({ avtale });
        };

        this.state = {
            avtale: tomAvtale,
            endreAvtale: this.endreVerdi,
        };
    }

    componentDidMount() {
        const avtaleId =
            prompt('Skriv inn avtaleid: ') || '-LQIc8uXV0lEGTRPNwuG';
        hentAvtale(avtaleId).then(avtale => {
            // console.log(avtaleId); // tslint:disable-line no-console
            console.log(avtale); // tslint:disable-line no-console
            this.setState({ avtale });
        });
    }

    render() {
        return (
            <avtaleContext.Provider value={this.state}>
                {this.props.children}
            </avtaleContext.Provider>
        );
    }
}
