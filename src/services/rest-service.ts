import { Avtale } from '../AvtaleSide/avtale';
import Service from './service';
import { ApiError } from '../AvtaleSide/ApiError';
import { renderIntoDocument } from 'react-dom/test-utils';

const API_URL = '/tiltaksgjennomforing/api';
const LOGIN_REDIRECT = '/tiltaksgjennomforing/login';
const HTTP_UNAUTHORIZED = 401;

export default class RestService extends Service {
    handleAuthorizedResponse(response: Response) {
        if (response.status === HTTP_UNAUTHORIZED) {
            window.location.href = LOGIN_REDIRECT;
        }
        if (!response.ok) {
            throw new ApiError('Feil ved kall til backend');
        }
        return response;
    }

    async hentAvtale(id: string): Promise<Avtale> {
        const avtale = await fetch(`${API_URL}/avtaler/${id}`)
            .then(this.handleAuthorizedResponse)
            .then(response => response.json());
        return { ...avtale, id: `${avtale.id}` };
    }

    async hentAvtaler(): Promise<Map<string, Avtale>> {
        const avtaler: Avtale[] = await fetch(`${API_URL}/avtaler`)
            .then(this.handleAuthorizedResponse)
            .then(response => response.json());
        return avtaler.reduce(
            (map: Map<string, Avtale>, avtale: Avtale) =>
                map.set(`${avtale.id}`, { ...avtale, id: `${avtale.id}` }),
            new Map<string, Avtale>()
        );
    }

    async lagreAvtale(avtale: Avtale): Promise<{ versjon: string }> {
        return fetch(`${API_URL}/avtaler/${avtale.id}`, {
            method: 'PUT',
            body: JSON.stringify(avtale),
            headers: {
                'Content-Type': 'application/json',
                'If-Match': avtale.versjon,
            },
        })
            .then(this.handleAuthorizedResponse)
            .then((response: Response) => {
                const eTag = response.headers.get('ETag');
                if (eTag) {
                    return Promise.resolve({ versjon: eTag });
                }
                return Promise.reject('Respons inneholder ikke ETag-header');
            });
    }

    async opprettAvtale(
        deltakerFnr: string,
        arbeidsgiverFnr: string,
        veilederNavIdent: string
    ): Promise<Avtale> {
        return fetch(`${API_URL}/avtaler`, {
            method: 'POST',
            body: JSON.stringify({
                deltakerFnr,
                arbeidsgiverFnr,
                veilederNavIdent,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.handleAuthorizedResponse)
            .then(response => response.headers.get('Location'))
            .then(location => fetch(`${API_URL}/${location}`))
            .then(this.handleAuthorizedResponse)
            .then(response => response.json())
            .then((avtale: Avtale) => ({ ...avtale, id: `${avtale.id}` }));
    }
}
