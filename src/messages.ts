import {
    Avslagsårsaker,
    Avtaleinnhold,
    AvtaleStatus,
    Stillingstype,
    TilskuddPeriodeStatus,
    TiltaksType,
} from './types/avtale';
import { HendelseType } from './types/hendelse';

export const messages = {
    FÅ_JOBB_I_BEDRIFTEN: 'Få jobb i bedriften',
    ARBEIDSERFARING: 'Arbeidserfaring',
    UTPRØVING: 'Utprøving',
    SPRÅKOPPLÆRING: 'Språkopplæring',
    OPPNÅ_FAGBREV_KOMPETANSEBEVIS: 'Oppnå fagbrev/kompetansebevis',
    ANNET: 'Annet',
};

export const avtaleFelterBokmal: { [key in keyof Avtaleinnhold]: string } = {
    arbeidsgiverEtternavn: 'arbeidsgivers etternavn',
    arbeidsgiverFornavn: 'arbeidsgivers fornavn',
    arbeidsgiverKontonummer: 'arbeidsgivers kontonummer',
    arbeidsgiverTlf: 'arbeidsgivers telefonnummer',
    arbeidsgiveravgift: 'arbeidsgiveravgift',
    arbeidsoppgaver: 'arbeidsoppgaver',
    bedriftNavn: 'bedriftnavn',
    deltakerEtternavn: 'deltakers etternavn',
    deltakerFornavn: 'deltakers fornavn',
    deltakerTlf: 'deltakers telefonnummer',
    feriepengesats: 'feriepengesats',
    lonnstilskuddProsent: 'lønnstilskuddprosent',
    maal: 'mål',
    manedslonn: 'månedslønn',
    mentorAntallTimer: 'antall timer med mentor',
    mentorEtternavn: 'mentors etternavn',
    mentorFornavn: 'mentors fornavn',
    mentorOppgaver: 'mentors oppgaver',
    mentorTimelonn: 'mentors timelønn',
    oppfolging: 'oppfølging',
    sluttDato: 'sluttdato',
    startDato: 'startdato',
    tilskuddPeriode: 'tilskuddPeriode',
    stillingprosent: 'stillingsprosent',
    stillingstittel: 'stillingstittel',
    tilrettelegging: 'tilrettelegging',
    veilederEtternavn: 'veileders etternavn',
    veilederFornavn: 'veileders fornavn',
    veilederTlf: 'veileders telefonnummer',
    harFamilietilknytning: 'har deltaker familietilknytning til arbeidsgiver',
    familietilknytningForklaring: 'forklaring på familietilknytning',
    feriepengerBelop: 'feriepenger opptjent',
    otpBelop: 'obligatorisk tjenestepensjon',
    otpSats: 'obligatorisk tjenestepensjon',
    arbeidsgiveravgiftBelop: 'arbeidsgiveravgift beløp',
    sumLonnsutgifter: 'sum utgifter til lønnstilskudd',
    sumLonnstilskudd: 'sum beløp til utbetaling',
    stillingKonseptId: '',
    stillingStyrk08: '',
};

export const hendelseTekst: { [key in HendelseType]: string } = {
    OPPRETTET: 'Avtale opprettet',
    OPPRETTET_AV_ARBEIDSGIVER: 'Avtale opprettet',
    GODKJENT_AV_VEILEDER: 'Avtale er godkjent av NAV-veileder',
    GODKJENT_AV_ARBEIDSGIVER: 'Avtale er godkjent av arbeidsgiver',
    GODKJENT_AV_DELTAKER: 'Avtale er godkjent av deltaker',
    GODKJENT_PAA_VEGNE_AV: 'Avtalen ble godkjent på vegne av deltaker',
    GODKJENNINGER_OPPHEVET_AV_ARBEIDSGIVER: 'Avtalens godkjenninger er opphevet',
    GODKJENNINGER_OPPHEVET_AV_VEILEDER: 'Avtalens godkjenninger er opphevet',
    DELT_MED_ARBEIDSGIVER: 'Avtale delt med arbeidsgiver',
    DELT_MED_DELTAKER: 'Avtale delt med deltaker',
    AVBRUTT: 'Avtale avbrutt av veileder',
    LÅST_OPP: 'Avtale låst opp av veileder',
    ENDRET: 'Avtale endret',
    SMS_VARSLING_FEILET: 'Varsling på SMS har feilet',
    GJENOPPRETTET: 'Avtale gjenopprettet',
    NY_VEILEDER: 'Avtale tildelt ny veileder',
    AVTALE_FORDELT: 'Avtale tildelt veileder',
    TILSKUDDSPERIODE_AVSLATT: 'Avtalen din er avslått. Det blir ikke noe jobb på deg',
    TILSKUDDSPERIODE_GODKJENT: 'Tilskuddsperiode godkjent',
    AVTALE_FORLENGET: 'Avtale forlenget av veileder',
    TILSKUDDSBEREGNING_ENDRET: 'Tilskuddsberegning er blitt endret for avtalen',
};

export const tiltakstypeTekst: { [key in TiltaksType]: string } = {
    ARBEIDSTRENING: 'Arbeidstrening',
    MIDLERTIDIG_LONNSTILSKUDD: 'Midlertidig lønnstilskudd',
    VARIG_LONNSTILSKUDD: 'Varig lønnstilskudd',
    MENTOR: 'Mentor',
    SOMMERJOBB: 'Sommerjobb',
};

export const avtaleTittel = {
    ARBEIDSTRENING: 'Avtale om arbeidstrening',
    MIDLERTIDIG_LONNSTILSKUDD: 'Avtale om midlertidig lønnstilskudd',
    VARIG_LONNSTILSKUDD: 'Avtale om varig lønnstilskudd',
    MENTOR: 'Avtale om tilskudd til mentor',
    SOMMERJOBB: 'Avtale om sommerjobb',
};

export const stillingstype: { [key in Stillingstype]: string } = {
    FAST: 'Fast',
    MIDLERTIDIG: 'Midlertidig',
};

export const tilskuddsperiodeStatusTekst: { [key in TilskuddPeriodeStatus]: string } = {
    GODKJENT: 'Godkjent',
    AVSLÅTT: 'Avslått',
    UBEHANDLET: 'Ubehandlet',
    UTBETALT: 'Utbetalt',
    ANNULLERT: 'Annullert',
};

export const avtaleStatusTekst: { [key in AvtaleStatus]: string } = {
    AVBRUTT: 'Avbrutt',
    PÅBEGYNT: 'Påbegynt',
    MANGLER_GODKJENNING: 'Mangler godkjenning',
    KLAR_FOR_OPPSTART: 'Klar for oppstart',
    GJENNOMFØRES: 'Gjennomføres',
    AVSLUTTET: 'Avsluttet',
};

export const tilskuddsperiodeAvslagTekst: { [key in Avslagsårsaker]: string } = {
    FEIL_I_FAKTA: 'Feil i fakta',
    FEIL_I_REGELFORSTÅELSE: 'Feil i regelforståelse',
    FEIL_I_PROSENTSATS: 'Feil i prosentsats',
    ANNET: 'Annet',
};
