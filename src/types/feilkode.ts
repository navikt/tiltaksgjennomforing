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
    | 'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_FORTI_PROSENT'
    | 'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD'
    | 'VARIGHET_FOR_LANG_ARBEIDSTRENING'
    | 'VARIGHET_FOR_LANG_MENTOR'
    | 'VARIGHET_DATO_TILBAKE_I_TID'
    | 'VEILEDER_SKAL_GODKJENNE_SIST'
    | 'ALTINN_FEIL'
    | 'GOSYS_FEIL'
    | 'ENHET_ER_JURIDISK'
    | 'ENHET_ER_ORGLEDD'
    | 'ENHET_FINNES_IKKE'
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
    | 'IKKE_GAMMEL_NOK'
    | 'FOR_GAMMEL'
    | 'FOR_GAMMEL_FRA_OPPSTARTDATO'
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
    | 'KAN_IKKE_ENDRE_MAAL_TOM_LISTE'
    | 'KOSTNADSSTED_LIK_OPPFOLGINGSENHET'
    | 'KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL'
    | 'KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL'
    | 'KVALIFISERINGSGRUPPE_IKKE_RETTIGHET'
    | 'FORMIDLINGSGRUPPE_IKKE_RETTIGHET'
    | 'HENTING_AV_INNSATS_BEHOV_FEILET'
    | 'FINNER_IKKE_AVTALE_PÅ_AVTALENUMMER'
    | 'FORTIDLIG_STARTDATO'
    | 'KAN_IKKE_MERKES_FOR_ETTERREGISTREING_AVTALE_INNGATT';

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
    KAN_IKKE_OPPHEVE: 'Kan ikke oppheve godkjenninger i avtalen.',
    KAN_IKKE_ENDRE: 'Kan ikke endre avtale.',
    KAN_IKKE_LAASES_OPP: 'Avtalen kan ikke låses opp',
    ER_ALLEREDE_VEILEDER: 'Innlogget bruker er allerede veileder på denne avtalen',
    START_ETTER_SLUTT: 'Startdato er etter sluttdato',
    VARIGHET_DATO_TILBAKE_I_TID: 'Dato på varighet er tilbake i tid',
    VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD_FORTI_PROSENT: 'Avtalens varighet er maksimalt 12 måneder',
    VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD: 'Avtalens varighet er maksimalt 24 måneder',
    VARIGHET_FOR_LANG_MENTOR: 'Avtalens varighet er maksimalt 36 måneder',
    VARIGHET_FOR_LANG_ARBEIDSTRENING: 'Avtalens varighet er maksimalt 18 måneder',
    ENHET_ER_JURIDISK: 'Avtale må registreres på virksomhetens bedriftsnummer, ikke den juridiske enheten.',
    ENHET_ER_ORGLEDD: 'Avtale må registreres på virksomhetens bedriftsnummer, ikke organisasjonsleddet.',
    ENHET_FINNES_IKKE: 'Finnes ikke i Enhetsregisteret.',
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
    IKKE_GAMMEL_NOK: 'Deltaker må være fylt 16 år',
    FOR_GAMMEL: 'Deltaker må være under 30 år for dette tiltaket',
    FOR_GAMMEL_FRA_OPPSTARTDATO: 'Deltaker kan ikke ha fylt 30 år før startdatoen til dette tiltaket',
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
    KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL: 'Deltaker kvalifiserer ikke til dette tiltaket',
    KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL: 'Deltaker kvalifiserer ikke til dette tiltaket',
    KVALIFISERINGSGRUPPE_IKKE_RETTIGHET:
        'Deltakeren er registrert med en kvalifiseringsgruppe som ikke kvalifiserer til dette tiltaket. Sjekk at innsatsbehovet stemmer. Hvis det stemmer så gi beskjed til arbeidsgiver og annuller avtale.',
    FORMIDLINGSGRUPPE_IKKE_RETTIGHET:
        'Deltakeren er registrert med en formidlingsgruppe som ikke kvalifiserer til dette tiltaket.',
    HENTING_AV_INNSATS_BEHOV_FEILET: 'Feil ved henting av innsatsbehov',
    FINNER_IKKE_AVTALE_PÅ_AVTALENUMMER: 'Finner ingen avtale på det avtalenummeret',
    FORTIDLIG_STARTDATO: 'Avtalen må godkjennes for etterregistrering av beslutter',
    KAN_IKKE_MERKES_FOR_ETTERREGISTREING_AVTALE_INNGATT:
        'Avtalen kan ikke etterrregistreres siden den er allerede inngått.',
};
