import { Avtale } from '../Stegside/avtale';
import Service from './service';

const apiUrl = '/tiltaksgjennomforing/api';

export default class RestService extends Service {
    async hentAvtale(id: string): Promise<Avtale> {
        const avtale = await fetch(`${apiUrl}/avtaler/${id}`).then(
            (response: Response) => response.json()
        );
        return { ...avtale, id: `${avtale.id}` };
    }

    async hentAvtaler(): Promise<Map<string, Avtale>> {
        const avtaler: Avtale[] = await fetch(`${apiUrl}/avtaler`).then(
            (response: Response) => response.json()
        );
        return avtaler.reduce(
            (map: Map<string, Avtale>, avtale: Avtale) =>
                map.set(`${avtale.id}`, avtale),
            new Map<string, Avtale>()
        );
    }

    async lagreAvtale(avtale: Avtale): Promise<Avtale> {
        return fetch(`${apiUrl}/avtaler/${avtale.id}`, {
            method: 'PUT',
            body: JSON.stringify(avtale),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (putResponse: Response) => {
            const location = putResponse.headers.get('Location');
            if (location) {
                const lagretAvtale = await fetch(`${apiUrl}/${location}`).then(
                    (getResponse: Response) => getResponse.json()
                );
                return { ...lagretAvtale, id: `${lagretAvtale.id}` };
            }
            return Promise.reject('Kunne ikke endre avtale');
        });
    }

    async opprettAvtale(): Promise<Avtale> {
        return fetch(`${apiUrl}/avtaler`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((postResponse: Response) => {
            const location = postResponse.headers.get('Location');
            if (location) {
                return fetch(`${apiUrl}/${location}`).then(
                    (getResponse: Response) => getResponse.json()
                );
            }
            return Promise.reject('Kunne ikke opprette ny avtale');
        });
    }
}
