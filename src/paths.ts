export type URLString = string;

export const pathTilOversikt: URLString = '/';

export const pathTilAvtale = (avtaleId: string): URLString => {
    return `/avtale/${avtaleId}`;
};

export const pathTilKontaktinformasjon = (avtaleId: string): URLString => {
    return `${pathTilAvtale(avtaleId)}/kontaktinformasjon`;
};

export const pathTilKontaktinformasjonSteg = 'kontaktinformasjon';
export const pathTilMaalSteg = 'maal';
export const pathTilArbeidsoppgaverSteg = 'arbeidsoppgaver';
export const pathTilArbeidstidSteg = 'arbeidstid';
export const pathTilOppfolgingSteg = 'oppfolging';
export const pathTilSigneringSteg = 'signering';
