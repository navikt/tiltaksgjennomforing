import { Nettressurs } from '@/types/nettressurs';
import { Maalkategori } from './maalkategorier';

export type Avtale = Avbrytelse &
    Readonly<AvtaleMetadata> &
    Avtaleparter &
    Versjonering &
    Godkjenninger &
    Avtaleinnhold;

export type Avtaleinnhold = Arbeidsgiverinfo &
    Bedriftinfo &
    Deltakerinfo &
    Oppfolging &
    Stilling &
    Tilrettelegging &
    Varighet &
    Veilederinfo &
    MaalListe &
    Beregningsgrunnlag &
    TilskuddsPerioder &
    Kontonummer &
    RelasjonerInfo &
    Mentorinfo;

export type TiltaksType = 'ARBEIDSTRENING' | 'MIDLERTIDIG_LONNSTILSKUDD' | 'VARIG_LONNSTILSKUDD' | 'MENTOR';
export type AvbrytelseGrunn =
    | 'Begynt i arbeid'
    | 'Fått tilbud om annet tiltak'
    | 'Syk'
    | 'Ikke møtt'
    | 'Fullført'
    | 'Annet'
    | '';

export interface AvtaleMetadata {
    id: string;
    opprettetTidspunkt: string;
    sistEndret: string;
    tiltakstype: TiltaksType;
    erUfordelt: boolean;
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
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
}

export interface Deltakerinfo {
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
}
export interface Veilederinfo {
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
}

export interface Mentorinfo {
    mentorFornavn?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
}

export interface Varighet {
    startDato?: string;
    sluttDato?: string;
    stillingprosent?: number;
}

export interface Stilling {
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
}

export type Stillingstype = 'FAST' | 'MIDLERTIDIG';
export interface Beregningsgrunnlag {
    manedslonn?: number;
    feriepengesats?: number;
    arbeidsgiveravgift?: number;
    lonnstilskuddProsent?: number;
    stillingprosent?: number;
    feriepengerBelop?: number;
    otpSats?: number;
    otpBelop?: number;
    arbeidsgiveravgiftBelop?: number;
    sumLonnsutgifter?: number;
    sumLonnstilskudd?: number;
    manedslonn100pst?: number;
}

export interface TilskuddsPerioder {
    tilskuddPeriode: TilskuddsPeriode[];
}

export interface TilskuddsPeriode {
    beløp: number;
    id: string;
    startDato: string;
    sluttDato: string;
}

export interface Kontonummer {
    arbeidsgiverKontonummer?: string;
}

export interface MaalListe {
    maal: Maal[];
}

export interface Maal {
    id?: string;
    kategori: Maalkategori;
    beskrivelse: string;
}

export interface Oppfolging {
    oppfolging?: string;
}

export interface Tilrettelegging {
    tilrettelegging?: string;
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
    kanGjenopprettes: boolean;
    avbrutt: boolean;
    avbruttDato: string;
    avbruttGrunn: AvbrytelseGrunn;
}

export interface GodkjentPaVegneGrunner {
    ikkeBankId: boolean;
    reservert: boolean;
    digitalKompetanse: boolean;
}

export interface RelasjonerInfo {
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;
}

export type AvtaleVersjon = Avtaleinnhold & { versjon: number } & Godkjenninger;

export interface Versjonering {
    versjoner: AvtaleVersjon[];
    kanLåsesOpp: boolean;
    tiltakstype: TiltaksType;
}

export type AvtalelisteRessurs = Nettressurs<Avtale[]>;
