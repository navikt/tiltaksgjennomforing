import { Moment } from 'moment';
import * as moment from 'moment';

export default interface AvtaleModell {
    id: string;
    opprettetTidspunkt: string;

    personfnr: string;
    personnavn: string;
    persontlf: string;

    arbeidsgiverorgnr: string;
    arbeidsgivernavn: string;
    arbeidsgivertlf: string;
    arbeidsgiverkontaktperson: string;

    maal: string;

    startDato: Moment;
    sluttDato: Moment;
}

export const tomAvtale: AvtaleModell = {
    id: '',
    opprettetTidspunkt: '',

    personfnr: '',
    personnavn: '',
    persontlf: '',

    arbeidsgiverorgnr: '',
    arbeidsgivernavn: '',
    arbeidsgivertlf: '',
    arbeidsgiverkontaktperson: '',

    maal: '',

    startDato: moment(),
    sluttDato: moment(),
};
