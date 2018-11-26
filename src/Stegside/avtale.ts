import { Maalkategori } from './maalkategorier';

export type Avtale = AvtaleMetadata &
    Deltakerinfo &
    Bedriftinfo &
    Arbeidsgiverinfo &
    Veilederinfo &
    Arbeidstid &
    MaalListe &
    Oppfolging &
    Bekreftelser;

export interface AvtaleMetadata {
    id: string;
    opprettetTidspunkt: string;
}

export interface Deltakerinfo {
    deltakerFornavn: string;
    deltakerEtternavn: string;
    deltakerAdresse: string;
    deltakerPostnummer: string;
    deltakerPoststed: string;
}

export interface Bedriftinfo {
    bedriftNavn: string;
    bedriftAdresse: string;
    bedriftPostnummer: string;
    bedriftPoststed: string;
}

export interface Arbeidsgiverinfo {
    arbeidsgiverFornavn: string;
    arbeidsgiverEtternavn: string;
    arbeidsgiverEpost: string;
    arbeidsgiverTlf: string;
}

export interface Veilederinfo {
    veilederFornavn: string;
    veilederEtternavn: string;
    veilederEpost: string;
    veilederTlf: string;
}

export interface Arbeidstid {
    startDatoTimestamp: number;
}

export interface MaalListe {
    maal: Maal[];
}

export interface Maal {
    id: string;
    opprettetTimestamp: number;
    kategori: Maalkategori;
    beskrivelse: string;
}

export interface Oppfolging {
    oppfolging: string;
    tilrettelegging: string;
}

export interface Bekreftelser {
    bekreftetAvBruker: boolean;
    bekreftetAvArbeidsgiver: boolean;
    bekreftetAvVeileder: boolean;
}
