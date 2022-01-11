import { Formidlingsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Formidlingsgruppe';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { Nettressurs } from '@/types/nettressurs';
import { Maalkategori } from './maalkategorier';

export type Avtale = Annullering &
    Avbrytelse &
    Readonly<AvtaleMetadata> &
    Avtaleparter &
    Godkjenninger &
    TilskuddsPerioder & { gjeldendeInnhold: Avtaleinnhold };

export type Avtaleinnhold = {
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    bedriftNavn: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    oppfolging?: string;
    stillingstittel?: string;
    arbeidsoppgaver?: string;
    stillingstype?: Stillingstype;
    stillingKonseptId?: number;
    stillingStyrk08?: number;
    tilrettelegging?: string;
    startDato?: string;
    sluttDato?: string;
    antallDagerPerUke?: number;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    maal: Maal[];

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

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
};

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
    avtaleNr: number;
    opprettetTidspunkt: string;
    sistEndret: string;
    tiltakstype: TiltaksType;
    erUfordelt: boolean;
    enhetGeografisk?: string;
    enhetsnavnGeografisk?: string;
    enhetOppfolging?: string;
    enhetsnavnOppfolging?: string;
    erAnnullertEllerAvbrutt: boolean;
    kvalifiseringsgruppe: Kvalifiseringsgruppe;
    formidlingsgruppe: Formidlingsgruppe;
    godkjentForEtterregistrering: boolean;
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
    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;
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
    enhet?: string;
    enhetsnavn?: string;
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
    godkjentPaVegneGrunn?: GodkjentPaVegneAvDeltakerGrunner;
    felterSomIkkeErFyltUt: (keyof Avtaleinnhold)[];
    ikrafttredelsestidspunkt?: string;
}

export interface Annullering {
    annullertTidspunkt?: string;
    annullertGrunn?: string;
}

export interface Avbrytelse {
    avbrutt: boolean;
    avbruttDato: string;
    avbruttGrunn: AvbrytelseGrunn;
}

export interface GodkjentPaVegneAvDeltakerGrunner {
    ikkeBankId: boolean;
    reservert: boolean;
    digitalKompetanse: boolean;
}
export interface GodkjentPaVegneAvArbeidsgiverGrunner {
    klarerIkkeGiFaTilgang: boolean;
    vetIkkeHvemSomKanGiTilgang: boolean;
    farIkkeTilgangPersonvern: boolean;
}

export interface GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner {
    godkjentPaVegneAvDeltakerGrunn: GodkjentPaVegneAvDeltakerGrunner;
    godkjentPaVegneAvArbeidsgiverGrunn: GodkjentPaVegneAvArbeidsgiverGrunner;
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

export type AvtaleVersjon = Avtaleinnhold & { id: string; versjon: number; innholdType?: InnholdType } & Godkjenninger;

export type AvtalelisteRessurs = Nettressurs<Avtale[]>;

export type EndreKontaktInfo = Deltakerinfo & Veilederinfo & Arbeidsgiverinfo;
export type EndreOppfølgingOgTilretteleggingInfo = Oppfolging & Tilrettelegging;
