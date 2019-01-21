import fetchMock from 'fetch-mock';
import { API_URL } from '../services/rest-service';
import avtaleListeMock from './avtaler-mock';
import avtaleMock from './avtale-mock';
import rolleMock from './rolle-mock';

const rolleUrl = new RegExp(
    '/tiltaksgjennomforing/api/avtaler/[a-zA-Z0-9]/rolle'
);
const avtaleUrl = new RegExp('/tiltaksgjennomforing/api/avtaler/[a-zA-Z0-9]');

const headers: { [key: string]: string } = {
    'Location': '/avtaler/9565e74d-66f3-44a1-8a3c-91fae6b450d3',
};

fetchMock
    .get(`${API_URL}/avtaler`, avtaleListeMock)
    .get(rolleUrl, JSON.stringify(rolleMock))
    .get(avtaleUrl, JSON.stringify(avtaleMock), { headers })
    .put(avtaleUrl, 200)
    .post(`${API_URL}/avtaler`, 200);

/*

 */
