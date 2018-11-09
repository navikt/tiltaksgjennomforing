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

    startDatoTimestamp: number;
    sluttDatoTimestamp: number;
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

    startDatoTimestamp: moment().valueOf(),
    sluttDatoTimestamp: moment().valueOf(),
    malsetninger: [],
};
