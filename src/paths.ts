export const pathTilOversikt: string = '/tiltaksgjennomforing';

const avtaleBase = '/tiltaksgjennomforing/avtale';

export const pathTilAvtale = (avtaleId: string): string => {
    return `${avtaleBase}/${avtaleId}`;
};

export const pathTilKontaktinformasjonSteg = (avtaleId: string): string => {
    return `${pathTilAvtale(avtaleId)}/kontaktinformasjon`;
};

export const pathTilGodkjenningsSteg = (avtaleId: string): string => {
    return `${pathTilAvtale(avtaleId)}/godkjenning`;
};

export const lagStegUrl = (avtaleId: string, steg: string) => {
    return `${pathTilAvtale(avtaleId)}/${steg}`;
};

export const absoluttPathTilAvtaleForBrukerOgAG = (avtaleId: string) => {
    return `https://arbeidsgiver.nav.no${pathTilAvtale(avtaleId)}`;
};

export const pathTilOpprettetAvtaleBekreftelse = `${pathTilOversikt}/opprett-avtale/fullfort`;
