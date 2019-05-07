import { Maalkategori } from './maalkategorier';

export type Avtale = AvtaleMetadata &
    Deltakerinfo &
    Bedriftinfo &
    Arbeidsgiverinfo &
    Veilederinfo &
    Arbeidstid &
    MaalListe &
    Oppgaver &
    Oppfolging &
    Godkjenninger &
    Tilrettelegging;


export interface AvtaleMetadata {
    id: string;
    opprettetTidspunkt: string;
    versjon: string;
}

export interface Deltakerinfo {
    deltakerFornavn: string;
    deltakerEtternavn: string;
    deltakerFnr: string;
}

export interface Bedriftinfo {
    bedriftNavn: string;
    bedriftNr: string;
}

export interface Arbeidsgiverinfo {
    arbeidsgiverFnr: string;
    arbeidsgiverFornavn: string;
    arbeidsgiverEtternavn: string;
    arbeidsgiverTlf: string;
}

export interface Veilederinfo {
    veilederNavIdent: string;
    veilederFornavn: string;
    veilederEtternavn: string;
    veilederTlf: string;
}

export interface Arbeidstid {
    startDato: number;
    arbeidstreningLengde: number;
    arbeidstreningStillingprosent: number;
}

export interface MaalListe {
    maal: Maal[];
}

export interface Maal {
    id?: string;
    opprettetTimestamp?: number;
    kategori: Maalkategori;
    beskrivelse: string;
}

export interface Oppgaver {
    oppgaver: Oppgave[];
}

export interface Oppgave {
    id?: string;
    opprettetTimestamp?: number;
    tittel: string;
    beskrivelse: string;
    opplaering: string;
}

export interface Oppfolging {
    oppfolging: string;
}

export interface Tilrettelegging {
    tilrettelegging: string;
}

export interface Godkjenninger {
    godkjentAvDeltaker: boolean;
    godkjentAvArbeidsgiver: boolean;
    godkjentAvVeileder: boolean;
    status: string;
    erLaast: boolean;
}
