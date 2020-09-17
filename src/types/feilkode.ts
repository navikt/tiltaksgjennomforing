export type Feilkode = 'SAMTIDIGE_ENDRINGER' | 'ALT_MA_VAERE_FYLT_UT' | 'IKKE_VALGT_PART';

export const Feilmeldinger: { [key in Feilkode]: string } = {
    ALT_MA_VAERE_FYLT_UT: 'Alt må være fylt ut før du kan godkjenne',
    SAMTIDIGE_ENDRINGER:
        'Du må oppdatere siden før du kan lagre, godkjenne eller gjøre andre endringer. Det er gjort endringer i avtalen som du ikke har sett.',
    IKKE_VALGT_PART: 'Ikke valgt part',
};
