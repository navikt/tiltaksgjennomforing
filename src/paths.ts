export const ARBEIDSTRENING_PATH = '/arbeidstrening';

export type URLString = string;

const pathTilArbeidstrening = (avtaleId: string): URLString => {
    return `${ARBEIDSTRENING_PATH}/${avtaleId}`;
};

export const pathTilAvtale = (avtaleId: string): URLString => {
    return `${pathTilArbeidstrening(avtaleId)}/avtale`;
};

export const pathTilKontaktinformasjon = (avtaleId: string): URLString => {
    return `${pathTilArbeidstrening(avtaleId)}/kontaktinformasjon`;
};
