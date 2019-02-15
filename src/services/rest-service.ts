import ApiError from '../api-error';
import AutentiseringError from '../autentisering-error';
import { Rolle } from '../AvtaleContext';
import { Avtale } from '../AvtaleSide/avtale';
import {
    InnloggetBruker,
    Innloggingskilde,
} from '../InnloggingBoundary/useInnlogget';
import { basename } from '../paths';
import { SIDE_FOER_INNLOGGING } from '../RedirectEtterLogin';

export const API_URL = '/tiltaksgjennomforing/api';
const LOGIN_REDIRECT = '/tiltaksgjennomforing/login';
const HTTP_UNAUTHORIZED = 401;
const HTTP_CONFLICT = 409;

export interface RestService {
    hentAvtale: (id: string) => Promise<Avtale>;
    lagreAvtale: (avtale: Avtale) => Promise<Avtale>;
    opprettAvtale: (
        deltakerFnr: string,
        arbeidsgiverFnr: string
    ) => Promise<Avtale>;
    hentRolle: (avtaleId: string) => Promise<Rolle>;
    endreGodkjenning: (avtaleId: string, godkjent: boolean) => Promise<Avtale>;
    hentInnloggetBruker: () => Promise<InnloggetBruker>;
    hentInnloggingskilder: () => Promise<Innloggingskilde[]>;
}

const fetchGet: (url: string) => Promise<Response> = url => {
    return fetch(url, { headers: { Pragma: 'no-cache' } });
};

const handleResponse = (response: Response) => {
    if (response.status === HTTP_UNAUTHORIZED) {
        sessionStorage.setItem(
            SIDE_FOER_INNLOGGING,
            window.location.pathname.replace(basename, '')
        );
        throw new AutentiseringError('Er ikke logget inn.');
    }
    if (response.status === HTTP_CONFLICT) {
        throw new ApiError(
            'Noen andre har lagret avtalen. Forsøk å oppfrisk siden.'
        );
    }
    if (!response.ok) {
        throw new ApiError('Feil ved kontakt mot baksystem.');
    }
};

const hentAvtale = async (id: string): Promise<Avtale> => {
    const response = await fetchGet(`${API_URL}/avtaler/${id}`);
    handleResponse(response);
    const avtale = await response.json();
    return { ...avtale, id: `${avtale.id}` };
};

const lagreAvtale = async (avtale: Avtale): Promise<Avtale> => {
    const response = await fetch(`${API_URL}/avtaler/${avtale.id}`, {
        method: 'PUT',
        body: JSON.stringify(avtale),
        headers: {
            'Content-Type': 'application/json',
            'If-Match': avtale.versjon,
        },
    });
    handleResponse(response);
    const versjon = response.headers.get('ETag');
    if (versjon !== avtale.versjon) {
        return await hentAvtale(avtale.id);
    } else {
        return avtale;
    }
};

const opprettAvtale = async (
    deltakerFnr: string,
    arbeidsgiverFnr: string
): Promise<Avtale> => {
    const postResponse = await fetch(`${API_URL}/avtaler`, {
        method: 'POST',
        body: JSON.stringify({
            deltakerFnr,
            arbeidsgiverFnr,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    handleResponse(postResponse);
    const getResponse = await fetch(
        `${API_URL}/${postResponse.headers.get('Location')}`
    );
    handleResponse(getResponse);
    const avtale: Avtale = await getResponse.json();
    return { ...avtale, id: `${avtale.id}` };
};

const hentRolle = async (avtaleId: string): Promise<Rolle> => {
    const response = await fetch(`${API_URL}/avtaler/${avtaleId}/rolle`);
    handleResponse(response);
    return response.json();
};

const endreGodkjenning = async (avtaleId: string, godkjent: boolean) => {
    const uri = `${API_URL}/avtaler/${avtaleId}/godkjent`;
    const body = JSON.stringify({ godkjent });
    const response = await fetch(uri, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    handleResponse(response);
    return hentAvtale(avtaleId);
};

const hentInnloggetBruker = async (): Promise<InnloggetBruker> => {
    const response = await fetchGet(`${API_URL}/innlogget-bruker`);
    handleResponse(response);
    return response.json();
};

const hentInnloggingskilder = async (): Promise<Innloggingskilde[]> => {
    const response = await fetchGet('/tiltaksgjennomforing/innloggingskilder');
    handleResponse(response);
    return await response.json();
};

const restService: RestService = {
    hentAvtale,
    lagreAvtale,
    opprettAvtale,
    hentRolle,
    endreGodkjenning,
    hentInnloggetBruker,
    hentInnloggingskilder,
};

export default restService;
