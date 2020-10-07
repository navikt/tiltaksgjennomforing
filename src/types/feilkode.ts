export type Feilkode =
    | 'SAMTIDIGE_ENDRINGER'
    | 'ALT_MA_VAERE_FYLT_UT'
    | 'IKKE_VALGT_PART'
    | 'VEILEDER_SKAL_GODKJENNE_SIST'
    | 'DELTAKER_HAR_GODKJENT'
    | 'ARBEIDSGIVER_SKAL_GODKJENNE_FOER_VEILEDER'
    | 'GODKJENT_PAA_VEGNE_GRUNN_MAA_VELGES'
    | 'GRUNN_TIL_AVBRYTELSE'
    | 'UGYLDIG_TLF'
    | 'KAN_IKKE_OPPHEVE'
    | 'KAN_IKKE_ENDRE'
    | 'KAN_IKKE_LAASES_OPP'
    | 'ER_ALLEREDE_VEILEDER'
    | 'START_ETTER_SLUTT'
    | 'IKKE_AKSEPTERT_UTKAST'
    | 'VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD'
    | 'VARIGHET_FOR_LANG_MENTOR'
    | 'VARIGHET_FOR_LANG_ARBEIDSTRENING';

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
    IKKE_AKSEPTERT_UTKAST: 'Kan ikke godkjenne før veileder har akseptert avtaleutkast',
    VARIGHET_FOR_LANG_MIDLERTIDIG_LONNSTILSKUDD: 'Avtalens varighet er maksimalt 24 måneder',
    VARIGHET_FOR_LANG_MENTOR: 'Avtalens varighet er maksimalt 36 måneder',
    VARIGHET_FOR_LANG_ARBEIDSTRENING: 'Avtalens varighet er maksimalt 18 måneder',
};
