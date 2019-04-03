export const basename = '/tiltaksgjennomforing';

export const pathTilOversikt = '';

const avtaleBase = '/avtale';

export const pathTilOpprettAvtale = '/opprett-avtale';

export const pathTilOpprettetAvtaleBekreftelse = (avtaleId: string) =>
    `/opprett-avtale-fullfort/${avtaleId}`;

export const absoluttPathTilAvtaleSelvbetjening = (avtaleId: string) =>
    `https://arbeidsgiver.nav.no/tiltaksgjennomforing${pathTilAvtale(
        avtaleId
    )}`;

export const pathTilAvtaleOversikt = `https://arbeidsgiver.nav.no${basename}`;

export const pathTilAvtale = (avtaleId: string): string =>
    `${avtaleBase}/${avtaleId}`;

export const pathTilStegIAvtale = (avtaleId: string, steg: string) =>
    `${pathTilAvtale(avtaleId)}/${steg}`;

export const pathTilKontaktinformasjonSteg = (avtaleId: string): string =>
    pathTilStegIAvtale(avtaleId, 'kontaktinformasjon');

export const pathTilGodkjenningsSteg = (avtaleId: string): string =>
    pathTilStegIAvtale(avtaleId, 'godkjenning');
