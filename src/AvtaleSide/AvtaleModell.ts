export type Malkategori = 'Avklaring' | 'Arbeidserfaring' | 'Oppnå fagbrev/kompetansebevis';

export interface Malsetning {
    kategori: Malkategori;
    beskrivelse: string;
}

export default class AvtaleModell {
    // @ts-ignore
    id: string;
    // @ts-ignore
    opprettetTidspunkt: string;

    // @ts-ignore
    personfnr: string;
    // @ts-ignore
    personnavn: string;
    // @ts-ignore
    persontlf: string;

    // @ts-ignore
    arbeidsgiverorgnr: string;
    // @ts-ignore
    arbeidsgivernavn: string;
    // @ts-ignore
    arbeidsgivertlf: string;
    // @ts-ignore
    arbeidsgiverkontaktperson: string;

    // @ts-ignore
    malsetninger: Malsetning[];
    // @ts-ignore
    maal: string;
}

export type AvtaleFelter = keyof AvtaleModell;

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

    malsetninger: [],
    maal: '',
};