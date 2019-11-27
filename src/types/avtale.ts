import { Maalkategori } from './maalkategorier';
import { Nettressurs } from '@/types/nettressurs';

export type Avtale = MidlertidigLonnstilskuddAvtale & ArbeidstreningAvtale & VarigLonnstilskuddAvtale;

export type MidlertidigLonnstilskuddAvtale = Arbeidsgiverinfo &
    Avbrytelse &
    AvtaleMetadata &
    Bedriftinfo &
    Beregningsgrunnlag &
    Deltakerinfo &
    Godkjenninger &
    Kontonummer &
    MaalListe &
    Oppfolging &
    Oppgaver &
    Stilling &
    Tilrettelegging &
    Varighet &
    Veilederinfo & { godkjentPaVegneGrunn: GodkjentPaVegneGrunner };

export type ArbeidstreningAvtale = Arbeidsgiverinfo &
    Avbrytelse &
    AvtaleMetadata &
    Bedriftinfo &
    Deltakerinfo &
    Godkjenninger &
    MaalListe &
    Oppfolging &
    Oppgaver &
    Tilrettelegging &
    Varighet &
    Veilederinfo & { godkjentPaVegneGrunn: GodkjentPaVegneGrunner };

export type VarigLonnstilskuddAvtale = Arbeidsgiverinfo &
    Avbrytelse &
    AvtaleMetadata &
    Bedriftinfo &
    Beregningsgrunnlag &
    Deltakerinfo &
    Godkjenninger &
    MaalListe &
    Oppfolging &
    Oppgaver &
    Stilling &
    Tilrettelegging &
    Varighet &
    Veilederinfo & { godkjentPaVegneGrunn: GodkjentPaVegneGrunner };

export type TiltaksType = 'ARBEIDSTRENING' | 'MIDLERTIDIG_LONNSTILSKUDD' | 'VARIG_LONNSTILSKUDD';

export interface AvtaleMetadata {
    id: string;
    opprettetTidspunkt: string;
    sistEndret: string;
    tiltakstype: TiltaksType;
}

export interface Bedriftinfo {
    bedriftNavn: string;
    bedriftNr: string;
}

export interface Arbeidsgiverinfo {
    arbeidsgiverFornavn: string;
    arbeidsgiverEtternavn: string;
    arbeidsgiverTlf: string;
}

export interface Deltakerinfo {
    deltakerFornavn: string;
    deltakerEtternavn: string;
    deltakerFnr: string;
    deltakerTlf: string;
}
export interface Veilederinfo {
    veilederNavIdent: string;
    veilederFornavn: string;
    veilederEtternavn: string;
    veilederTlf: string;
}

export interface Varighet {
    startDato: number;
    sluttDato: number;
    stillingprosent: number;
}

export interface Stilling {
    stillingtype?: string;
    stillingbeskrivelse?: string;
}

export interface Beregningsgrunnlag {
    manedslonn?: number;
    feriepengesats: number;
    arbeidsgiveravgift: number;
    lonnstilskuddProsent: string;
    stillingprosent: number;
}

export interface Kontonummer {
    arbeidsgiverKontonummer: string;
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
    godkjentPaVegneAv: boolean;
    erLaast: boolean;
}

export interface Avbrytelse {
    kanAvbrytes: boolean;
    avbrutt: boolean;
}
export interface GodkjentPaVegneGrunner {
    ikkeBankId: boolean;
    reservert: boolean;
    digitalKompetanse: boolean;
}

export type AvtalelisteRessurs = Nettressurs<Avtale[]>;
