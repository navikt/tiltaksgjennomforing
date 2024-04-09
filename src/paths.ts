import { Rolle } from '@/types/innlogget-bruker';

export const basename = '/tiltaksgjennomforing';

export const pathTilOversikt = '/';

export const pathTilInformasjonssideUinnlogget = '/informasjonsside/uinnlogget';

export const pathTilInformasjonssideInnlogget = '/informasjonsside/innlogget';

export const pathTilInformasjonssideInnloggetNy = '/tiltaksgjennomforing/informasjonsside/innlogget';

const avtaleBase = '/avtale';

export const pathTilOpprettAvtale = '/opprett-avtale';

export const pathTilOpprettAvtaleArbeidsgiver = '/opprett-avtale-arbeidsgiver';

export const pathTilOpprettAvtaleFullfortVeileder = (avtaleId: string) =>
    `/opprett-avtale-fullfort-veileder/${avtaleId}`;

export const pathTilOpprettAvtaleFullfortArbeidsgiver = (avtaleId: string) =>
    `/opprett-avtale-fullfort-arbeidsgiver/${avtaleId}`;

export const inkludereIArbeidslivetLenke = 'https://www.nav.no/arbeidsgiver/inkludere';

export const pathTilAvtale = (avtaleId: string, rolle: Rolle = 'INGEN_ROLLE'): string =>
    rolle === 'BESLUTTER' ? `${avtaleBase}/${avtaleId}/beslutte/` : `${avtaleBase}/${avtaleId}`;

export const pathTilAvtaleNy = (avtaleId: string, rolle: Rolle = 'INGEN_ROLLE'): string =>
    rolle === 'BESLUTTER' ? `${avtaleBase}/${avtaleId}/beslutte/` : `${avtaleBase}/${avtaleId}`;

export const pathTilStegIAvtale = (avtaleId: string, steg: string) => `${pathTilAvtale(avtaleId)}/${steg}`;

export const pathTilKontaktinformasjonSteg = (avtaleId: string): string =>
    pathTilStegIAvtale(avtaleId, 'kontaktinformasjon');

export const pathTilGodkjenningsSteg = (avtaleId: string): string => pathTilStegIAvtale(avtaleId, 'godkjenning');
