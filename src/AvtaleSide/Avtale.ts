export type Malkategori =
    | 'Avklaring'
    | 'Arbeidserfaring'
    | 'Oppnå fagbrev/kompetansebevis'
    | 'Språkopplæring'
    | 'Få jobb på arbeidstreningsplass';

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

    malsetninger: Malsetning[];

    bekreftetAvBruker: boolean;
    bekreftetAvArbeidsgiver: boolean;
    bekreftetAvVeileder: boolean;
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

    malsetninger: [],

    bekreftetAvBruker: false,
    bekreftetAvArbeidsgiver: false,
    bekreftetAvVeileder: false,
};
