import { Avtale } from '../Stegside/avtale';
import Service from './service';

const API_URL = '/tiltaksgjennomforing/api';
const LOGIN_REDIRECT = '/tiltaksgjennomforing/login';
const HTTP_UNAUTHORIZED = 401;

const handleAuthorizedResponse = (response: Response, callback?: () => any) => {
    if (response.status === HTTP_UNAUTHORIZED) {
        window.location.href = LOGIN_REDIRECT;
        return;
    }
    return callback && callback();
};

export default class RestService extends Service {
    async hentAvtale(id: string): Promise<Avtale> {
        const avtale = await fetch(`${API_URL}/avtaler/${id}`).then(
            (response: Response) =>
                handleAuthorizedResponse(response, () => response.json())
        );
        return { ...avtale, id: `${avtale.id}` };
    }

    async hentAvtaler(): Promise<Map<string, Avtale>> {
        const avtaler: Avtale[] = await fetch(`${API_URL}/avtaler`).then(
            (response: Response) =>
                handleAuthorizedResponse(response, () => response.json())
        );
        return avtaler.reduce(
            (map: Map<string, Avtale>, avtale: Avtale) =>
                map.set(`${avtale.id}`, { ...avtale, id: `${avtale.id}` }),
            new Map<string, Avtale>()
        );
    }

    lagreAvtale(avtale: Avtale): Promise<void> {
        return fetch(`${API_URL}/avtaler/${avtale.id}`, {
            method: 'PUT',
            body: JSON.stringify(avtale),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(handleAuthorizedResponse);
    }

    opprettAvtale(): Promise<Avtale> {
        return fetch(`${API_URL}/avtaler`, {
            method: 'POST',
            body: JSON.stringify({deltakerFnr: '01234567890', veilederNavIdent: 'X123456'}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (postResponse: Response) => {
            const location = postResponse.headers.get('Location');
            if (location) {
                const avtale = await fetch(`${API_URL}/${location}`).then(
                    (response: Response) =>
                        handleAuthorizedResponse(response, () =>
                            response.json()
                        )
                );
                return { ...avtale, id: `${avtale.id}` };
            }
            return Promise.reject('Kunne ikke opprette ny avtale');
        });
    }
}
