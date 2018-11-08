import { Moment } from 'moment';
import * as moment from 'moment';

export type Malkategori =
    | 'Avklaring'
    | 'Arbeidserfaring'
    | 'Oppnå fagbrev/kompetansebevis';

export interface Malsetning {
    kategori: Malkategori;
    beskrivelse: string;
}

export default interface Avtale {
    id: string;
    opprettetTidspunkt: string;

    personfnr: string;
    personnavn: string;
    persontlf: string;

    arbeidsgiverorgnr: string;
    arbeidsgivernavn: string;
    arbeidsgivertlf: string;
    arbeidsgiverkontaktperson: string;

    startDato: Moment;
    sluttDato: Moment;
    malsetninger: Malsetning[];
}

export const tomAvtale: Avtale = {
    id: '',
    opprettetTidspunkt: '',

    personfnr: '',
    personnavn: '',
    persontlf: '',

    arbeidsgiverorgnr: '',
    arbeidsgivernavn: '',
    arbeidsgivertlf: '',
    arbeidsgiverkontaktperson: '',

    startDato: moment(),
    sluttDato: moment(),
    malsetninger: [],
};
