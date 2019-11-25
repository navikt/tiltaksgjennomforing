export const basename = '/tiltaksgjennomforing';

export const pathTilOversikt = '/';

export const pathTilInformasjonssideUinnlogget = '/informasjonsside/uinnlogget';

export const pathTilInformasjonssideInnlogget = '/informasjonsside/innlogget';

const avtaleBase = '/avtale';

export const pathTilOpprettAvtale = '/opprett-avtale';

export const pathTilOpprettAvtaleFullfort = (avtaleId: string) => `/opprett-avtale-fullfort/${avtaleId}`;

export const pathTilOversiktISelvbetjeningProd = `https://arbeidsgiver.nav.no${basename}`;

export const pathTilAvtale = (avtaleId: string): string => `${avtaleBase}/${avtaleId}`;

export const pathTilStegIAvtale = (avtaleId: string, steg: string) => `${pathTilAvtale(avtaleId)}/${steg}`;

export const pathTilKontaktinformasjonSteg = (avtaleId: string): string =>
    pathTilStegIAvtale(avtaleId, 'kontaktinformasjon');

export const pathTilGodkjenningsSteg = (avtaleId: string): string => pathTilStegIAvtale(avtaleId, 'godkjenning');
