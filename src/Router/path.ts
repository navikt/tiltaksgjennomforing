export const basename = '/tiltaksgjennomforing';

export enum Path {
    OVERSIKT = '/',
    INFORMASJONSSIDE = '/informasjonsside',
    OPPRETT_AVTALE = '/opprett-avtale',
    OPPRETT_AVTALE_ARBEIDSGIVER = '/opprett-avtale-arbeidsgiver',
    AVTALE = '/avtale/:avtaleId',
    AVTALE_STEG = '/avtale/:avtaleId/:steg',
    AVTALE_BESLUTTER = '/avtale/:avtaleId/beslutter',
    AVTALE_BESLUTTER_TILSKUDDSPERIODE = '/avtale/:avtaleId/beslutter/:tilskuddsperiodeId',
}
