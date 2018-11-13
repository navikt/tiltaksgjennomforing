export const ARBEIDSTRENING_PATH = '/arbeidstrening';

export type URLString = string;

export const pathTilArbeidstrening = (avtaleId: string): URLString => {
    return `${ARBEIDSTRENING_PATH}/${avtaleId}`;
};

export const pathTilAvtale = (avtaleId: string): URLString => {
    return `${pathTilArbeidstrening(avtaleId)}/avtale`;
};

export const pathTilKontaktinformasjon = (avtaleId: string): URLString => {
    return `${pathTilArbeidstrening(avtaleId)}/kontaktinformasjon`;
};

export const pathTilKontaktinformasjonSteg = 'kontaktinformasjon';
export const pathTilMaalSteg = 'maal';
export const pathTilArbeidsoppgaverSteg = 'arbeidsoppgaver';
export const pathTilArbeidstidSteg = 'arbeidstid';
export const pathTilOppfolgingSteg = 'oppfolging';
export const pathTilSigneringSteg = 'signering';
