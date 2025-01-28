import {
    Avtaleinnhold,
    AvtaleStatus,
    AvtaleVersjon,
    InkluderingstilskuddsutgiftType,
    Returårsaker,
    Stillingstype,
    TilskuddPeriodeRefusjonStatus,
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
    stillingprosent: 'stillingsprosent',
    stillingstittel: 'stillingstittel',
    tilrettelegging: 'tilrettelegging',
    veilederEtternavn: 'veileders etternavn',
    veilederFornavn: 'veileders fornavn',
    veilederTlf: 'veileders telefonnummer',
    harFamilietilknytning: 'familietilknytning',
    familietilknytningForklaring: 'forklaring på familietilknytning',
    feriepengerBelop: 'feriepenger opptjent',
    otpBelop: 'obligatorisk tjenestepensjon',
    otpSats: 'obligatorisk tjenestepensjon',
    arbeidsgiveravgiftBelop: 'arbeidsgiveravgift beløp',
    sumLonnsutgifter: 'sum utgifter til lønnstilskudd',
    sumLonnstilskudd: 'sum beløp til utbetaling',
    stillingKonseptId: '',
    stillingStyrk08: '',
    enhetKostnadssted: 'enhetKostnadssted',
    enhetsnavnKostnadssted: 'enhetsnavnKostnadssted',
    refusjonKontaktperson: 'refusjonKontaktperson',
    inkluderingstilskuddsutgift: '',
    inkluderingstilskuddBegrunnelse: 'Begrunnelse for inkluderingstilskudd',
    inkluderingstilskuddTotalBeløp: 'Totalbeløp for inkluderingstilskudd',
    inkluderingstilskuddSats: 'Årlig gjeldende inkluderingstilskuddsats',
};

export const inkluderingstilskuddtypeTekst: { [key in InkluderingstilskuddsutgiftType]: string } = {
    TILRETTELEGGINGSBEHOV: 'a. Tilretteleggingsbehov',
    TILTAKSPLASS: 'b. Tiltaksplass',
    UTSTYR: 'c. Utstyr',
    ARBEIDSHJELPEMIDLER: 'd. Arbeidshjelpemidler',
    PROGRAMVARE: 'e. Programvare',
    FORSIKRING_LISENS_SERTIFISERING: 'f. Forsikring, lisenser og sertifisering',
    OPPLÆRING: 'g. Opplæring',
};

export const tiltakstypeTekst: { [key in TiltaksType]: string } = {
    ARBEIDSTRENING: 'arbeidstrening',
    MIDLERTIDIG_LONNSTILSKUDD: 'midlertidig lønnstilskudd',
    VARIG_LONNSTILSKUDD: 'varig lønnstilskudd',
    MENTOR: 'mentor',
    INKLUDERINGSTILSKUDD: 'inkluderingstilskudd',
    SOMMERJOBB: 'sommerjobb',
    VTAO: 'varig tilrettelagt arbeid i ordinær virksomhet',
};

export const tiltakstypeTekstKort: { [key in TiltaksType]: string } = { ...tiltakstypeTekst, VTAO: 'VTA-O' };

export const avtaleTittel: { [key in TiltaksType]: string } = {
    ARBEIDSTRENING: 'Avtale om arbeidstrening',
    MIDLERTIDIG_LONNSTILSKUDD: 'Avtale om midlertidig lønnstilskudd',
    VARIG_LONNSTILSKUDD: 'Avtale om varig lønnstilskudd',
    MENTOR: 'Avtale om tilskudd til mentor',
    INKLUDERINGSTILSKUDD: 'Avtale om inkluderingstilskudd',
    SOMMERJOBB: 'Avtale om sommerjobb',
    VTAO: 'Avtale om varig tilrettelagt arbeid i ordinær virksomhet',
};

export const stillingstype: { [key in Stillingstype]: string } = {
    FAST: 'Fast',
    MIDLERTIDIG: 'Midlertidig',
};

export const tilskuddsperiodeStatusTekst: { [key in TilskuddPeriodeStatus]: string } = {
    GODKJENT: 'Godkjent',
    AVSLÅTT: 'Returnert',
    UBEHANDLET: 'Ubehandlet',
    ANNULLERT: 'Annullert',
    BEHANDLET_I_ARENA: 'Behandlet i Arena',
    OPPFØLGING_KREVES: 'Oppfølging kreves',
};

export const tilskuddsperiodeRefusjonStatusText: { [key in TilskuddPeriodeRefusjonStatus]: string } = {
    SENDT_KRAV: 'Refusjon godkjent',
    UTBETALT: 'Utbetalt',
};

export const avtaleStatusTekst: { [key in AvtaleStatus]: string } = {
    ANNULLERT: 'Annullert',
    AVBRUTT: 'Avbrutt',
    PÅBEGYNT: 'Påbegynt',
    MANGLER_SIGNATUR: 'Mangler signatur',
    MANGLER_GODKJENNING: 'Mangler godkjenning',
    KLAR_FOR_OPPSTART: 'Klar for oppstart',
    GJENNOMFØRES: 'Gjennomføres',
    AVSLUTTET: 'Avsluttet',
    OPPFØLGING_KREVES: 'Oppfølging kreves',
};

export const tilskuddsperiodeReturÅrsakTekst: { [key in Returårsaker]: string } = {
    FEIL_I_FAKTA: 'Feil i fakta',
    FEIL_I_REGELFORSTÅELSE: 'Feil i regelforståelse',
    FEIL_I_PROSENTSATS: 'Feil i prosentsats',
    ANNET: 'Annet',
};

export const innholdTypeTekst: (avtaleVersjon: AvtaleVersjon) => string = (avtaleVersjon) => {
    if (!avtaleVersjon.innholdType) {
        return '';
    }
    switch (avtaleVersjon.innholdType) {
        case 'INNGÅ':
            return 'inngåelse, godkjent av alle parter';
        case 'LÅSE_OPP':
            return avtaleVersjon.avtaleInngått ? 'endring, godkjent av alle parter' : 'endring, ikke godkjent ennå';
        case 'FORLENGE':
            return 'forlenget av veileder';
        case 'FORKORTE':
            return 'forkortet av veileder';
        case 'ENDRE_MÅL':
            return 'mål endret av veileder';
        case 'ENDRE_INKLUDERINGSTILSKUDD':
            return 'inkluderingstilskudd endret av veileder';
        case 'ENDRE_TILSKUDDSBEREGNING':
            return 'tilskuddsberegning endret av veileder';
        case 'ENDRE_STILLING':
            return 'stillingsinformasjon endret av veileder';
        case 'ENDRE_KONTAKTINFO':
            return 'kontaktinformasjon endret av veileder';
        case 'ENDRE_OPPFØLGING_OG_TILRETTELEGGING':
            return 'oppfølging/tilrettelegging endret av veileder';
        case 'ENDRE_OM_MENTOR':
            return 'om mentor endret av veileder';
        case 'ENDRET_AV_ARENA':
            return 'dato og arbeidstid synkronisert med fagsystem (Arena)';
        case 'ANNULLERE':
            return '';
    }
};

export const missmatchAvtaler = [
    '21436c5c-2184-4e72-a7d0-be69c7fc6706',
    '75674528-86cb-4986-9eb4-e665b1a51e34',
    'd42946b4-c138-483e-98d5-85b3e09b94fc',
    'a6740d94-833d-4145-b015-0efd80460321',
    '33a3ed28-414c-4b60-b594-3e28eeb9dddd',
    '865fee00-1a31-459d-9eea-f2e788f6b0b4',
    '39e9a216-35e5-441c-b965-bc60d60a5e6e',
    '5f0280e4-aa18-4569-9e05-5a828d529aee',
    'f5d96d8e-3c7d-44ac-910d-74031e0fbc81',
    'f29a571c-797e-4eff-a38e-bfb20985d50a',
    '1b6df2b0-cdc0-48e1-8118-9f9910083963',
    '3f1c8118-0b8e-434c-a847-fcfd261e2363',
    '3f3e82ee-c811-4707-9c49-cd59aa72de92',
    'bca128c6-67ea-429e-8dc2-e151e8b06e4b',
    '2b2b4961-d93a-4194-a8b8-1964b1d47619',
    'ebcd1f09-458e-4435-a46d-6f1f442aff69',
];
