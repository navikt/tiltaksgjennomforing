import ApiError from '../api-error';
import AutentiseringError from '../autentisering-error';
import { Rolle } from '../AvtaleContext';
import {
    Avtale,
    Bedriftinfo,
    GodkjentPaVegneGrunner,
} from '../AvtaleSide/avtale';
import {
    InnloggetBruker,
    Innloggingskilde,
} from '../InnloggingBoundary/useInnlogget';
import { basename } from '../paths';
import { SIDE_FOER_INNLOGGING } from '../RedirectEtterLogin';
import Varsel from '../varsel';

export const API_URL = '/tiltaksgjennomforing/api';

export interface RestService {
    hentAvtale: (id: string) => Promise<Avtale>;
    hentAvtalerForInnloggetBruker: () => Promise<Avtale[]>;
    lagreAvtale: (avtale: Avtale) => Promise<Avtale>;
    opprettAvtale: (deltakerFnr: string, bedriftNr: string) => Promise<Avtale>;
    hentRolle: (avtaleId: string) => Promise<Rolle>;
    godkjennAvtale: (avtale: Avtale) => Promise<Avtale>;
    godkjennAvtalePaVegne: (
        avtale: Avtale,
        paVegneGrunn: GodkjentPaVegneGrunner
    ) => Promise<Avtale>;
    opphevGodkjenninger: (avtaleId: string) => Promise<Avtale>;
    avbrytAvtale: (avtale: Avtale) => Promise<Avtale>;
    hentInnloggetBruker: () => Promise<InnloggetBruker>;
    hentInnloggingskilder: () => Promise<Innloggingskilde[]>;
    hentBedriftBrreg: (bedriftNr: string) => Promise<Bedriftinfo>;
    hentUlesteVarsler: () => Promise<Varsel[]>;
    hentAvtaleVarsler: (avtaleId: string) => Promise<Varsel[]>;
    settVarselTilLest: (varselId: string) => Promise<void>;
}

const fetchGet: (url: string) => Promise<Response> = url => {
    return fetch(url, { headers: { Pragma: 'no-cache' } });
};

const handleResponse = async (response: Response) => {
    if (response.status === 401) {
        sessionStorage.setItem(
            SIDE_FOER_INNLOGGING,
            window.location.pathname.replace(basename, '')
        );
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

const hentAvtalerForInnloggetBruker = async (): Promise<Avtale[]> => {
    const response = await fetchGet(`${API_URL}/avtaler`);
    await handleResponse(response);
    return await response.json();
};

const lagreAvtale = async (avtale: Avtale): Promise<Avtale> => {
    if (
        avtale.godkjentAvDeltaker ||
        avtale.godkjentAvArbeidsgiver ||
        avtale.godkjentAvVeileder
    ) {
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

    const response = await fetch(`${API_URL}/avtaler/${avtale.id}`, {
        method: 'PUT',
        body: JSON.stringify(avtale),
        headers: {
            'Content-Type': 'application/json',
            'If-Match': avtale.versjon,
        },
    });
    await handleResponse(response);
    const versjon = response.headers.get('ETag');
    if (versjon !== avtale.versjon) {
        return await hentAvtale(avtale.id);
    } else {
        return avtale;
    }
};

const opprettAvtale = async (
    deltakerFnr: string,
    bedriftNr: string
): Promise<Avtale> => {
    const postResponse = await fetch(`${API_URL}/avtaler`, {
        method: 'POST',
        body: JSON.stringify({
            deltakerFnr,
            bedriftNr,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    await handleResponse(postResponse);
    const getResponse = await fetch(
        `${API_URL}/${postResponse.headers.get('Location')}`
    );
    await handleResponse(getResponse);
    const avtale: Avtale = await getResponse.json();
    return { ...avtale, id: `${avtale.id}` };
};

const hentRolle = async (avtaleId: string): Promise<Rolle> => {
    const response = await fetch(`${API_URL}/avtaler/${avtaleId}/rolle`);
    await handleResponse(response);
    return response.json();
};

const godkjennAvtale = async (avtale: Avtale) => {
    const uri = `${API_URL}/avtaler/${avtale.id}/godkjenn`;
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'If-Match': avtale.versjon,
        },
    });
    await handleResponse(response);
    return hentAvtale(avtale.id);
};

const godkjennAvtalePaVegne = async (
    avtale: Avtale,
    paVegneGrunn: GodkjentPaVegneGrunner
) => {
    const uri = `${API_URL}/avtaler/${avtale.id}/godkjenn-paa-vegne-av`;
    const response = await fetch(uri, {
        method: 'POST',
        body: JSON.stringify(paVegneGrunn),
        headers: {
            'Content-Type': 'application/json',
            'If-Match': avtale.versjon,
        },
    });
    await handleResponse(response);
    return hentAvtale(avtale.id);
};

const opphevGodkjenninger = async (avtaleId: string) => {
    const uri = `${API_URL}/avtaler/${avtaleId}/opphev-godkjenninger`;
    const response = await fetch(uri, {
        method: 'POST',
    });
    await handleResponse(response);
    return hentAvtale(avtaleId);
};
const avbrytAvtale = async (avtale: Avtale) => {
    const uri = `${API_URL}/avtaler/${avtale.id}/avbryt`;
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'If-Match': avtale.versjon,
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
    const response = await fetchGet(
        `${API_URL}/organisasjoner?bedriftNr=${bedriftNr}`
    );
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
    const response = await fetch(
        `${API_URL}/varsler/${varselId}/sett-til-lest`,
        {
            method: 'POST',
        }
    );
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
};

export default restService;
