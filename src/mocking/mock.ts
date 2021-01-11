import { API_URL } from '@/services/rest-service';
import fetchMock from 'fetch-mock';
import arbeidstreningAvtaleMock from './arbeidstrening-avtale-mock';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';
import { alleFeatures } from '@/FeatureToggleProvider';
import statusDetaljerMock from '@/mocking/status-detaljer-mock';

const opprettAvtaleHeaders = {
    Location: 'avtaler/0',
};

const opprettAvtaleResponse = new Response(null, {
    status: 201,
    headers: opprettAvtaleHeaders,
});

const lagreAvtaleResponse = new Response('ok', {
    status: 200,
});

const features = alleFeatures.reduce((obj, item) => ({ ...obj, [item]: true }), {});

fetchMock
    .get('/tiltaksgjennomforing/innloggingskilder', [
        {
            tittel: 'Som NAV-veileder',
            part: 'VEILEDER',
            url: '',
        },
        {
            tittel: 'Som NAV-beslutter',
            part: 'BESLUTTER',
            url: '',
        },
    ])
    .get('/tiltaksgjennomforing/skal-backupmeny-brukes', 'true')
    .get(`${API_URL}/innlogget-bruker`, { identifikator: 'Z123456', erNavAnsatt: true })
    .get(`${API_URL}/avtaler?veilederNavIdent=Z123456&beslutterNavIdent=Z321456,`, [
        arbeidstreningAvtaleMock,
        lonnstilskuddAvtaleMock,
    ])
    .get(`${API_URL}/avtaler/0/rolle`, '"VEILEDER"')
    .get(`${API_URL}/avtaler/1/rolle`, '"VEILEDER"')
    .get(`${API_URL}/avtaler/0`, arbeidstreningAvtaleMock)
    .get(`${API_URL}/avtaler/1`, lonnstilskuddAvtaleMock)
    .get(`${API_URL}/avtaler/0/status-detaljer`, statusDetaljerMock)
    .get(`${API_URL}/avtaler/1/status-detaljer`, statusDetaljerMock)
    .get(new RegExp(`${API_URL}/varsler`), [])
    .get(new RegExp(`${API_URL}/feature`), features)
    .put(new RegExp(`${API_URL}/avtaler/.*`), lagreAvtaleResponse)
    .post(`${API_URL}/avtaler`, opprettAvtaleResponse)
    .post(new RegExp('https://sentry.gc.nav.no'), {});
