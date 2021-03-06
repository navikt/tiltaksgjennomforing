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
    | 'TILSKUDDSPERIODE_KAN_KUN_BEHANDLES_VED_INNGAATT_AVTALE'
    | 'TILSKUDDSPERIODE_BEHANDLE_FOR_TIDLIG'
    | 'TILSKUDDSPERIODE_AVSLAGSFORKLARING_PAAKREVD'
    | 'TILSKUDDSPERIODE_INGEN_AVSLAGSAARSAKER'
    | 'LONNSTILSKUDD_PROSENT_ER_UGYLDIG'
    | 'KONTOREGISTER_FEIL'
    | 'KONTOREGISTER_FEIL_BEDRIFT_IKKE_FUNNET'
    | 'IKKE_ADMIN_TILGANG'
    | 'SOMMERJOBB_FOR_TIDLIG'
    | 'SOMMERJOBB_FOR_SENT'
    | 'SOMMERJOBB_FOR_LANG_VARIGHET'
    | 'IKKE_GAMMEL_NOK'
    | 'FOR_GAMMEL';

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
    TILSKUDDSPERIODE_BEHANDLE_FOR_TIDLIG: 'Tilskuddsperioden kan ikke behandles tidligere enn 2 uker før startdato',
    TILSKUDDSPERIODE_KAN_KUN_BEHANDLES_VED_INNGAATT_AVTALE: 'Tilskuddsperioden kan kun behandles ved inngått avtale',
    TILSKUDDSPERIODE_AVSLAGSFORKLARING_PAAKREVD: 'Avslagsforklaring må fylles ut',
    TILSKUDDSPERIODE_INGEN_AVSLAGSAARSAKER: 'Minst én avslagsårsak må velges',
    LONNSTILSKUDD_PROSENT_ER_UGYLDIG: 'Ugyldig lønnstilskudd prosent',
    KONTOREGISTER_FEIL: 'Feil ved oppslag til kontoregister',
    KONTOREGISTER_FEIL_BEDRIFT_IKKE_FUNNET: 'Finner ikke bedrift hos kontonummerregister',
    IKKE_ADMIN_TILGANG: 'Du har ikke tilgang til denne administrator-funksjonaliteten',
    SOMMERJOBB_FOR_TIDLIG: 'Sommerjobb kan ikke starte før 01.06',
    SOMMERJOBB_FOR_SENT: 'Sommerjobb kan ikke vare lenger enn til 31.08',
    SOMMERJOBB_FOR_LANG_VARIGHET: 'Sommerjobb kan ikke vare lenger enn 4 uker',
    IKKE_GAMMEL_NOK: 'Deltaker må være fylt 16 år',
    FOR_GAMMEL: 'Deltaker må være under 30 år for dette tiltaket',
};
