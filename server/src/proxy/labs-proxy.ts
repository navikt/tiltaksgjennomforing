import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const setup = (app: Express) => {
    const apiUrl = 'http://tiltaksgjennomforing-api-labs:8080';

    app.use(
        '/tiltaksgjennomforing/api/kodeverk',
        createProxyMiddleware({
            target: `${apiUrl}/tiltaksgjennomforing-api/kodeverk`,
            changeOrigin: true,
        }),
    );

    app.use(
        '/tiltaksgjennomforing/stillingstitler',
        createProxyMiddleware({
            target: 'http://tiltak-stillingstitler',
            changeOrigin: true,
            proxyTimeout: 10000,
        }),
    );

    setupFakeLoginProvider(app, apiUrl);
};

function setupFakeLoginProvider(app: Express, apiUrl: string) {
    app.get('/tiltaksgjennomforing/fakelogin/aad', async (req, res) => {
        const navIdent = req.headers['navident'] || 'Z123456';
        const url = `https://tiltak-fakelogin.ekstern.dev.nav.no/token?iss=aad&aud=fake-aad&NAVident=${navIdent}`;
        const response = await fetch(url);
        const data = await response.text();
        res.cookie('fake-aad-idtoken', data);
        res.redirect('/tiltaksgjennomforing');
    });

    app.get('/tiltaksgjennomforing/fakelogin/tokenx', async (req, res) => {
        const subject = req.headers['fnr'] || '23090170716';
        const url = `https://tiltak-fakelogin.ekstern.dev.nav.no/token?iss=tokenx&aud=fake-tokenx&pid=${subject}&acr=Level4`;
        const response = await fetch(url);
        const data = await response.text();
        res.cookie('fake-tokenx-idtoken', data);
        res.redirect('/tiltaksgjennomforing');
    });

    app.get('/tiltaksgjennomforing/fakelogout', async (req, res) => {
        res.clearCookie('fake-tokenx-idtoken');
        res.clearCookie('fake-aad-idtoken');
        res.redirect('/tiltaksgjennomforing');
    });

    app.use('/tiltaksgjennomforing/api', (req, res, next) => {
        if (req.headers.cookie) {
            const cookies = req.headers.cookie.split(';');
            const cookieWithFakeToken = cookies.filter((c) => {
                return c.includes('fake');
            });
            if (cookieWithFakeToken.length === 0) {
                res.status(401).send();
            } else {
                next();
            }
        } else {
            res.status(401).send();
        }
    });

    app.use(
        '/tiltaksgjennomforing/api',
        async (req, _, next) => {
            if (req.headers) {
                const cookies: string[] | undefined = req.headers.cookie?.split(';');
                const cookieWithFakeToken = cookies?.filter((cookie: string) => cookie.includes('fake'));
                if (cookieWithFakeToken) {
                    const accessToken = cookieWithFakeToken[0].split('=')[1];
                    req.headers.Authorization = `Bearer ${accessToken}`;
                }
            }
            next();
        },
        createProxyMiddleware({
            target: `${apiUrl}/tiltaksgjennomforing-api`,
            changeOrigin: true,
        }),
    );
}
