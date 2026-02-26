export type Feilkode =
    | 'ALT_MA_VAERE_FYLT_UT'
    | 'ARBEIDSGIVER_SKAL_GODKJENNE_FOER_VEILEDER'
    | 'DELTAKER_HAR_GODKJENT'
    | 'ER_ALLEREDE_VEILEDER'
    | 'GODKJENT_PAA_VEGNE_GRUNN_MAA_VELGES'
    | 'GRUNN_TIL_AVBRYTELSE'
    | 'IKKE_VALGT_PART'
    | 'KAN_IKKE_ENDRE'
    | 'KAN_IKKE_LAASES_OPP'
    | 'KAN_IKKE_OPPHEVE'
    | 'SAMTIDIGE_ENDRINGER'
    | 'START_ETTER_SLUTT'
    | 'UGYLDIG_TLF'
    | 'IKKE_FORDELT'
    | 'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_12_MND'
    | 'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_24_MND'
    | 'VARIGHET_FOR_LANG_ARBEIDSTRENING'
    | 'VARIGHET_FOR_LANG_MENTOR_6_MND'
    | 'VARIGHET_FOR_LANG_MENTOR_36_MND'
    | 'VARIGHET_FOR_LANG_INKLUDERINGSTILSKUDD'
    | 'VARIGHET_DATO_TILBAKE_I_TID'
    | 'VEILEDER_SKAL_GODKJENNE_SIST'
    | 'ALTINN_FEIL'
    | 'GOSYS_FEIL'
    | 'ENHET_ER_JURIDISK'
    | 'ENHET_ER_ORGLEDD'
    | 'ENHET_FINNES_IKKE'
    | 'ENHET_ER_SLETTET'
    | 'IKKE_TILGANG_TIL_DELTAKER'
    | 'KAN_IKKE_GODKJENNE_AVTALE_KODE6'
    | 'KAN_IKKE_OPPRETTE_AVTALE_KODE6'
    | 'TILSKUDDSPERIODE_ER_ALLEREDE_BEHANDLET'
    | 'TILSKUDDSPERIODE_ER_IKKE_SATT'
    | 'TILSKUDDSPERIODE_KAN_KUN_BEHANDLES_VED_INNGAATT_AVTALE'
    | 'TILSKUDDSPERIODE_BEHANDLE_FOR_TIDLIG'
    | 'TILSKUDDSPERIODE_AVSLAGSFORKLARING_PAAKREVD'
    | 'TILSKUDDSPERIODE_INGEN_AVSLAGSAARSAKER'
    | 'TILSKUDDSPERIODE_IKKE_GODKJENNE_EGNE'
    | 'LONNSTILSKUDD_PROSENT_ER_UGYLDIG'
    | 'KONTOREGISTER_FEIL'
    | 'KONTOREGISTER_FEIL_BEDRIFT_IKKE_FUNNET'
    | 'IKKE_ADMIN_TILGANG'
    | 'SOMMERJOBB_FOR_TIDLIG'
    | 'SOMMERJOBB_FOR_SENT'
    | 'SOMMERJOBB_FOR_LANG_VARIGHET'
    | 'SOMMERJOBB_IKKE_GAMMEL_NOK'
    | 'SOMMERJOBB_FOR_GAMMEL'
    | 'SOMMERJOBB_FOR_GAMMEL_FRA_OPPSTARTDATO'
    | 'FIREARIG_LONNSTILSKUDD_FOR_LANG_VARIGHET'
    | 'FIREARIG_LONNSTILSKUDD_FOR_GAMMEL_FRA_OPPSTARTDATO'
    | 'DELTAKER_67_AAR'
    | 'DELTAKER_72_AAR'
    | 'FEIL_OTP_SATS'
    | 'KAN_IKKE_FORKORTE_ETTER_SLUTTDATO'
    | 'KAN_IKKE_FORKORTE_FOR_STARTDATO'
    | 'KAN_IKKE_FORKORTE_IKKE_GODKJENT_AVTALE'
    | 'KAN_IKKE_FORKORTE_GRUNN_MANGLER'
    | 'KAN_IKKE_FORLENGE_FEIL_SLUTTDATO'
    | 'KAN_IKKE_ANNULLERES_ALLEREDE_ANNULLERT'
    | 'KAN_IKKE_ENDRE_STILLINGSBESKRIVELSE_GRUNN_MANGLER'
    | 'KAN_IKKE_ENDRE_KONTAKTINFO_GRUNN_MANGLER'
    | 'KAN_IKKE_ENDRE_OPPFØLGING_OG_TILRETTELEGGING_GRUNN_MANGLER'
    | 'MANGLER_AD_GRUPPE_BESLUTTER'
    | 'MANGLER_VEILEDER_PÅ_AVTALE'
    | 'KAN_IKKE_ENDRE_MAAL_TOM_LISTE'
    | 'KOSTNADSSTED_LIK_OPPFOLGINGSENHET'
    | 'KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL'
    | 'KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL'
    | 'KVALIFISERINGSGRUPPE_VTAO_FEIL'
    | 'KVALIFISERINGSGRUPPE_FIREARIG_LONNTILSKUDD_FOR_UNGE_FEIL'
    | 'KVALIFISERINGSGRUPPE_IKKE_RETTIGHET'
    | 'FORMIDLINGSGRUPPE_IKKE_RETTIGHET'
    | 'HENTING_AV_INNSATSBEHOV_FEILET'
    | 'FANT_IKKE_INNSATSBEHOV'
    | 'FORTIDLIG_STARTDATO'
    | 'KAN_IKKE_MERKES_FOR_ETTERREGISTRERING_AVTALE_GODKJENT'
    | 'AVTALE_INNEHOLDER_UTBETALT_TILSKUDDSPERIODE'
    | 'UGYLDIG_VIRKSOMHETSNUMMER'
    | 'UGYLDIG_FØDSELSNUMMER'
    | 'UGYLDIG_AVTALETYPE'
    | 'KAN_IKKE_OPPHEVE_GODKJENNINGER_VED_INNGAATT_AVTALE'
    | 'INKLUDERINGSTILSKUDD_SUM_FOR_HØY'
    | 'KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_TOM_LISTE'
    | 'MENTOR_MÅ_SIGNERE_TAUSHETSERKLÆRING'
    | 'DELTAGER_OG_MENTOR_KAN_IKKE_HA_SAMME_FØDSELSNUMMER'
    | 'AVTALE_INNEHOLDER_TILSKUDDSPERIODE_MED_GODKJENT_REFUSJON'
    | 'MANGLER_BEREGNING'
    | 'SLUTTDATO_GRENSE_NÅDD'
    | 'VARIG_LONNSTILSKUDD_TILSKUDDSPERIODE_MIDLERTIDIG_AVSKURDD'
    | 'KAN_IKKE_ENDRE_ARENA_MIGRERINGSDATO_INNGAATT_AVTALE'
    | 'KAN_IKKE_FORKORTE_FOR_UTBETALT_TILSKUDDSPERIODE'
    | 'IKKE_TILGANG_TIL_DELTAKER_STRENGT_FORTROLIG'
    | 'IKKE_TILGANG_TIL_DELTAKER_FORTROLIG'
    | 'IKKE_TILGANG_TIL_DELTAKER_SKJERMET'
    | 'IKKE_TILGANG_TIL_DELTAKER_ARBEIDSGIVER'
    | 'AVTALE_ER_ALLEREDE_INNGAATT'
    | 'IKKE_TILGANG_TIL_A_INNGAA_AVTALE'
    | 'KAN_IKKE_ENDRE_OKONOMI_UGYLDIG_INPUT'
    | 'ROLLE_HAR_IKKE_TILGANG'
    | 'FEIL_KID_NUMMER'
    | 'FØDSELSNUMMER_IKKE_GYLDIG'
    | 'KAN_IKKE_ENDRE_STARTDATO_FOR_AVTALE_ENDRET_AV_ARENA'
    | 'IKKE_TILGANG_TIL_A_OPPRETTE_TILTAK'
    | 'IKKE_TILGANG_TIL_A_OPPRETTE_AVTALE';

export const Feilmeldinger: { [key in Feilkode]: string } = {
    ALT_MA_VAERE_FYLT_UT: 'Alt må være fylt ut før du kan godkjenne',
    SAMTIDIGE_ENDRINGER:
        'Du må oppdatere siden før du kan lagre, godkjenne eller gjøre andre endringer. Det er gjort endringer i avtalen som du ikke har sett.',
    IKKE_VALGT_PART: 'Ikke valgt part',
    VEILEDER_SKAL_GODKJENNE_SIST: 'Veileder må godkjenne avtalen etter deltaker og arbeidsgiver.',
    DELTAKER_HAR_GODKJENT: 'Deltaker har allerede godkjent avtalen',
    ARBEIDSGIVER_SKAL_GODKJENNE_FOER_VEILEDER: 'Arbeidsgiver må godkjenne avtalen før veileder kan godkjenne',
    GODKJENT_PAA_VEGNE_GRUNN_MAA_VELGES: 'Arbeidsgiver må godkjenne avtalen før veileder kan godkjenne',
    GRUNN_TIL_AVBRYTELSE: 'Grunn til avbrytelse av avtale må oppgis',
    UGYLDIG_TLF: 'Telefonnummeret er ikke et gyldig mobilnummer',
    KAN_IKKE_OPPHEVE:
        'Kan ikke oppheve godkjenninger i avtalen. Det er gjort endringer i avtalen som du ikke har sett. Oppfrisk siden og prøv igjen.',
    KAN_IKKE_ENDRE: 'Kan ikke endre avtale.',
    KAN_IKKE_LAASES_OPP: 'Avtalen kan ikke låses opp',
    ER_ALLEREDE_VEILEDER: 'Innlogget bruker er allerede veileder på denne avtalen',
    START_ETTER_SLUTT: 'Startdato er etter sluttdato',
    VARIGHET_DATO_TILBAKE_I_TID: 'Dato på varighet er tilbake i tid',
    VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_12_MND: 'Avtalens varighet er maksimalt 12 måneder',
    VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_24_MND: 'Avtalens varighet er maksimalt 24 måneder',
    VARIGHET_FOR_LANG_MENTOR_6_MND: 'Avtalens varighet er maksimalt 6 måneder',
    VARIGHET_FOR_LANG_MENTOR_36_MND: 'Avtalens varighet er maksimalt 36 måneder',
    VARIGHET_FOR_LANG_ARBEIDSTRENING: 'Avtalens varighet er maksimalt 18 måneder',
    VARIGHET_FOR_LANG_INKLUDERINGSTILSKUDD: 'Avtalens varighet er maksimalt 12 måneder',
    ENHET_ER_JURIDISK: 'Avtale må registreres på virksomhetens virksomhetsnummer, ikke den juridiske enheten.',
    ENHET_ER_ORGLEDD: 'Avtale må registreres på virksomhetens virksomhetsnummer, ikke organisasjonsleddet.',
    ENHET_FINNES_IKKE: 'Finnes ikke i Enhetsregisteret.',
    ENHET_ER_SLETTET: 'Enheten er slettet',
    IKKE_TILGANG_TIL_DELTAKER: 'Du har ikke tilgang til deltaker',
    ALTINN_FEIL: 'Feil ved oppslag mot altinn',
    GOSYS_FEIL: '',
    IKKE_FORDELT: 'Avtalen er ikke fordelt til en veileder',
    KAN_IKKE_GODKJENNE_AVTALE_KODE6: 'Avtalen kan ikke godkjennes',
    KAN_IKKE_OPPRETTE_AVTALE_KODE6: 'Avtalen kan ikke opprettes',
    TILSKUDDSPERIODE_ER_ALLEREDE_BEHANDLET: 'Tilskuddsperioden er allerede behandlet',
    TILSKUDDSPERIODE_ER_IKKE_SATT: 'Avtalen mangler tilskudsperiode',
    TILSKUDDSPERIODE_BEHANDLE_FOR_TIDLIG: 'Tilskuddsperioden kan ikke behandles tidligere enn 2 uker før startdato',
    TILSKUDDSPERIODE_KAN_KUN_BEHANDLES_VED_INNGAATT_AVTALE: 'Tilskuddsperioden kan kun behandles ved inngått avtale',
    TILSKUDDSPERIODE_AVSLAGSFORKLARING_PAAKREVD: 'Avslagsforklaring må fylles ut',
    TILSKUDDSPERIODE_INGEN_AVSLAGSAARSAKER: 'Minst én avslagsårsak må velges',
    TILSKUDDSPERIODE_IKKE_GODKJENNE_EGNE: 'Du kan ikke godkjenne tilskuddsperioder for egne avtaler',
    LONNSTILSKUDD_PROSENT_ER_UGYLDIG: 'Ugyldig lønnstilskudd prosent',
    KONTOREGISTER_FEIL: 'Feil ved oppslag til kontoregister',
    KONTOREGISTER_FEIL_BEDRIFT_IKKE_FUNNET: 'Finner ikke bedrift hos kontonummerregister',
    IKKE_ADMIN_TILGANG: 'Du har ikke tilgang til denne administrator-funksjonaliteten',
    SOMMERJOBB_FOR_TIDLIG: 'Sommerjobb kan ikke starte før 01.06',
    SOMMERJOBB_FOR_SENT: 'Sommerjobb kan ikke starte etter 31.08',
    SOMMERJOBB_FOR_LANG_VARIGHET: 'Sommerjobb kan ikke vare lenger enn 4 uker',
    SOMMERJOBB_IKKE_GAMMEL_NOK: 'Deltaker må være fylt 16 år',
    SOMMERJOBB_FOR_GAMMEL: 'Deltaker må være under 30 år for dette tiltaket',
    SOMMERJOBB_FOR_GAMMEL_FRA_OPPSTARTDATO: 'Deltaker kan ikke ha fylt 30 år før startdatoen til dette tiltaket',
    FIREARIG_LONNSTILSKUDD_FOR_LANG_VARIGHET: 'Fireårig lønnstilskudd for unge kan ikke vare lenger enn 4 år',
    FIREARIG_LONNSTILSKUDD_FOR_GAMMEL_FRA_OPPSTARTDATO:
        'Deltaker kan ikke være eldre enn 30 år ved oppstart av tiltaket',
    DELTAKER_67_AAR: 'Deltaker må være under 67 år ved sluttdatoen av tiltaket',
    DELTAKER_72_AAR: 'Deltaker må være under 72 år ved sluttdatoen av tiltaket',
    FEIL_OTP_SATS: 'Sats for obligatorisk tjenestepensjon må være mellom 0 og 30 %.',
    KAN_IKKE_FORKORTE_ETTER_SLUTTDATO: 'Avtalen kan ikke forkortes til etter sluttdato',
    KAN_IKKE_FORKORTE_FOR_STARTDATO: 'Avtalen kan ikke forkortes til før startdato',
    KAN_IKKE_FORLENGE_FEIL_SLUTTDATO: 'Avtalen kan ikke forlenges til før sluttdato',
    KAN_IKKE_FORKORTE_IKKE_GODKJENT_AVTALE: 'Kan ikke forkorte avtalen før den er godkjent',
    KAN_IKKE_FORKORTE_GRUNN_MANGLER: 'Grunn for forkortelse må velges',
    KAN_IKKE_ANNULLERES_ALLEREDE_ANNULLERT: 'Avtalen kan ikke annulleres siden den allerede er annullert',
    KAN_IKKE_ENDRE_STILLINGSBESKRIVELSE_GRUNN_MANGLER: 'Alle felt må være utfylt',
    KAN_IKKE_ENDRE_KONTAKTINFO_GRUNN_MANGLER: 'Alle felt må være utfylt',
    KAN_IKKE_ENDRE_OPPFØLGING_OG_TILRETTELEGGING_GRUNN_MANGLER: 'Alle felt må være utfylt',
    KAN_IKKE_ENDRE_MAAL_TOM_LISTE: 'Du må ha minst ett mål',
    KOSTNADSSTED_LIK_OPPFOLGINGSENHET:
        'Kostnadssted blir satt lik oppfølgingsenhet ved avtaleinngåelse, trengs derfor ikke settes.',
    MANGLER_AD_GRUPPE_BESLUTTER:
        'Kan ikke logge inn som beslutter fordi du mangler gruppe 0000-GA-TILTAK-tilskudd-beslutter',
    MANGLER_VEILEDER_PÅ_AVTALE: 'Avtalen trenger en veileder før du kan godkjenne',
    KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL:
        'Deltaker kvalifiserer ikke til dette tiltaket. Ved endringer i innsatsbehovet kan det ta opptil 5 min før det er oppdatert.',
    KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL:
        'Deltaker kvalifiserer ikke til dette tiltaket. Ved endringer i innsatsbehovet kan det ta opptil 5 min før det er oppdatert.',
    KVALIFISERINGSGRUPPE_VTAO_FEIL:
        'Deltaker kvalifiserer ikke til dette tiltaket. Ved endringer i innsatsbehovet kan det ta opptil 5 min før det er oppdatert.',
    KVALIFISERINGSGRUPPE_FIREARIG_LONNTILSKUDD_FOR_UNGE_FEIL:
        'Deltaker kvalifiserer ikke til dette tiltaket. Ved endringer i innsatsbehovet kan det ta opptil 5 min før det er oppdatert.',
    KVALIFISERINGSGRUPPE_IKKE_RETTIGHET:
        'Deltakeren er registrert med en kvalifiseringsgruppe som ikke kvalifiserer til dette tiltaket. Sjekk at innsatsbehovet stemmer. Hvis det stemmer så gi beskjed til arbeidsgiver og annuller avtale. Ved endringer i kvalifiseringsgruppe kan det ta opptil 5 min før det er oppdatert.',
    FORMIDLINGSGRUPPE_IKKE_RETTIGHET:
        'Deltakeren er registrert med en formidlingsgruppe som ikke kvalifiserer til dette tiltaket.',
    HENTING_AV_INNSATSBEHOV_FEILET: 'Feil ved henting av innsatsbehov',
    FANT_IKKE_INNSATSBEHOV: 'Innsatsbehov for deltakeren ble ikke funnet',
    FORTIDLIG_STARTDATO: 'Startdatoen for avtalen er mer enn 7 dager tilbake i tid og må derfor åpnes av NAV',
    KAN_IKKE_MERKES_FOR_ETTERREGISTRERING_AVTALE_GODKJENT:
        'Kan ikke endre etterregistrering etter at avtalen er godkjent.',
    AVTALE_INNEHOLDER_UTBETALT_TILSKUDDSPERIODE:
        'Avtalen inneholder utbetalte tilskuddsperiode(er). Avtalen kan derfor ikke annulleres.',
    UGYLDIG_VIRKSOMHETSNUMMER: 'Du må oppgi gyldig virksomhetsnummer',
    UGYLDIG_FØDSELSNUMMER: 'Du må oppgi gyldig fødselsnummer for deltaker',
    UGYLDIG_AVTALETYPE: 'Du må oppgi avtaletype',
    KAN_IKKE_OPPHEVE_GODKJENNINGER_VED_INNGAATT_AVTALE:
        'Avtalen er inngått. Godkjenninger kan derfor ikke oppheves. Forsøk å oppfrisk siden.',
    INKLUDERINGSTILSKUDD_SUM_FOR_HØY: 'Totalbeløpet for tilskudd overstiger det maksimale beløpet',
    KAN_IKKE_ENDRE_INKLUDERINGSTILSKUDD_TOM_LISTE: 'Du må ha minst ett tilskudd',
    MENTOR_MÅ_SIGNERE_TAUSHETSERKLÆRING: 'Veileder må godkjenne avtalen etter deltaker, mentor og arbeidsgiver.',
    DELTAGER_OG_MENTOR_KAN_IKKE_HA_SAMME_FØDSELSNUMMER: 'Deltager og mentor kan ikke ha det samme fødselsnummeret',
    AVTALE_INNEHOLDER_TILSKUDDSPERIODE_MED_GODKJENT_REFUSJON:
        'Avtalen inneholder tilskuddsperiode(er) med godkjente refusjon(er). Avtalen kan derfor ikke annulleres.',
    MANGLER_BEREGNING: 'Beregning av tilskudd må være utfylt',
    SLUTTDATO_GRENSE_NÅDD: 'Maksimal sluttdato er overskredet. Makismal sluttdato er 31.12.2089',
    VARIG_LONNSTILSKUDD_TILSKUDDSPERIODE_MIDLERTIDIG_AVSKURDD:
        'Godkjenning av tilskuddsperioder for varig lønnstilskudd er midlertideig avskrudd. Det jobbes med å rette en feil ifbm. med reduksjon av tilskuddsprosent. Dette vil bli fikset i løpet av kort tid.',
    KAN_IKKE_ENDRE_ARENA_MIGRERINGSDATO_INNGAATT_AVTALE:
        'Avtalen er inngått. Arena-migreringsdato kan derfor ikke endres. Annuller og opprett avtalen på nytt.',
    KAN_IKKE_FORKORTE_FOR_UTBETALT_TILSKUDDSPERIODE:
        'Avtalen kan ikke forkortes til før en tilskuddsperiode som er godkjent av arbeidsgiver.',
    IKKE_TILGANG_TIL_DELTAKER_STRENGT_FORTROLIG:
        'Dette er en avtale med strengt fortrolige opplysninger. Du har ikke tilgang til denne avtalen.',
    IKKE_TILGANG_TIL_DELTAKER_FORTROLIG:
        'Dette er en avtale med fortrolige opplysninger. Du har ikke tilgang til denne avtalen.',
    IKKE_TILGANG_TIL_DELTAKER_SKJERMET:
        'Dette er en avtale med skjermede opplysninger. Du har ikke tilgang til denne avtalen.',
    IKKE_TILGANG_TIL_DELTAKER_ARBEIDSGIVER:
        'Du har dessverre ikke tilgang til å opprette avtale på denne deltakeren. Ta kontakt med Nav.',
    AVTALE_ER_ALLEREDE_INNGAATT: 'Avtalen er allerede inngått',
    IKKE_TILGANG_TIL_A_INNGAA_AVTALE: 'Du har ikke tilgang til å inngå avtale på denne deltakeren',
    KAN_IKKE_ENDRE_OKONOMI_UGYLDIG_INPUT: 'Kunne ikke endre beregning. Ett eller flere felt har ugyldig verdi.',
    ROLLE_HAR_IKKE_TILGANG:
        'Du er innlogget med en rolle som ikke har tilgang til å utføre denne handlingen. Forsøk å oppfrisk siden og prøv igjen.',
    FEIL_KID_NUMMER: 'KID-nummeret er ikke gyldig. Påse at det er skrevet inn riktig, og prøv igjen.',
    FØDSELSNUMMER_IKKE_GYLDIG: 'Fødselsnummeret er ikke gyldig. Påse at det er skrevet inn riktig, og prøv igjen.',
    KAN_IKKE_ENDRE_STARTDATO_FOR_AVTALE_ENDRET_AV_ARENA:
        'Avtalen er importert fra gammelt system, og oppstartsdato kan derfor ikke endres.',
    IKKE_TILGANG_TIL_A_OPPRETTE_TILTAK: 'Du har ikke tilgang til å opprette avtale på dette tiltaket',
    IKKE_TILGANG_TIL_A_OPPRETTE_AVTALE:
        'Du kan ikke opprette avtale på denne deltakeren. Det kan være fordi deltakeren hører til en enhet som ikke støtter dette tiltaket.',
};
