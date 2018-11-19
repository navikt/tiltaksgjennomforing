export const pathTilOversikt: string = '/';

export const avtaleBase = '/avtale';

export const pathTilAvtale = (avtaleId: string): string => {
    return `${avtaleBase}/${avtaleId}`;
};

export const pathTilKontaktinformasjonSteg = (avtaleId: string): string => {
    return `${pathTilAvtale(avtaleId)}/kontaktinformasjon`;
};

export const pathTilMaalSteg = (avtaleId: string): string => {
    return `${pathTilAvtale(avtaleId)}/maal`;
};

export const pathTilArbeidsoppgaverSteg = (avtaleId: string): string => {
    return `${pathTilAvtale(avtaleId)}/arbeidsoppgaver`;
};

export const pathTilArbeidstidSteg = (avtaleId: string): string => {
    return `${pathTilAvtale(avtaleId)}/arbeidstid`;
};

export const pathTilOppfolgingSteg = (avtaleId: string): string => {
    return `${pathTilAvtale(avtaleId)}/oppfolging`;
};

export const pathTilSigneringSteg = (avtaleId: string): string => {
    return `${pathTilAvtale(avtaleId)}/signering`;
};
