import { Rolle } from '@/AvtaleContext';
import { Feature, FeatureToggles } from '@/FeatureToggleProvider';
import { InnloggetBruker, Innloggingskilde } from '@/InnloggingBoundary/useInnlogget';
import { basename } from '@/paths';
import { SIDE_FOER_INNLOGGING } from '@/RedirectEtterLogin';
import { Avtale, Bedriftinfo, GodkjentPaVegneGrunner, TiltaksType } from '@/types/avtale';
import AvtaleStatusDetaljer from '@/types/avtale-status-detaljer';
import { ApiError, AutentiseringError } from '@/types/errors';
import Varsel from '@/types/varsel';

export const API_URL = '/tiltaksgjennomforing/api';

const featureTogglePath = (features: Feature[]): string => {
    const query = features.map(feature => `feature=${feature}`).join('&');
    return `${API_URL}/feature?${query}`;
};

export interface RestService {
    hentAvtale: (id: string) => Promise<Avtale>;
    hentAvtalerForInnloggetBruker: (søkekriterier: Partial<Avtale>) => Promise<Avtale[]>;
    lagreAvtale: (avtale: Avtale) => Promise<Avtale>;
    opprettAvtale: (deltakerFnr: string, bedriftNr: string, tiltakstype: TiltaksType) => Promise<Avtale>;
    hentRolle: (avtaleId: string) => Promise<Rolle>;
    godkjennAvtale: (avtale: Avtale) => Promise<Avtale>;
    godkjennAvtalePaVegne: (avtale: Avtale, paVegneGrunn: GodkjentPaVegneGrunner) => Promise<Avtale>;
    opphevGodkjenninger: (avtaleId: string) => Promise<Avtale>;
    avbrytAvtale: (avtale: Avtale) => Promise<Avtale>;
    hentInnloggetBruker: () => Promise<InnloggetBruker>;
    hentInnloggingskilder: () => Promise<Innloggingskilde[]>;
    hentBedriftBrreg: (bedriftNr: string) => Promise<Bedriftinfo>;
    hentUlesteVarsler: () => Promise<Varsel[]>;
    hentAvtaleVarsler: (avtaleId: string) => Promise<Varsel[]>;
    settVarselTilLest: (varselId: string) => Promise<void>;
    hentFeatureToggles: (featureToggles: Feature[]) => Promise<FeatureToggles>;
    hentAvtaleStatusDetaljer: (avtaleId: string) => Promise<AvtaleStatusDetaljer>;
    låsOppAvtale: (avtaleId: string) => Promise<void>;
    delAvtaleMedAvtalepart: (avtaleId: string, avtalepart: Rolle) => Promise<void>;
    sjekkOmMenySkalBrukes: (url: string) => Promise<boolean>;
}

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
    if (response.status === 401) {
        sessionStorage.setItem(SIDE_FOER_INNLOGGING, window.location.pathname.replace(basename, ''));
        throw new AutentiseringError('Er ikke logget inn.');
    }
    if (response.status >= 400 && response.status < 500) {
        const error = await response.json();
        throw new ApiError(error.message);
    }
    if (!response.ok) {
        throw new ApiError('Feil ved kontakt mot baksystem.');
    }
};

const hentAvtale = async (id: string): Promise<Avtale> => {
    const response = await fetchGet(`${API_URL}/avtaler/${id}`);
    await handleResponse(response);
    const avtale = await response.json();
    return { ...avtale, id: `${avtale.id}` };
};

const removeEmpty = (obj: any) => {
    Object.keys(obj).forEach(k => !obj[k] && obj[k] !== undefined && delete obj[k]);
    return obj;
};

const hentAvtalerForInnloggetBruker = async (søkekriterier: Partial<Avtale>): Promise<Avtale[]> => {
    const queryParam = new URLSearchParams(removeEmpty(søkekriterier));
    const response = await fetchGet(`${API_URL}/avtaler?${queryParam}`);
    await handleResponse(response);
    return await response.json();
};

const hentAvtaleStatusDetaljer = async (avtaleId: string): Promise<AvtaleStatusDetaljer> => {
    const response = await fetchGet(`${API_URL}/avtaler/${avtaleId}/status-detaljer`);
    await handleResponse(response);
    return await response.json();
};
const lagreAvtale = async (avtale: Avtale): Promise<Avtale> => {
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

const opprettAvtale = async (deltakerFnr: string, bedriftNr: string, tiltakstype: TiltaksType): Promise<Avtale> => {
    const postResponse = await fetchPost(`${API_URL}/avtaler`, {
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

const hentRolle = async (avtaleId: string): Promise<Rolle> => {
    const response = await fetchGet(`${API_URL}/avtaler/${avtaleId}/rolle`);
    await handleResponse(response);
    return response.json();
};

const godkjennAvtale = async (avtale: Avtale) => {
    const uri = `${API_URL}/avtaler/${avtale.id}/godkjenn`;

    const response = await fetchPost(uri, { headers: { 'If-Unmodified-Since': avtale.sistEndret } });

    await handleResponse(response);
    return hentAvtale(avtale.id);
};

const godkjennAvtalePaVegne = async (avtale: Avtale, paVegneGrunn: GodkjentPaVegneGrunner) => {
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

const opphevGodkjenninger = async (avtaleId: string) => {
    const uri = `${API_URL}/avtaler/${avtaleId}/opphev-godkjenninger`;
    const response = await fetchPost(uri);
    await handleResponse(response);
    return hentAvtale(avtaleId);
};
const avbrytAvtale = async (avtale: Avtale) => {
    const uri = `${API_URL}/avtaler/${avtale.id}/avbryt`;
    const response = await fetchPost(uri, {
        headers: {
            'If-Unmodified-Since': avtale.sistEndret,
        },
    });
    await handleResponse(response);
    return hentAvtale(avtale.id);
};
const hentInnloggetBruker = async (): Promise<InnloggetBruker> => {
    const response = await fetchGet(`${API_URL}/innlogget-bruker`);
    await handleResponse(response);
    return response.json();
};

const hentInnloggingskilder = async (): Promise<Innloggingskilde[]> => {
    const response = await fetchGet('/tiltaksgjennomforing/innloggingskilder');
    await handleResponse(response);
    return await response.json();
};

const hentBedriftBrreg = async (bedriftNr: string): Promise<Bedriftinfo> => {
    const response = await fetchGet(`${API_URL}/organisasjoner?bedriftNr=${bedriftNr}`);
    await handleResponse(response);
    return await response.json();
};

const hentUlesteVarsler = async (): Promise<Varsel[]> => {
    const response = await fetchGet(`${API_URL}/varsler?lest=false`);
    await handleResponse(response);
    return await response.json();
};

const hentAvtaleVarsler = async (avtaleId: string): Promise<Varsel[]> => {
    const response = await fetchGet(`${API_URL}/varsler?avtaleId=${avtaleId}`);
    await handleResponse(response);
    return await response.json();
};

const settVarselTilLest = async (varselId: string): Promise<void> => {
    const response = await fetchPost(`${API_URL}/varsler/${varselId}/sett-til-lest`);
    await handleResponse(response);
};

const sjekkOmMenySkalBrukes = async (url: string): Promise<boolean> => {
    const response = await fetchGet(url);
    return await response.json();
};

const hentFeatureToggles = async (featureToggles: Feature[]): Promise<FeatureToggles> => {
    const response = await fetchGet(featureTogglePath(featureToggles));
    await handleResponse(response);
    return await response.json();
};

const låsOppAvtale = async (avtaleId: string): Promise<void> => {
    const response = await fetchPost(`${API_URL}/avtaler/${avtaleId}/laas-opp`);
    await handleResponse(response);
};

const delAvtaleMedAvtalepart = async (avtaleId: string, rolle: Rolle): Promise<void> => {
    const response = await fetchPost(`${API_URL}/avtaler/${avtaleId}/del-med-avtalepart`, {
        body: JSON.stringify(rolle),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    await handleResponse(response);
};

const restService: RestService = {
    hentAvtale,
    hentAvtalerForInnloggetBruker,
    lagreAvtale,
    opprettAvtale,
    hentRolle,
    godkjennAvtale: godkjennAvtale,
    godkjennAvtalePaVegne: godkjennAvtalePaVegne,
    opphevGodkjenninger: opphevGodkjenninger,
    avbrytAvtale: avbrytAvtale,
    hentInnloggetBruker,
    hentInnloggingskilder,
    hentBedriftBrreg,
    hentUlesteVarsler,
    hentAvtaleVarsler,
    settVarselTilLest,
    hentFeatureToggles,
    hentAvtaleStatusDetaljer,
    låsOppAvtale,
    delAvtaleMedAvtalepart,
    sjekkOmMenySkalBrukes,
};

export default restService;
