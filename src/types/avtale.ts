import { Nettressurs } from '@/types/nettressurs';
import { Maalkategori } from './maalkategorier';

export type Avtale<T extends FellesAvtaleinnhold = AltAvtaleinnhold> = Avbrytelse &
    AvtaleMetadata &
    Avtaleparter &
    Versjonering<T> &
    Godkjenninger &
    T;

type FellesAvtaleinnhold = Arbeidsgiverinfo &
    Bedriftinfo &
    Deltakerinfo &
    Oppfolging &
    Stilling &
    Tilrettelegging &
    Varighet &
    Veilederinfo;

export type ArbeidstreningAvtaleinnhold = FellesAvtaleinnhold & MaalListe & Oppgaver;

export type LonnstilskuddAvtaleinnhold = FellesAvtaleinnhold & Beregningsgrunnlag & Kontonummer;

export type MentorAvtaleinnhold = FellesAvtaleinnhold & Mentorinfo;

export type AltAvtaleinnhold = ArbeidstreningAvtaleinnhold & LonnstilskuddAvtaleinnhold & MentorAvtaleinnhold;

export type TiltaksType = 'ARBEIDSTRENING' | 'MIDLERTIDIG_LONNSTILSKUDD' | 'VARIG_LONNSTILSKUDD' | 'MENTOR';

export interface AvtaleMetadata {
    id: string;
    opprettetTidspunkt: string;
    sistEndret: string;
    tiltakstype: TiltaksType;
}

export interface Avtaleparter {
    bedriftNr: string;
    deltakerFnr: string;
    veilederNavIdent: string;
}

export interface Bedriftinfo {
    bedriftNavn: string;
}

export interface Arbeidsgiverinfo {
    arbeidsgiverFornavn: string;
    arbeidsgiverEtternavn: string;
    arbeidsgiverTlf: string;
}

export interface Deltakerinfo {
    deltakerFornavn: string;
    deltakerEtternavn: string;
    deltakerTlf: string;
}
export interface Veilederinfo {
    veilederFornavn: string;
    veilederEtternavn: string;
    veilederTlf: string;
}

export interface Mentorinfo {
    mentorFornavn: string;
    mentorEtternavn: string;
    mentorOppgaver: string;
    mentorAntallTimer: number;
    mentorTimelonn: number;
}

export interface Varighet {
    startDato: string;
    sluttDato: string;
    stillingprosent: number;
}

export interface Stilling {
    stillingtype?: string;
    arbeidsoppgaver?: string;
}

export interface Beregningsgrunnlag {
    manedslonn?: number;
    feriepengesats: number;
    arbeidsgiveravgift: number;
    lonnstilskuddProsent?: number;
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
    kategori: Maalkategori;
    beskrivelse: string;
}

export interface Oppgaver {
    oppgaver: Oppgave[];
}

export interface Oppgave {
    id?: string;
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
    godkjentPaVegneGrunn?: GodkjentPaVegneGrunner;
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

export type AvtaleVersjon<T extends FellesAvtaleinnhold> = T & { versjon: number } & Godkjenninger;

export interface Versjonering<T extends FellesAvtaleinnhold> {
    versjoner: AvtaleVersjon<T>[];
    kanLåsesOpp: boolean;
    tiltakstype: TiltaksType;
}

export type AvtalelisteRessurs = Nettressurs<Avtale[]>;
