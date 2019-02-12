import ApiError from '../api-error';
import AutentiseringError from '../autentisering-error';
import { Rolle } from '../AvtaleContext';
import { Avtale } from '../AvtaleSide/avtale';
import InnloggetBruker from '../Innloggingslinje/innlogget-bruker';
import { InnloggingMetadata } from '../Innloggingslinje/useInnlogget';
import { basename } from '../paths';
import { SIDE_FOER_INNLOGGING } from '../RedirectEtterLogin';

export const API_URL = '/tiltaksgjennomforing/api';
const LOGIN_REDIRECT = '/tiltaksgjennomforing/login';
const HTTP_UNAUTHORIZED = 401;
const HTTP_CONFLICT = 409;

export default class RestService {
    static handleResponse(response: Response) {
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
    }

    static async hentAvtale(id: string): Promise<Avtale> {
        const response = await fetch(`${API_URL}/avtaler/${id}`);
        this.handleResponse(response);
        const avtale = await response.json();
        return { ...avtale, id: `${avtale.id}` };
    }

    static async hentAvtaler(): Promise<Map<string, Avtale>> {
        const response: Response = await fetch(`${API_URL}/avtaler`);
        this.handleResponse(response);
        const avtaler: Avtale[] = await response.json();
        return avtaler.reduce(
            (map: Map<string, Avtale>, avtale: Avtale) =>
                map.set(`${avtale.id}`, { ...avtale, id: `${avtale.id}` }),
            new Map<string, Avtale>()
        );
    }

    static async lagreAvtale(avtale: Avtale): Promise<Avtale> {
        const response = await fetch(`${API_URL}/avtaler/${avtale.id}`, {
            method: 'PUT',
            body: JSON.stringify(avtale),
            headers: {
                'Content-Type': 'application/json',
                'If-Match': avtale.versjon,
            },
        });
        this.handleResponse(response);
        const versjon = response.headers.get('ETag');
        if (versjon !== avtale.versjon) {
            return await this.hentAvtale(avtale.id);
        } else {
            return avtale;
        }
    }

    static async opprettAvtale(
        deltakerFnr: string,
        arbeidsgiverFnr: string
    ): Promise<Avtale> {
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
        this.handleResponse(postResponse);
        const getResponse = await fetch(
            `${API_URL}/${postResponse.headers.get('Location')}`
        );
        this.handleResponse(getResponse);
        const avtale: Avtale = await getResponse.json();
        return { ...avtale, id: `${avtale.id}` };
    }

    static async hentRolle(avtaleId: string): Promise<Rolle> {
        const response = await fetch(`${API_URL}/avtaler/${avtaleId}/rolle`);
        this.handleResponse(response);
        return response.json();
    }

    static async endreGodkjenning(avtaleId: string, godkjent: boolean) {
        const uri = `${API_URL}/avtaler/${avtaleId}/godkjent`;
        const body = JSON.stringify({ godkjent });
        const response = await fetch(uri, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.handleResponse(response);
    }

    static async hentInnloggetBruker(): Promise<InnloggetBruker> {
        const response = await fetch(`${API_URL}/innlogget-bruker`);
        this.handleResponse(response);
        return response.json();
    }

    static async hentInnloggingMetadata(): Promise<InnloggingMetadata> {
        const response = await fetch(
            '/tiltaksgjennomforing/innlogging-metadata'
        );
        this.handleResponse(response);
        return response.json();
    }
}
