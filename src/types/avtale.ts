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
    refusjonKontaktperson?: RefusjonKontaktperson;

    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;

    arbeidsgiverKontonummer?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
} & InkluderingsInnhold;

export type MentorInnhold = Pick<
    Avtaleinnhold,
    'mentorFornavn' | 'mentorEtternavn' | 'mentorTlf' | 'mentorOppgaver' | 'mentorAntallTimer' | 'mentorTimelonn'
>;

export type TiltaksType =
    | 'ARBEIDSTRENING'
    | 'MIDLERTIDIG_LONNSTILSKUDD'
    | 'VARIG_LONNSTILSKUDD'
    | 'MENTOR'
    | 'INKLUDERINGSTILSKUDD'
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
    | 'MANGLER_SIGNATUR'
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
    erAvtaleInngått: boolean;
    enhetGeografisk?: string;
    enhetsnavnGeografisk?: string;
    enhetOppfolging?: string;
    enhetsnavnOppfolging?: string;
    erAnnullertEllerAvbrutt: boolean;
    kvalifiseringsgruppe: Kvalifiseringsgruppe;
    formidlingsgruppe: Formidlingsgruppe;
    godkjentForEtterregistrering: boolean;
}

export interface RefusjonKontaktperson {
    refusjonKontaktpersonFornavn?: string;
    refusjonKontaktpersonEtternavn?: string;
    refusjonKontaktpersonTlf?: string;
    ønskerVarslingOmRefusjon?: boolean;
}

export interface Avtaleparter {
    bedriftNr: string;
    deltakerFnr: string;
    veilederNavIdent: string;
    beslutterNavIdent: string;
    mentorFnr: string;
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
    mentorTlf?: string;
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
    tiltakstype?: TiltaksType;
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
    godkjentAvMentor?: string;
    erGodkjentTaushetserklæringAvMentor?: boolean;
    avtaleInngått?: string;
    status: AvtaleStatus;
    statusSomEnum: AvtaleStatus;
    godkjentPaVegneAv: boolean;
    godkjentPaVegneGrunn?: GodkjentPaVegneAvDeltakerGrunner;
    felterSomIkkeErFyltUt: Array<keyof Avtaleinnhold>;
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
    | 'ENDRE_INKLUDERINGSTILSKUDD'
    | 'ENDRE_TILSKUDDSBEREGNING'
    | 'ENDRE_STILLING'
    | 'ENDRE_KONTAKTINFO'
    | 'ENDRE_OPPFØLGING_OG_TILRETTELEGGING'
    | 'ENDRE_OM_MENTOR'
    | 'ANNULLERE';

export type AvtaleVersjon = Avtaleinnhold & { id: string; versjon: number; innholdType?: InnholdType } & Godkjenninger;

export type AvtalelisteRessurs = Nettressurs<Avtale[]>;

export type EndreKontaktInfo = {
    arbeidsgiverFornavn?: string;
    arbeidsgiverEtternavn?: string;
    arbeidsgiverTlf?: string;
    deltakerFornavn?: string;
    deltakerEtternavn?: string;
    deltakerTlf?: string;
    veilederFornavn?: string;
    veilederEtternavn?: string;
    veilederTlf?: string;
    refusjonKontaktperson: RefusjonKontaktperson;
};

export type InkluderingstilskuddsutgiftType =
    | 'TILRETTELEGGINGSBEHOV'
    | 'TILTAKSPLASS'
    | 'UTSTYR'
    | 'PROGRAMVARE'
    | 'ARBEIDSHJELPEMIDLER'
    | 'OPPLÆRING'
    | 'FORSIKRING_LISENS_SERTIFISERING';

export interface InkluderingsInnhold {
    inkluderingstilskuddsutgift: Inkluderingstilskuddsutgift[];
    inkluderingstilskuddBegrunnelse: string;
    inkluderingstilskuddTotalBeløp: number;
}

export interface Inkluderingstilskuddsutgift {
    id?: string;
    beløp: number;
    type: InkluderingstilskuddsutgiftType;
    tidspunktLagtTil?: string;
}

export interface AlleredeRegistrertAvtale {
    id: string;
    avtaleNr: number;
    tiltakstype: TiltaksType;
    deltakerFnr: string;
    bedriftNr: string;
    veilederNavIdent: string;
    status: AvtaleStatus;
    opprettetAvArbeidsgiver: boolean;
    startDato: string;
    sluttDato: string;
    godkjentAvVeileder: string;
    godkjentAvBeslutter: string;
    avtaleInngått: string;
}

export type EndreOppfølgingOgTilretteleggingInfo = Oppfolging & Tilrettelegging;
