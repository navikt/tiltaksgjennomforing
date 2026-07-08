export type Feilkode =
    | 'ALT_MA_VAERE_FYLT_UT'
    | 'ALTINN_FEIL'
    | 'ARBEIDSGIVER_HAR_GODKJENT'
    | 'ARBEIDSGIVER_SKAL_GODKJENNE_FOER_VEILEDER'
    | 'AVTALE_ER_ALLEREDE_INNGAATT'
    | 'AVTALE_INNEHOLDER_TILSKUDDSPERIODE_MED_GODKJENT_REFUSJON'
    | 'AVTALE_INNEHOLDER_UTBETALT_TILSKUDDSPERIODE'
    | 'DELTAGER_OG_MENTOR_KAN_IKKE_HA_SAMME_FØDSELSNUMMER'
    | 'DELTAKER_67_AAR'
    | 'DELTAKER_72_AAR'
    | 'DELTAKER_HAR_GODKJENT'
    | 'DELTAKER_SKAL_GODKJENNE_FOER_VEILEDER'
    | 'ENHET_ER_JURIDISK'
    | 'ENHET_ER_ORGLEDD'
    | 'ENHET_ER_SLETTET'
    | 'ENHET_FINNES_IKKE'
    | 'ENHET_IKKE_TILGANG_PA_TILTAK'
    | 'ENHET_MANGLER'
    | 'ER_ALLEREDE_VEILEDER'
    | 'FANT_IKKE_INNSATSBEHOV'
    | 'FEIL_KID_NUMMER'
    | 'FEIL_OTP_SATS'
    | 'FIREARIG_LONNSTILSKUDD_FOR_GAMMEL_FRA_OPPSTARTDATO'
    | 'FIREARIG_LONNSTILSKUDD_FOR_SEN_SLUTTDATO'
    | 'FIREARIG_LONNSTILSKUDD_FOR_TIDLIG_OPPSTART'
    | 'FIREARIG_LONNSTILSKUDD_KAN_IKKE_BRUKES_TIL_A_BEHOLDE_ARBEID'
    | 'FOR_SEN_STARTDATO_VTAO'
    | 'FORLENG_MIDLERTIDIG_IKKE_TILGJENGELIG'
    | 'FORTIDLIG_STARTDATO'
    | 'FØDSELSNUMMER_IKKE_GYLDIG'
    | 'GODKJENN_PAA_VEGNE_AV_FEIL_OPPHAV'
    | 'GODKJENN_PAA_VEGNE_AV_FEIL_TILTAKSTYPE'
    | 'GODKJENT_PAA_VEGNE_GRUNN_MAA_VELGES'
    | 'GOSYS_FEIL'
    | 'HENTING_AV_INNSATSBEHOV_FEILET'
    | 'IKKE_ADMIN_TILGANG'
    | 'IKKE_FORDELT'
    | 'IKKE_TILGANG_TIL_A_INNGAA_AVTALE'
    | 'IKKE_TILGANG_TIL_A_OPPRETTE_AVTALE'
    | 'IKKE_TILGANG_TIL_A_OPPRETTE_TILTAK'
    | 'IKKE_TILGANG_TIL_AVTALE'
    | 'IKKE_TILGANG_TIL_DELTAKER'
    | 'IKKE_TILGANG_TIL_DELTAKER_ARBEIDSGIVER'
    | 'IKKE_TILGANG_TIL_DELTAKER_FORTROLIG'
    | 'IKKE_TILGANG_TIL_DELTAKER_SKJERMET'
    | 'IKKE_TILGANG_TIL_DELTAKER_STRENGT_FORTROLIG'
    | 'IKKE_VALGT_PART'
    | 'INKLUDERINGSTILSKUDD_SUM_FOR_HØY'
    | 'KAN_IKKE_ENDRE'
    | 'KAN_IKKE_ENDRE_ANNULLERT_AVTALE'
    | 'KAN_IKKE_ENDRE_ARENA_MIGRERINGSDATO_INNGAATT_AVTALE'
    | 'KAN_IKKE_ENDRE_FEIL_TILTAKSTYPE'
    | 'KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_IKKE_BELOP_ELLER_TYPE'
    | 'KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_IKKE_INNGAATT_AVTALE'
    | 'KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_TOM_LISTE'
    | 'KAN_IKKE_ENDRE_KID_OG_KONTONUMMER_GRUNN_IKKE_GODKJENT_AVTALE'
    | 'KAN_IKKE_ENDRE_KID_OG_KONTONUMMER_GRUNN_MANGLER'
    | 'KAN_IKKE_ENDRE_KONTAKTINFO_GRUNN_IKKE_GODKJENT_AVTALE'
    | 'KAN_IKKE_ENDRE_KONTAKTINFO_GRUNN_MANGLER'
    | 'KAN_IKKE_ENDRE_MAAL_IKKE_BESKRIVELSE_ELLER_KATEGORI'
    | 'KAN_IKKE_ENDRE_MAAL_IKKE_INNGAATT_AVTALE'
    | 'KAN_IKKE_ENDRE_MAAL_TOM_LISTE'
    | 'KAN_IKKE_ENDRE_OKONOMI_IKKE_GODKJENT_AVTALE'
    | 'KAN_IKKE_ENDRE_OKONOMI_UGYLDIG_INPUT'
    | 'KAN_IKKE_ENDRE_OM_MENTOR_IKKE_INNGAATT_AVTALE'
    | 'KAN_IKKE_ENDRE_OM_MENTOR_UGYLDIG_INPUT'
    | 'KAN_IKKE_ENDRE_OPPFØLGING_OG_TILRETTELEGGING_GRUNN_IKKE_GODKJENT_AVTALE'
    | 'KAN_IKKE_ENDRE_OPPFØLGING_OG_TILRETTELEGGING_GRUNN_MANGLER'
    | 'KAN_IKKE_ENDRE_STARTDATO_FOR_AVTALE_ENDRET_AV_ARENA'
    | 'KAN_IKKE_ENDRE_STILLINGSBESKRIVELSE_GRUNN_IKKE_GODKJENT_AVTALE'
    | 'KAN_IKKE_ENDRE_STILLINGSBESKRIVELSE_GRUNN_MANGLER'
    | 'KAN_IKKE_FORKORTE_ETTER_SLUTTDATO'
    | 'KAN_IKKE_FORKORTE_FOR_UTBETALT_TILSKUDDSPERIODE'
    | 'KAN_IKKE_FORKORTE_GRUNN_MANGLER'
    | 'KAN_IKKE_FORKORTE_IKKE_GODKJENT_AVTALE'
    | 'KAN_IKKE_FORLENGE_FEIL_SLUTTDATO'
    | 'KAN_IKKE_FORLENGE_IKKE_GODKJENT_AVTALE'
    | 'KAN_IKKE_FORLENGE_MENTOR_AVTALE_UTEN_TILSKUDDSBEREGNING'
    | 'KAN_IKKE_GODKJENNE_ARBEIDSGIVER_HAR_ALLEREDE_GODKJENT'
    | 'KAN_IKKE_GODKJENNE_DELTAKER_HAR_ALLEREDE_GODKJENT'
    | 'KAN_IKKE_GODKJENNE_MENTOR_HAR_ALLEREDE_GODKJENT'
    | 'KAN_IKKE_GODKJENNE_VEILEDER_HAR_ALLEREDE_GODKJENT'
    | 'KAN_IKKE_LAGE_NYE_TILSKUDDSPRIODER_INNGAATT_AVTALE'
    | 'KAN_IKKE_LASTE_NED_PDF'
    | 'KAN_IKKE_MERKES_FOR_ETTERREGISTRERING_AVTALE_GODKJENT'
    | 'KAN_IKKE_OPPHEVE'
    | 'KAN_IKKE_OPPHEVE_GODKJENNINGER_VED_INNGAATT_AVTALE'
    | 'KAN_IKKE_REBEREGNE'
    | 'KONTOREGISTER_FEIL'
    | 'KONTOREGISTER_FEIL_BEDRIFT_IKKE_FUNNET'
    | 'KREVER_OPPFØLGING_AV_VTAO'
    | 'KVALIFISERINGSGRUPPE_FIREARIG_LONNTILSKUDD_FOR_UNGE_FEIL'
    | 'KVALIFISERINGSGRUPPE_IKKE_RETTIGHET'
    | 'KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL'
    | 'KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL'
    | 'KVALIFISERINGSGRUPPE_VTAO_FEIL'
    | 'LONNSTILSKUDD_PROSENT_ER_UGYLDIG'
    | 'MANGLER_BEREGNING'
    | 'MANGLER_BESLUTTERTILGANG'
    | 'MANGLER_VEILEDER_PÅ_AVTALE'
    | 'MENTOR_MÅ_SIGNERE_TAUSHETSERKLÆRING'
    | 'NAV_ENHET_IKKE_FUNNET'
    | 'OPPFOLGINGSTATUS_ENDRET'
    | 'ROLLE_HAR_IKKE_TILGANG'
    | 'SAMTIDIGE_ENDRINGER'
    | 'SLUTTDATO_GRENSE_NÅDD'
    | 'SOMMERJOBB_FOR_GAMMEL'
    | 'SOMMERJOBB_FOR_GAMMEL_FRA_OPPSTARTDATO'
    | 'SOMMERJOBB_FOR_LANG_VARIGHET'
    | 'SOMMERJOBB_FOR_SENT'
    | 'SOMMERJOBB_FOR_TIDLIG'
    | 'SOMMERJOBB_IKKE_GAMMEL_NOK'
    | 'START_ETTER_SLUTT'
    | 'TILSKUDDSPERIODE_AVSLAGSFORKLARING_PAAKREVD'
    | 'TILSKUDDSPERIODE_BEHANDLE_FOR_TIDLIG'
    | 'TILSKUDDSPERIODE_ENHET_FIRE_SIFFER'
    | 'TILSKUDDSPERIODE_ER_ALLEREDE_BEHANDLET'
    | 'TILSKUDDSPERIODE_INGEN_AVSLAGSAARSAKER'
    | 'TILSKUDDSPERIODE_IKKE_GODKJENNE_EGNE'
    | 'TILSKUDDSPERIODE_KAN_KUN_BEHANDLES_VED_INNGAATT_AVTALE'
    | 'UGYLDIG_AVTALETYPE'
    | 'UGYLDIG_FØDSELSNUMMER'
    | 'UGYLDIG_KOMBINASJON_AV_ISSUER_OG_ROLLE'
    | 'UGYLDIG_TLF'
    | 'UGYLDIG_VIRKSOMHETSNUMMER'
    | 'VARIGHET_DATO_TILBAKE_I_TID'
    | 'VARIGHET_FOR_LANG_ARBEIDSTRENING'
    | 'VARIGHET_FOR_LANG_FIREARIG_LONNSTILSKUDD_2_AAR'
    | 'VARIGHET_FOR_LANG_FIREARIG_LONNSTILSKUDD_4_AAR'
    | 'VARIGHET_FOR_LANG_INKLUDERINGSTILSKUDD'
    | 'VARIGHET_FOR_LANG_MENTOR_36_MND'
    | 'VARIGHET_FOR_LANG_MENTOR_6_MND'
    | 'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_12_MND'
    | 'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_24_MND'
    | 'VEILEDER_SKAL_GODKJENNE_SIST';

export const Feilmeldinger: { [key in Feilkode]: string } = {
    ALT_MA_VAERE_FYLT_UT: 'Alt må være fylt ut før du kan godkjenne',
    ALTINN_FEIL: 'Feil ved oppslag mot altinn',
    ARBEIDSGIVER_HAR_GODKJENT: 'Arbeidsgiver har allerede godkjent avtalen',
    ARBEIDSGIVER_SKAL_GODKJENNE_FOER_VEILEDER: 'Arbeidsgiver må godkjenne avtalen før veileder kan godkjenne',
    AVTALE_ER_ALLEREDE_INNGAATT: 'Avtalen er allerede inngått',
    AVTALE_INNEHOLDER_TILSKUDDSPERIODE_MED_GODKJENT_REFUSJON:
        'Avtalen inneholder tilskuddsperiode(er) med godkjente refusjon(er). Avtalen kan derfor ikke annulleres.',
    AVTALE_INNEHOLDER_UTBETALT_TILSKUDDSPERIODE:
        'Avtalen inneholder utbetalte tilskuddsperiode(er). Avtalen kan derfor ikke annulleres.',
    DELTAGER_OG_MENTOR_KAN_IKKE_HA_SAMME_FØDSELSNUMMER: 'Deltaker og mentor kan ikke ha det samme fødselsnummeret',
    DELTAKER_67_AAR: 'Deltaker må være under 67 år ved sluttdatoen av tiltaket',
    DELTAKER_72_AAR: 'Deltaker må være under 72 år ved sluttdatoen av tiltaket',
    DELTAKER_HAR_GODKJENT: 'Deltaker har allerede godkjent avtalen',
    DELTAKER_SKAL_GODKJENNE_FOER_VEILEDER:
        'Deltaker må godkjenne avtalen før veileder kan godkjenne på vegne av arbeidsgiver',
    ENHET_ER_JURIDISK: 'Avtale må registreres på virksomhetens virksomhetsnummer, ikke den juridiske enheten.',
    ENHET_ER_ORGLEDD: 'Avtale må registreres på virksomhetens virksomhetsnummer, ikke organisasjonsleddet.',
    ENHET_ER_SLETTET:
        'Virksomheten er ikke lenger aktiv. Dette kan skyldes at den har lagt ned eller blitt omorganisert.',
    ENHET_FINNES_IKKE: 'Finnes ikke i Enhetsregisteret.',
    ENHET_IKKE_TILGANG_PA_TILTAK: 'Deltakeren hører til en enhet som ikke støtter dette tiltaket.',
    ENHET_MANGLER:
        'Oppfølgingsenhet mangler. Vennligst påse at deltaker er under oppfølging og har en gyldig oppfølgingsperiode.',
    ER_ALLEREDE_VEILEDER: 'Innlogget bruker er allerede veileder på denne avtalen',
    FANT_IKKE_INNSATSBEHOV: 'Innsatsbehov for deltakeren ble ikke funnet',
    FEIL_KID_NUMMER: 'KID-nummeret er ikke gyldig. Påse at det er skrevet inn riktig, og prøv igjen.',
    FEIL_OTP_SATS: 'Sats for obligatorisk tjenestepensjon må være mellom 0 og 30 %.',
    FIREARIG_LONNSTILSKUDD_FOR_GAMMEL_FRA_OPPSTARTDATO:
        'Deltaker kan ikke være eldre enn 30 år ved oppstart av tiltaket',
    FIREARIG_LONNSTILSKUDD_FOR_SEN_SLUTTDATO:
        'Fireårig lønnstilskudd for unge kan ikke ha sluttdato senere enn 31.12.2032',
    FIREARIG_LONNSTILSKUDD_FOR_TIDLIG_OPPSTART: 'Fireårig lønnstilskudd for unge kan tidligst starte 01.08.2026',
    FIREARIG_LONNSTILSKUDD_KAN_IKKE_BRUKES_TIL_A_BEHOLDE_ARBEID:
        'Fireårig lønnstilskudd for unge kan ikke brukes til å beholde arbeid',
    FOR_SEN_STARTDATO_VTAO: 'Seneste mulig oppstart er 31.08.2026.',
    FORLENG_MIDLERTIDIG_IKKE_TILGJENGELIG: 'Forlengelse er ikke tilgjengelig for denne avtaletypen',
    FORTIDLIG_STARTDATO: 'Startdatoen for avtalen er mer enn 7 dager tilbake i tid og må derfor åpnes av NAV',
    FØDSELSNUMMER_IKKE_GYLDIG: 'Fødselsnummeret er ikke gyldig. Påse at det er skrevet inn riktig, og prøv igjen.',
    GODKJENN_PAA_VEGNE_AV_FEIL_OPPHAV: 'Kan ikke godkjenne på vegne av for avtaler som ikke er importert fra Arena',
    GODKJENN_PAA_VEGNE_AV_FEIL_TILTAKSTYPE: 'Kan ikke godkjenne på vegne av for mentoravtaler',
    GODKJENT_PAA_VEGNE_GRUNN_MAA_VELGES: 'Arbeidsgiver må godkjenne avtalen før veileder kan godkjenne',
    GOSYS_FEIL: 'Klarte ikke å opprette oppgave i Gosys. Prøv igjen senere.',
    HENTING_AV_INNSATSBEHOV_FEILET: 'Feil ved henting av innsatsbehov',
    IKKE_ADMIN_TILGANG: 'Du har ikke tilgang til denne administrator-funksjonaliteten',
    IKKE_FORDELT: 'Avtalen er ikke fordelt til en veileder',
    IKKE_TILGANG_TIL_A_INNGAA_AVTALE: 'Du har ikke tilgang til å inngå avtale på denne deltakeren',
    IKKE_TILGANG_TIL_A_OPPRETTE_AVTALE:
        'Du kan ikke opprette avtale på denne deltakeren. Det kan være fordi deltakeren hører til en enhet som ikke støtter dette tiltaket.',
    IKKE_TILGANG_TIL_A_OPPRETTE_TILTAK: 'Du har ikke tilgang til å opprette avtale på dette tiltaket',
    IKKE_TILGANG_TIL_AVTALE: 'Du har ikke tilgang til denne avtalen',
    IKKE_TILGANG_TIL_DELTAKER: 'Du har ikke tilgang til deltaker',
    IKKE_TILGANG_TIL_DELTAKER_ARBEIDSGIVER:
        'Du har dessverre ikke tilgang til å opprette avtale på denne deltakeren. Ta kontakt med Nav.',
    IKKE_TILGANG_TIL_DELTAKER_FORTROLIG:
        'Dette er en avtale med fortrolige opplysninger. Du har ikke tilgang til denne avtalen.',
    IKKE_TILGANG_TIL_DELTAKER_SKJERMET:
        'Dette er en avtale med skjermede opplysninger. Du har ikke tilgang til denne avtalen.',
    IKKE_TILGANG_TIL_DELTAKER_STRENGT_FORTROLIG:
        'Dette er en avtale med strengt fortrolige opplysninger. Du har ikke tilgang til denne avtalen.',
    IKKE_VALGT_PART: 'Ikke valgt part',
    INKLUDERINGSTILSKUDD_SUM_FOR_HØY: 'Totalbeløpet for tilskudd overstiger det maksimale beløpet',
    KAN_IKKE_ENDRE: 'Kan ikke endre avtale.',
    KAN_IKKE_ENDRE_ANNULLERT_AVTALE: 'Kan ikke endre en annullert avtale',
    KAN_IKKE_ENDRE_ARENA_MIGRERINGSDATO_INNGAATT_AVTALE:
        'Avtalen er inngått. Arena-migreringsdato kan derfor ikke endres. Annuller og opprett avtalen på nytt.',
    KAN_IKKE_ENDRE_FEIL_TILTAKSTYPE: 'Denne handlingen er ikke tilgjengelig for denne avtaletypen',
    KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_IKKE_BELOP_ELLER_TYPE: 'Inkluderingstilskudd må ha både beløp og type',
    KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_IKKE_INNGAATT_AVTALE:
        'Inkluderingstilskudd kan kun endres på en inngått avtale',
    KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_TOM_LISTE: 'Du må ha minst ett tilskudd',
    KAN_IKKE_ENDRE_KID_OG_KONTONUMMER_GRUNN_IKKE_GODKJENT_AVTALE:
        'KID og kontonummer kan kun endres på en godkjent avtale',
    KAN_IKKE_ENDRE_KID_OG_KONTONUMMER_GRUNN_MANGLER: 'Alle felt må være utfylt',
    KAN_IKKE_ENDRE_KONTAKTINFO_GRUNN_IKKE_GODKJENT_AVTALE: 'Kontaktinformasjon kan kun endres på en godkjent avtale',
    KAN_IKKE_ENDRE_KONTAKTINFO_GRUNN_MANGLER: 'Alle felt må være utfylt',
    KAN_IKKE_ENDRE_MAAL_IKKE_BESKRIVELSE_ELLER_KATEGORI: 'Mål må ha både beskrivelse og kategori',
    KAN_IKKE_ENDRE_MAAL_IKKE_INNGAATT_AVTALE: 'Mål kan kun endres på en inngått avtale',
    KAN_IKKE_ENDRE_MAAL_TOM_LISTE: 'Du må ha minst ett mål',
    KAN_IKKE_ENDRE_OKONOMI_IKKE_GODKJENT_AVTALE: 'Tilskuddsberegning kan kun endres på en godkjent avtale',
    KAN_IKKE_ENDRE_OKONOMI_UGYLDIG_INPUT: 'Kunne ikke endre beregning. Ett eller flere felt har ugyldig verdi.',
    KAN_IKKE_ENDRE_OM_MENTOR_IKKE_INNGAATT_AVTALE: 'Mentorinformasjon kan kun endres på en inngått avtale',
    KAN_IKKE_ENDRE_OM_MENTOR_UGYLDIG_INPUT: 'Alle felt for mentor må være utfylt',
    KAN_IKKE_ENDRE_OPPFØLGING_OG_TILRETTELEGGING_GRUNN_IKKE_GODKJENT_AVTALE:
        'Oppfølging og tilrettelegging kan kun endres på en godkjent avtale',
    KAN_IKKE_ENDRE_OPPFØLGING_OG_TILRETTELEGGING_GRUNN_MANGLER: 'Alle felt må være utfylt',
    KAN_IKKE_ENDRE_STARTDATO_FOR_AVTALE_ENDRET_AV_ARENA:
        'Avtalen er importert fra gammelt system, og oppstartsdato kan derfor ikke endres.',
    KAN_IKKE_ENDRE_STILLINGSBESKRIVELSE_GRUNN_IKKE_GODKJENT_AVTALE:
        'Stillingsbeskrivelse kan kun endres på en godkjent avtale',
    KAN_IKKE_ENDRE_STILLINGSBESKRIVELSE_GRUNN_MANGLER: 'Alle felt må være utfylt',
    KAN_IKKE_FORKORTE_ETTER_SLUTTDATO: 'Avtalen kan ikke forkortes til etter sluttdato',
    KAN_IKKE_FORKORTE_FOR_UTBETALT_TILSKUDDSPERIODE:
        'Avtalen kan ikke forkortes til før en tilskuddsperiode som er godkjent av arbeidsgiver.',
    KAN_IKKE_FORKORTE_GRUNN_MANGLER: 'Grunn for forkortelse må velges',
    KAN_IKKE_FORKORTE_IKKE_GODKJENT_AVTALE: 'Kan ikke forkorte avtalen før den er godkjent',
    KAN_IKKE_FORLENGE_FEIL_SLUTTDATO: 'Avtalen kan ikke forlenges til før sluttdato',
    KAN_IKKE_FORLENGE_IKKE_GODKJENT_AVTALE: 'Avtalen kan ikke forlenges før den er godkjent',
    KAN_IKKE_FORLENGE_MENTOR_AVTALE_UTEN_TILSKUDDSBEREGNING:
        'Mentoravtalen kan ikke forlenges uten en tilskuddsberegning',
    KAN_IKKE_GODKJENNE_ARBEIDSGIVER_HAR_ALLEREDE_GODKJENT: 'Arbeidsgiver har allerede godkjent avtalen',
    KAN_IKKE_GODKJENNE_DELTAKER_HAR_ALLEREDE_GODKJENT: 'Deltaker har allerede godkjent avtalen',
    KAN_IKKE_GODKJENNE_MENTOR_HAR_ALLEREDE_GODKJENT: 'Mentor har allerede signert taushetserklæringen',
    KAN_IKKE_GODKJENNE_VEILEDER_HAR_ALLEREDE_GODKJENT: 'Veileder har allerede godkjent avtalen',
    KAN_IKKE_LAGE_NYE_TILSKUDDSPRIODER_INNGAATT_AVTALE: 'Kan ikke opprette nye tilskuddsperioder på en inngått avtale',
    KAN_IKKE_LASTE_NED_PDF: 'Avtalen er ikke godkjent og kan derfor ikke lastes ned som PDF',
    KAN_IKKE_MERKES_FOR_ETTERREGISTRERING_AVTALE_GODKJENT:
        'Kan ikke endre etterregistrering etter at avtalen er godkjent.',
    KAN_IKKE_OPPHEVE:
        'Kan ikke oppheve godkjenninger i avtalen. Det er gjort endringer i avtalen som du ikke har sett. Oppfrisk siden og prøv igjen.',
    KAN_IKKE_OPPHEVE_GODKJENNINGER_VED_INNGAATT_AVTALE:
        'Avtalen er inngått. Godkjenninger kan derfor ikke oppheves. Forsøk å oppfrisk siden.',
    KAN_IKKE_REBEREGNE: 'Tilskuddsperiodene kan ikke reberegnes',
    KONTOREGISTER_FEIL: 'Feil ved oppslag til kontoregister',
    KONTOREGISTER_FEIL_BEDRIFT_IKKE_FUNNET: 'Finner ikke bedrift hos kontonummerregister',
    KREVER_OPPFØLGING_AV_VTAO:
        'Tilskuddsperioden krever oppfølging. Startdatoen er etter fristen for oppfølging av VTAO-avtalen.',
    KVALIFISERINGSGRUPPE_FIREARIG_LONNTILSKUDD_FOR_UNGE_FEIL:
        'Deltaker kvalifiserer ikke til dette tiltaket. Ved endringer i innsatsbehovet kan det ta opptil 5 min før det er oppdatert.',
    KVALIFISERINGSGRUPPE_IKKE_RETTIGHET:
        'Deltakeren er registrert med en kvalifiseringsgruppe som ikke kvalifiserer til dette tiltaket. Sjekk at innsatsbehovet stemmer. Hvis det stemmer så gi beskjed til arbeidsgiver og annuller avtale. Ved endringer i kvalifiseringsgruppe kan det ta opptil 5 min før det er oppdatert.',
    KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL:
        'Deltaker kvalifiserer ikke til dette tiltaket. Ved endringer i innsatsbehovet kan det ta opptil 5 min før det er oppdatert.',
    KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL:
        'Deltaker kvalifiserer ikke til dette tiltaket. Ved endringer i innsatsbehovet kan det ta opptil 5 min før det er oppdatert.',
    KVALIFISERINGSGRUPPE_VTAO_FEIL:
        'Deltaker kvalifiserer ikke til dette tiltaket. Ved endringer i innsatsbehovet kan det ta opptil 5 min før det er oppdatert.',
    LONNSTILSKUDD_PROSENT_ER_UGYLDIG: 'Ugyldig lønnstilskudd prosent',
    MANGLER_BEREGNING: 'Beregning av tilskudd må være utfylt',
    MANGLER_BESLUTTERTILGANG:
        'Du har ikke tilgang som beslutter i denne løsningen. Ta kontakt med din leder for å få tildelt nødvendige rettigheter.',
    MANGLER_VEILEDER_PÅ_AVTALE: 'Avtalen trenger en veileder før du kan godkjenne',
    MENTOR_MÅ_SIGNERE_TAUSHETSERKLÆRING: 'Veileder må godkjenne avtalen etter deltaker, mentor og arbeidsgiver.',
    NAV_ENHET_IKKE_FUNNET: 'NAV-enheten ble ikke funnet',
    OPPFOLGINGSTATUS_ENDRET:
        'Deltakers innsatsbehov har endret seg, og avtalen må derfor signeres på nytt av alle parter.',
    ROLLE_HAR_IKKE_TILGANG:
        'Du er innlogget med en rolle som ikke har tilgang til å utføre denne handlingen. Forsøk å oppfrisk siden og prøv igjen.',
    SAMTIDIGE_ENDRINGER:
        'Du må oppdatere siden før du kan lagre, godkjenne eller gjøre andre endringer. Det er gjort endringer i avtalen som du ikke har sett.',
    SLUTTDATO_GRENSE_NÅDD: 'Maksimal sluttdato er overskredet. Maksimal sluttdato er 31.12.2089.',
    SOMMERJOBB_FOR_GAMMEL: 'Deltaker må være under 30 år for dette tiltaket',
    SOMMERJOBB_FOR_GAMMEL_FRA_OPPSTARTDATO: 'Deltaker kan ikke ha fylt 30 år før startdatoen til dette tiltaket',
    SOMMERJOBB_FOR_LANG_VARIGHET: 'Sommerjobb kan ikke vare lenger enn 4 uker',
    SOMMERJOBB_FOR_SENT: 'Sommerjobb kan ikke starte etter 31.08',
    SOMMERJOBB_FOR_TIDLIG: 'Sommerjobb kan ikke starte før 01.06',
    SOMMERJOBB_IKKE_GAMMEL_NOK: 'Deltaker må være fylt 16 år',
    START_ETTER_SLUTT: 'Startdato er etter sluttdato',
    TILSKUDDSPERIODE_AVSLAGSFORKLARING_PAAKREVD: 'Avslagsforklaring må fylles ut',
    TILSKUDDSPERIODE_BEHANDLE_FOR_TIDLIG: 'Tilskuddsperioden kan ikke behandles tidligere enn 2 uker før startdato',
    TILSKUDDSPERIODE_ENHET_FIRE_SIFFER: 'Enheten må oppgis som et firesifret tall',
    TILSKUDDSPERIODE_ER_ALLEREDE_BEHANDLET: 'Tilskuddsperioden er allerede behandlet',
    TILSKUDDSPERIODE_INGEN_AVSLAGSAARSAKER: 'Minst én avslagsårsak må velges',
    TILSKUDDSPERIODE_IKKE_GODKJENNE_EGNE: 'Du kan ikke godkjenne tilskuddsperioder for egne avtaler',
    TILSKUDDSPERIODE_KAN_KUN_BEHANDLES_VED_INNGAATT_AVTALE: 'Tilskuddsperioden kan kun behandles ved inngått avtale',
    UGYLDIG_AVTALETYPE: 'Du må oppgi avtaletype',
    UGYLDIG_FØDSELSNUMMER: 'Du må oppgi gyldig fødselsnummer for deltaker',
    UGYLDIG_KOMBINASJON_AV_ISSUER_OG_ROLLE:
        'Vi gjenkjenner ikke innloggingen din for denne tjenesten. Logg ut og forsøk igjen – ta kontakt med brukerstøtte hvis problemet vedvarer.',
    UGYLDIG_TLF: 'Telefonnummeret er ikke et gyldig mobilnummer',
    UGYLDIG_VIRKSOMHETSNUMMER: 'Du må oppgi gyldig virksomhetsnummer',
    VARIGHET_DATO_TILBAKE_I_TID: 'Dato på varighet er tilbake i tid',
    VARIGHET_FOR_LANG_ARBEIDSTRENING: 'Avtalens varighet er maksimalt 18 måneder',
    VARIGHET_FOR_LANG_FIREARIG_LONNSTILSKUDD_2_AAR:
        'Fireårig lønnstilskudd for unge kan ikke vare lenger enn 2 år ved midlertidig stilling',
    VARIGHET_FOR_LANG_FIREARIG_LONNSTILSKUDD_4_AAR:
        'Fireårig lønnstilskudd for unge kan ikke vare lenger enn 4 år ved fast stilling',
    VARIGHET_FOR_LANG_INKLUDERINGSTILSKUDD: 'Avtalens varighet er maksimalt 12 måneder',
    VARIGHET_FOR_LANG_MENTOR_36_MND: 'Avtalens varighet er maksimalt 36 måneder',
    VARIGHET_FOR_LANG_MENTOR_6_MND: 'Avtalens varighet er maksimalt 6 måneder',
    VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_12_MND: 'Avtalens varighet er maksimalt 12 måneder',
    VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_24_MND: 'Avtalens varighet er maksimalt 24 måneder',
    VEILEDER_SKAL_GODKJENNE_SIST: 'Veileder må godkjenne avtalen etter deltaker og arbeidsgiver.',
};
