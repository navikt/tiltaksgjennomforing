import { Avtale } from '../Stegside/avtale';
import Service from './service';

const API_URL = '/tiltaksgjennomforing/api';
const LOGIN_REDIRECT = '/tiltaksgjennomforing/login';
const HTTP_UNAUTHORIZED = 401;

const handleAuthorizedResponse = (response: Response) => {
    if (response.status === HTTP_UNAUTHORIZED) {
        window.location.href = LOGIN_REDIRECT;
        return;
    }
    return response.json();
};

export default class RestService extends Service {
    async hentAvtale(id: string): Promise<Avtale> {
        const avtale = await fetch(`${API_URL}/avtaler/${id}`).then(
            handleAuthorizedResponse
        );
        return { ...avtale, id: `${avtale.id}` };
    }

    async hentAvtaler(): Promise<Map<string, Avtale>> {
        const avtaler: Avtale[] = await fetch(`${API_URL}/avtaler`).then(
            handleAuthorizedResponse
        );
        return avtaler.reduce(
            (map: Map<string, Avtale>, avtale: Avtale) =>
                map.set(`${avtale.id}`, { ...avtale, id: `${avtale.id}` }),
            new Map<string, Avtale>()
        );
    }

    async lagreAvtale(avtale: Avtale): Promise<{versjon: string}> {
        const response = await fetch(`${API_URL}/avtaler/${avtale.id}`, {
            method: 'PUT',
            body: JSON.stringify(avtale),
            headers: {
                'Content-Type': 'application/json',
                'If-Match': avtale.versjon,
            },
        });
        handleAuthorizedResponse(response);
        const eTag = response.headers.get('ETag');
        if (eTag) {
            return Promise.resolve({versjon: eTag});
        }
        return Promise.reject('Respons inneholder ikke ETag-header');
    }

    async opprettAvtale(): Promise<Avtale> {
        const response = await fetch(`${API_URL}/avtaler`, {
            method: 'POST',
            body: JSON.stringify({
                deltakerFnr: '01234567890',
                veilederNavIdent: 'X123456',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const location = response.headers.get('Location');
        if (location) {
            const avtale = await fetch(`${API_URL}/${location}`).then(
                handleAuthorizedResponse
            );
            return { ...avtale, id: `${avtale.id}` };
        }
        return Promise.reject('Kunne ikke opprette ny avtale');
    }
}
