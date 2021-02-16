import { Feature, FeatureToggles } from '@/FeatureToggleProvider';
import { basename } from '@/paths';
import { SIDE_FOER_INNLOGGING } from '@/RedirectEtterLogin';
import { Avslagsårsaker, Avtale, Bedriftinfo, GodkjentPaVegneGrunner, TiltaksType } from '@/types/avtale';
import AvtaleStatusDetaljer from '@/types/avtale-status-detaljer';
import { AdresseError, ApiError, AutentiseringError } from '@/types/errors';
import { Hendelse } from '@/types/hendelse';
import { InnloggetBruker, Innloggingskilde, Rolle } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import { FeilkodeError } from './../types/errors';
import { Variants } from './../types/unleash-variant';

export const API_URL = '/tiltaksgjennomforing/api';

const featureTogglePath = (features: Feature[]): string => {
    const query = features.map(feature => `feature=${feature}`).join('&');
    return `${API_URL}/feature?${query}`;
};
const featureToggleVariantPath = (features: Feature[]): string => {
    const query = features.map(feature => `feature=${feature}`).join('&');
    return `${API_URL}/feature/variant?${query}`;
};

const fetchGet: (url: string) => Promise<Response> = url => {
    return fetchWithCredentials(url, { headers: { Pragma: 'no-cache' } });
};
const fetchPost: (url: string, otherParams?: any) => Promise<Response> = (url, otherParams) => {
    return fetchWithCredentials(url, { method: 'POST', ...otherParams });
};
const fetchWithCredentials: (url: string, otherParams?: any) => Promise<Response> = (url, otherParams) => {
    return fetch(url, { credentials: 'same-origin', ...otherParams });
};

const handleResponse = async (response: Response) => {
    if (response.status === 401 || response.status === 403) {
        sessionStorage.setItem(
            SIDE_FOER_INNLOGGING,
            window.location.pathname.replace(basename, '') + window.location.search
        );
        throw new AutentiseringError('Er ikke logget inn.');
    }
    if (response.status === 412) {
        throw new AdresseError();
    }
    if (response.status === 400 && response.headers.has('feilkode')) {
        throw new FeilkodeError(response.headers.get('feilkode')!);
    }

    if (response.status >= 400 && response.status < 500) {
        const error = await response.json();
        throw new ApiError(error.message);
    }
    if (!response.ok) {
        throw new ApiError('Feil ved kontakt mot baksystem.');
    }
};

export const hentAvtale = async (id: string): Promise<Avtale> => {
    const response = await fetchGet(`${API_URL}/avtaler/${id}`);
    await handleResponse(response);

    const avtale = await response.json();
    return { ...avtale, id: `${avtale.id}` };
};

const removeEmpty = (obj: any) => {
    Object.keys(obj).forEach(k => !obj[k] && obj[k] !== undefined && delete obj[k]);
    return obj;
};

export const hentAvtalerForInnloggetBruker = async (søkekriterier: Partial<Avtale>): Promise<Avtale[]> => {
    const queryParam = new URLSearchParams(removeEmpty(søkekriterier));
    const response = await fetchGet(`${API_URL}/avtaler?${queryParam}`);
    await handleResponse(response);
    return await response.json();
};

export const hentAvtaleStatusDetaljer = async (avtaleId: string): Promise<AvtaleStatusDetaljer> => {
    const response = await fetchGet(`${API_URL}/avtaler/${avtaleId}/status-detaljer`);
    await handleResponse(response);
    return await response.json();
};

export const lagreAvtale = async (avtale: Avtale): Promise<Avtale> => {
    if (avtale.godkjentAvDeltaker || avtale.godkjentAvArbeidsgiver || avtale.godkjentAvVeileder) {
        if (
            window.confirm(
                'En av partene i avtalen har godkjent. Ved å lagre endringer oppheves godkjenningene. Ønsker du å fortsette?'
            )
        ) {
            await opphevGodkjenninger(avtale.id);
        } else {
            return Promise.reject();
        }
    }

    const response = await fetchWithCredentials(`${API_URL}/avtaler/${avtale.id}`, {
        method: 'PUT',
        body: JSON.stringify(avtale),
        headers: {
            'Content-Type': 'application/json',
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });

    await handleResponse(response);
    return await hentAvtale(avtale.id);
};

export const lagreAvtaleDryRun = async (avtale: Avtale): Promise<Avtale> => {
    const response = await fetchWithCredentials(`${API_URL}/avtaler/${avtale.id}/dry-run`, {
        method: 'PUT',
        body: JSON.stringify(avtale),
        headers: {
            'Content-Type': 'application/json',
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });

    await handleResponse(response);
    return response.json();
};

export const opprettAvtale = async (
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType
): Promise<Avtale> => {
    return opprettAvtalen('/avtaler', deltakerFnr, bedriftNr, tiltakstype);
};

export const opprettAvtaleArbeidsgiver = async (
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType
): Promise<Avtale> => {
    return opprettAvtalen('/avtaler/opprett-som-arbeidsgiver', deltakerFnr, bedriftNr, tiltakstype);
};

const opprettAvtalen = async (
    url: string,
    deltakerFnr: string,
    bedriftNr: string,
    tiltakstype: TiltaksType
): Promise<Avtale> => {
    const postResponse = await fetchPost(`${API_URL}${url}`, {
        body: JSON.stringify({
            deltakerFnr,
            bedriftNr,
            tiltakstype,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    await handleResponse(postResponse);
    const getResponse = await fetchGet(`${API_URL}${postResponse.headers.get('Location')}`);
    await handleResponse(getResponse);
    const avtale: Avtale = await getResponse.json();
    return { ...avtale, id: `${avtale.id}` };
};

export const hentRolle = async (avtaleId: string): Promise<Rolle> => {
    const response = await fetchGet(`${API_URL}/avtaler/${avtaleId}/rolle`);
    await handleResponse(response);
    return response.json();
};

export const godkjennAvtale = async (avtale: Avtale) => {
    const uri = `${API_URL}/avtaler/${avtale.id}/godkjenn`;

    const response = await fetchPost(uri, { headers: { 'If-Unmodified-Since': avtale.sistEndret } });

    await handleResponse(response);
    return hentAvtale(avtale.id);
};

export const godkjennAvtalePaVegne = async (avtale: Avtale, paVegneGrunn: GodkjentPaVegneGrunner) => {
    const uri = `${API_URL}/avtaler/${avtale.id}/godkjenn-paa-vegne-av`;
    const response = await fetchPost(uri, {
        body: JSON.stringify(paVegneGrunn),
        headers: {
            'Content-Type': 'application/json',
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    await handleResponse(response);
    return hentAvtale(avtale.id);
};

export const opphevGodkjenninger = async (avtaleId: string) => {
    const uri = `${API_URL}/avtaler/${avtaleId}/opphev-godkjenninger`;
    const response = await fetchPost(uri);
    await handleResponse(response);
    return hentAvtale(avtaleId);
};

export const gjenopprettAvtale = async (id: string) => {
    const uri = `${API_URL}/avtaler/${id}/gjenopprett`;

    const response = await fetchPost(uri, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    await handleResponse(response);
};

export const avbrytAvtale = async (avtale: Avtale, avbruttDato: string, avbruttGrunn: string) => {
    const uri = `${API_URL}/avtaler/${avtale.id}/avbryt`;
    const response = await fetchPost(uri, {
        body: JSON.stringify({ avbruttDato: avbruttDato, avbruttGrunn: avbruttGrunn }),
        headers: {
            'Content-Type': 'application/json',
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    await handleResponse(response);
    return hentAvtale(avtale.id);
};

export const hentInnloggetBruker = async (): Promise<InnloggetBruker> => {
    const response = await fetchGet(`${API_URL}/innlogget-bruker`);
    await handleResponse(response);
    return response.json();
};

export const gjorKontonummeroppslag = async (avtale: Avtale): Promise<void> => {
    const response = await fetchPost(
        `${API_URL}/avtaler/${avtale.id}/set-kontonummer-for-arbeidsgiver-fra-kontoregister`
    );
    await handleResponse(response);
};

export const hentInnloggingskilder = async (): Promise<Innloggingskilde[]> => {
    const response = await fetchGet('/tiltaksgjennomforing/innloggingskilder');
    await handleResponse(response);
    return await response.json();
};

export const hentBedriftBrreg = async (bedriftNr: string): Promise<Bedriftinfo> => {
    const response = await fetchGet(`${API_URL}/organisasjoner?bedriftNr=${bedriftNr}`);
    await handleResponse(response);
    return await response.json();
};

export const hentUlesteVarsler = async (): Promise<Varsel[]> => {
    const response = await fetchGet(`${API_URL}/varsler/oversikt`);
    await handleResponse(response);
    return await response.json();
};

export const hentUlesteBjelleVarslerForAvtale = async (avtaleId: string): Promise<Varsel[]> => {
    const response = await fetchGet(`${API_URL}/varsler/avtale-modal?avtaleId=${avtaleId}`);
    await handleResponse(response);
    return await response.json();
};

export const hentVarsellogg = async (avtaleId: string): Promise<Varsel[]> => {
    const response = await fetchGet(`${API_URL}/varsler/avtale-logg?avtaleId=${avtaleId}`);
    await handleResponse(response);
    return await response.json();
};

export const hentHendelselogg = async (avtaleId: string): Promise<Hendelse[]> => {
    const response = await fetchGet(`${API_URL}/hendelselogg?avtaleId=${avtaleId}`);
    await handleResponse(response);
    return await response.json();
};

export const settAlleVarselerTilLest = async (varselIder: string[]): Promise<void> => {
    const uri = `${API_URL}/varsler/sett-alle-til-lest`;
    const response = await fetchPost(uri, {
        body: JSON.stringify(varselIder),
        headers: { 'Content-Type': 'application/json' },
    });
    await handleResponse(response);
};

export const sjekkOmMenySkalBrukes = async (url: string): Promise<boolean> => {
    const response = await fetchGet(url);
    return await response.json();
};

export const hentFeatureToggles = async (featureToggles: Feature[]): Promise<FeatureToggles> => {
    const response = await fetchGet(featureTogglePath(featureToggles));
    await handleResponse(response);
    return await response.json();
};
export const hentFeatureTogglesVarianter = async (featureToggles: Feature[]): Promise<Variants> => {
    const response = await fetchGet(featureToggleVariantPath(featureToggles));
    await handleResponse(response);
    return await response.json();
};

export const låsOppAvtale = async (avtaleId: string): Promise<void> => {
    const response = await fetchPost(`${API_URL}/avtaler/${avtaleId}/laas-opp`);
    await handleResponse(response);
};

export const delAvtaleMedAvtalepart = async (avtaleId: string, rolle: Rolle): Promise<void> => {
    const response = await fetchPost(`${API_URL}/avtaler/${avtaleId}/del-med-avtalepart`, {
        body: JSON.stringify(rolle),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    await handleResponse(response);
};

export const overtaAvtale = async (avtaleId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/avtaler/${avtaleId}/overta`, { method: 'PUT' });
    await handleResponse(response);
};

export const aksepterUtkast = async (avtaleId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/avtaler/${avtaleId}/aksepter-utkast`, { method: 'POST' });
    await handleResponse(response);
};

export type BeOmRettigheterUrler = {
    [tiltakstype in TiltaksType]?: string;
};

export const hentBeOmRettighetUrler = async (orgNr: string): Promise<BeOmRettigheterUrler> => {
    const response = await fetch(`${API_URL}/be-om-altinn-rettighet-urler?orgNr=${orgNr}`, { method: 'GET' });
    await handleResponse(response);
    return await response.json();
};

export interface Stillingskategori {
    konseptId: number;
    label: string;
    styrk08: number;
}

export const hentStillinger = async (sok: string): Promise<Stillingskategori[]> => {
    const response = await fetch(`https://arbeidsgiver.nav.no/stillingstitler/search?q=${sok}`);
    return await response.json();
};

export const godkjennTilskuddsperiode = async (avtaleId: string) => {
    const uri = `${API_URL}/avtaler/${avtaleId}/godkjenn-tilskuddsperiode`;
    const response = await fetchPost(uri);
    await handleResponse(response);
};

export const avslåTilskuddsperiode = async (
    avtaleId: string,
    avslagsårsaker: Set<Avslagsårsaker>,
    avslagsforklaring: string
) => {
    const uri = `${API_URL}/avtaler/${avtaleId}/avslag-tilskuddsperiode`;
    const response = await fetchPost(uri, {
        body: JSON.stringify({
            avslagsårsaker,
            avslagsforklaring,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    await handleResponse(response);
};
