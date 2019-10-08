import { API_URL } from '@/services/rest-service';
import fetchMock from 'fetch-mock';
import avtaleMock from './avtale-mock';
import avtaleListeMock from './avtaler-mock';
import rolleMock from './rolle-mock';

const opprettAvtaleHeaders = {
    Location: 'avtaler/9565e74d-66f3-44a1-8a3c-91fae6b450d3',
};

const opprettAvtaleResponse = new Response(JSON.stringify(avtaleMock), {
    status: 200,
    headers: opprettAvtaleHeaders,
});

const lagreAvtaleHeaders = {
    ETag: '0',
};

const lagreAvtaleResponse = new Response('ok', {
    status: 200,
    headers: lagreAvtaleHeaders,
});

const hentAvtalerUrl = `${API_URL}/avtaler`;
const opprettAvtaleUrl = hentAvtalerUrl;
const hentAvtaleUrl = new RegExp(`${API_URL}/avtaler/[a-zA-Z0-9-]*`);
const lagreAvtaleUrl = hentAvtaleUrl;
const hentRolleUrl = new RegExp(`${API_URL}/avtaler/[a-zA-Z0-9-]*/rolle`);

fetchMock
    .get(hentAvtalerUrl, avtaleListeMock)
    .get(hentRolleUrl, JSON.stringify(rolleMock))
    .get(hentAvtaleUrl, JSON.stringify(avtaleMock))
    .put(lagreAvtaleUrl, lagreAvtaleResponse)
    .post(opprettAvtaleUrl, opprettAvtaleResponse);
