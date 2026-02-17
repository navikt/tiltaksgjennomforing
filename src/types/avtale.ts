import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { Formidlingsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Formidlingsgruppe';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { Diskresjonskode } from '@/types/diskresjon';
import { Nettressurs } from '@/types/nettressurs';
import { Maalkategori } from './maalkategorier';

export type Avtale = Annullering &
    Readonly<AvtaleMetadata> &
    Avtaleparter &
    Godkjenninger &
    TilskuddsPerioder & { gjeldendeInnhold: Avtaleinnhold };

export interface PageableAvtale {
    currentPage: number;
    avtaler: AvtaleMinimalListeVisning[];
    size: number;
    totalItems: number;
    totalPages: number;
    sokId: string;
    sokeParametere: Filtrering;
    sorteringskolonne: keyof Avtale;
    sorteringOrder: string;
}

export interface PageableAvtaleMinimalForBeslutter {
    currentPage: number;
    avtaler: AvtaleMinimalForBeslutter[]; // Array<AvtaleMinimalForBeslutter>;
    size: number;
    totalItems: number;
    totalPages: number;
}

export interface PageableAvtaleMinimal {
    currentPage: number;
    avtaler: AvtaleMinimalListeVisning[];
    size: number;
    totalItems: number;
    totalPages: number;
    sokId: string;
    sokeParametere: Filtrering;
    sorteringskolonne: keyof Avtale;
    sorteringOrder: string;
}

export type AvtaleMinimalListeVisning = {
    id: string;
    deltakerFornavn: string;
    deltakerEtternavn: string;
    bedriftNavn: string;
    veilederNavIdent: string;
    startDato: string | null;
    sluttDato: string | null;
    status: AvtaleStatus;
    tiltakstype: TiltaksType;
    erGodkjentTaushetserklæringAvMentor: boolean;
    gjeldendeTilskuddsperiodeStatus: TilskuddPeriodeStatus;
    kommendeOppfolging?: KommendeOppfolging;
    opprettetTidspunkt: string;
    sistEndret: string;
    diskresjonskode: Diskresjonskode;
};

export type AvtaleMinimalForBeslutter = {
    antallUbehandlet: string;
    deltakerEtternavn: string;
    deltakerFnr: string;
    deltakerFornavn: string;
    id: string;
    startDato: string;
    veilederNavIdent: string;
    bedriftNavn: string;
    status: TilskuddPeriodeStatus;
    tiltakstype: TiltaksType;
    diskresjonskode: Diskresjonskode;
    harReturnertSomKanBehandles: boolean;
};

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
    arbeidsgiverKid?: string;
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;

    mentorFornavn?: string;
    mentorTlf?: string;
    mentorEtternavn?: string;
    mentorOppgaver?: string;
    mentorAntallTimer?: number;
    mentorTimelonn?: number;
    mentorValgtLonnstype?: MentorValgtLonnstype;
    mentorValgtLonnstypeBelop?: number;
    innholdType: AvtaleInnholdType;
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
    | 'SOMMERJOBB'
    | 'VTAO';

export type TilskuddPeriodeStatus =
    | 'UBEHANDLET'
    | 'GODKJENT'
    | 'AVSLÅTT'
    | 'ANNULLERT'
    | 'BEHANDLET_I_ARENA'
    | 'OPPFØLGING_KREVES';

export type TilskuddPeriodeRefusjonStatus = 'UTBETALT' | 'SENDT_KRAV';

export type AvtaleStatus =
    | 'ANNULLERT'
    | 'PÅBEGYNT'
    | 'MANGLER_SIGNATUR'
    | 'MANGLER_GODKJENNING'
    | 'KLAR_FOR_OPPSTART'
    | 'GJENNOMFØRES'
    | 'AVSLUTTET'
    | 'OPPFØLGING_KREVES';

export type AvtaleInnholdType =
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
    | 'ENDRET_AV_ARENA'
    | 'ENDRE_KID_OG_KONTONUMMER'
    | 'ANNULLERE';

export type Avtaleopphav = 'VEILEDER' | 'ARBEIDSGIVER' | 'ARENA';

export interface AvtaleMetadata {
    id: string;
    avtaleNr: number;
    opprettetTidspunkt: string;
    sistEndret: string;
    tiltakstype: TiltaksType;
    erUfordelt: boolean;
    erAvtaleInngått: boolean;
    erRyddeAvtale: boolean;
    enhetGeografisk?: string;
    enhetsnavnGeografisk?: string;
    enhetOppfolging?: string;
    enhetsnavnOppfolging?: string;
    kvalifiseringsgruppe: Kvalifiseringsgruppe;
    formidlingsgruppe: Formidlingsgruppe;
    godkjentForEtterregistrering: boolean;
    opphav: Avtaleopphav;
    kommendeOppfolging?: KommendeOppfolging;
    feilregistrert: boolean;
    erOpprettetEllerEndretAvArena: boolean;
}

export interface RefusjonKontaktperson {
    refusjonKontaktpersonFornavn?: string;
    refusjonKontaktpersonEtternavn?: string;
    refusjonKontaktpersonTlf?: string;
    ønskerVarslingOmRefusjon?: boolean;
}

export interface KommendeOppfolging {
    oppfolgingKanUtfores: boolean;
    oppfolgingstarter: string;
    oppfolgingsfrist: string;
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
    mentorValgtLonnstype?: MentorValgtLonnstype;
    mentorValgtLonnstypeBelop?: number;
    stillingprosent?: number;
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

export type MentorValgtLonnstype = 'ÅRSLØNN' | 'MÅNEDSLØNN' | 'UKELØNN' | 'DAGSLØNN' | 'TIMELØNN';

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
    mentorAntallTimer?: number;
    mentorValgtLonnstypeBelop?: number;
    mentorValgtLonnstype?: MentorValgtLonnstype;
    mentorTimelonn?: number;
}

export interface TilskuddsPerioder {
    tilskuddPeriode: TilskuddsPeriode[];
    gjeldendeTilskuddsperiode?: TilskuddsPeriode;
    enhetKostnadssted?: string;
    enhetsnavnKostnadssted?: string;
}

export type Returårsaker = 'FEIL_I_FAKTA' | 'FEIL_I_REGELFORSTÅELSE' | 'ANNET' | 'FEIL_I_PROSENTSATS';

export type ArbeidsAvgiftSats = 0.141 | 0.106 | 0.064 | 0.051 | 0.079 | 0;
export type FerieSatser = 0 | 0.12 | 0.143 | 0.102 | 0.125;

export interface TilskuddsPeriode {
    beløp?: number;
    løpenummer: number;
    id: string;
    startDato: string;
    sluttDato: string;
    godkjentTidspunkt?: string;
    godkjentAvNavIdent?: string;
    avslåttTidspunkt?: string;
    avslåttAvNavIdent?: string;
    avslagsforklaring?: string;
    avslagsårsaker: Set<Returårsaker>;
    refusjonStatus?: TilskuddPeriodeRefusjonStatus;
    status: TilskuddPeriodeStatus;
    lonnstilskuddProsent: number;
    kanBesluttesFom: string;
    kanBehandles: boolean;
    aktiv: boolean;
    enhet?: string;
    enhetsnavn?: string;
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
    godkjentPaVegneAv: boolean;
    godkjentPaVegneGrunn?: GodkjentPaVegneAvDeltakerGrunner;
    felterSomIkkeErFyltUt: Array<keyof Avtaleinnhold>;
    ikrafttredelsestidspunkt?: string;
}

export interface Annullering {
    annullertTidspunkt?: string;
    annullertGrunn?: string;
}

export interface GodkjentPaVegneAvDeltakerGrunner {
    ikkeBankId: boolean;
    reservert: boolean;
    digitalKompetanse: boolean;
    arenaMigreringDeltaker: boolean;
}

export interface GodkjentPaVegneAvArbeidsgiverGrunner {
    klarerIkkeGiFaTilgang: boolean;
    vetIkkeHvemSomKanGiTilgang: boolean;
    farIkkeTilgangPersonvern: boolean;
    arenaMigreringArbeidsgiver: boolean;
}

export interface GodkjentPaVegneAvDeltakerOgArbeidsgiverGrunner {
    godkjentPaVegneAvDeltakerGrunn: GodkjentPaVegneAvDeltakerGrunner;
    godkjentPaVegneAvArbeidsgiverGrunn: GodkjentPaVegneAvArbeidsgiverGrunner;
}

export interface RelasjonerInfo {
    harFamilietilknytning?: boolean;
    familietilknytningForklaring?: string;
}

export type AvtaleVersjon = Avtaleinnhold & { id: string; versjon: number } & Godkjenninger;

export type PageableAvtalelisteRessurs = Nettressurs<PageableAvtaleMinimal>;
export type AvtalelisteMinimalForBeslutterRessurs = Nettressurs<AvtaleMinimalForBeslutter[]>;

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
    inkluderingstilskuddSats: number;
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
    opphav: Avtaleopphav;
    startDato: string;
    sluttDato: string;
    godkjentAvVeileder: string;
    godkjentAvBeslutter: string;
    avtaleInngått: string;
}

export type EndreOppfølgingOgTilretteleggingInfo = Oppfolging & Tilrettelegging;
