export default interface AvtaleModell {
    id?: string;
    opprettetTidspunkt?: string;

    personfnr?: string;
    personnavn?: string;
    persontlf?: string;

    arbeidsgiverorgnr?: string;
    arbeidsgivernavn?: string;
    arbeidsgivertlf?: string;
    arbeidsgiverkontaktperson?: string;

    maal?: string;
}