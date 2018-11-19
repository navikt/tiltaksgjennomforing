export type URLString = string;

export const pathTilOversikt: URLString = '/';

export const pathTilAvtale = (avtaleId: string): URLString => {
    return `/avtale/${avtaleId}`;
};

export const pathTilKontaktinformasjon = (avtaleId: string): URLString => {
    return `${pathTilAvtale(avtaleId)}/kontaktinformasjon`;
};
