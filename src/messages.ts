import {
    Avslagsårsaker,
    Avtaleinnhold,
    AvtaleStatus,
    Stillingstype,
    TilskuddPeriodeStatus,
    TiltaksType,
} from './types/avtale';

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
    ANNULLERT: 'Annullert',
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
