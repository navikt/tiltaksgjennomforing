import { Nettressurs } from '@/types/nettressurs';
import { Maalkategori } from './maalkategorier';

export type Avtale = Annullering &
    Avbrytelse &
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

export type TiltaksType =
    | 'ARBEIDSTRENING'
    | 'MIDLERTIDIG_LONNSTILSKUDD'
    | 'VARIG_LONNSTILSKUDD'
    | 'MENTOR'
    | 'SOMMERJOBB';
export type TilskuddPeriodeStatus = 'UBEHANDLET' | 'GODKJENT' | 'AVSLÅTT' | 'ANNULLERT' | 'UTBETALT';
export type AvbrytelseGrunn =
    | 'Feilregistrering'
    | 'Begynt i arbeid'
    | 'Fått tilbud om annet tiltak'
    | 'Syk'
    | 'Ikke møtt'
    | 'Fullført'
    | 'Annet'
    | '';

export type AvtaleStatus =
    | 'ANNULLERT'
    | 'AVBRUTT'
    | 'PÅBEGYNT'
    | 'MANGLER_GODKJENNING'
    | 'KLAR_FOR_OPPSTART'
    | 'GJENNOMFØRES'
    | 'AVSLUTTET';

export interface AvtaleMetadata {
    id: string;
    opprettetTidspunkt: string;
    sistEndret: string;
    tiltakstype: TiltaksType;
    erUfordelt: boolean;
    enhetGeografisk?: string;
    enhetOppfolging?: string;
}

export interface Avtaleparter {
    bedriftNr: string;
    deltakerFnr: string;
    veilederNavIdent: string;
    beslutterNavIdent: string;
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
    antallDagerPerUke?: number;
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
    datoForRedusertProsent?: string;
    sumLønnstilskuddRedusert?: number;
}

export interface TilskuddsPerioder {
    tilskuddPeriode: TilskuddsPeriode[];
    gjeldendeTilskuddsperiode?: TilskuddsPeriode;
}

export type Avslagsårsaker = 'FEIL_I_FAKTA' | 'FEIL_I_REGELFORSTÅELSE' | 'ANNET' | 'FEIL_I_PROSENTSATS';

export interface TilskuddsPeriode {
    beløp: number;
    løpenummer: number;
    id: string;
    startDato: string;
    sluttDato: string;
    godkjentTidspunkt?: string;
    godkjentAvNavIdent?: string;
    avslåttTidspunkt?: string;
    avslåttAvNavIdent?: string;
    avslagsforklaring?: string;
    avslagsårsaker: Set<Avslagsårsaker>;
    status: TilskuddPeriodeStatus;
    lonnstilskuddProsent: number;
    kanBesluttesFom: string;
    aktiv: boolean;
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
    godkjentAvDeltaker?: string;
    godkjentAvArbeidsgiver?: string;
    godkjentAvVeileder?: string;
    avtaleInngått?: string;
    status: AvtaleStatus;
    statusSomEnum: AvtaleStatus;
    godkjentPaVegneAv: boolean;
    godkjentPaVegneGrunn?: GodkjentPaVegneGrunner;
    erLaast: boolean;
    felterSomIkkeErFyltUt: (keyof Avtaleinnhold)[];
    ikrafttredelsestidspunkt?: string;
}

export interface Annullering {
    annullertTidspunkt?: string;
    annullertGrunn?: string;
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

export type InnholdType =
    | 'INNGÅ'
    | 'LÅSE_OPP'
    | 'FORLENGE'
    | 'FORKORTE'
    | 'ENDRE_MÅL'
    | 'ENDRE_TILSKUDDSBEREGNING'
    | 'ENDRE_STILLING'
    | 'ENDRE_KONTAKTINFO'
    | 'ENDRE_OPPFØLGING_OG_TILRETTELEGGING'
    | 'ANNULLERE';

export type AvtaleVersjon = Avtaleinnhold & { versjon: number; innholdType?: InnholdType } & Godkjenninger;

export interface Versjonering {
    versjoner: AvtaleVersjon[];
    kanLåsesOpp: boolean;
    tiltakstype: TiltaksType;
}

export type AvtalelisteRessurs = Nettressurs<Avtale[]>;

export type EndreKontaktInfo = Veilederinfo & Arbeidsgiverinfo;
export type EndreOppfølgingOgTilretteleggingInfo = Oppfolging & Tilrettelegging;
