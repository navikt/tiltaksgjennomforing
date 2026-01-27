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
    innholdType: 'INNGÅ',
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
            return 'synkronisert med fagsystem';
        case 'ENDRE_KID_OG_KONTONUMMER':
            return 'betalingsinformasjon endret';
        case 'ANNULLERE':
            return '';
    }
};
