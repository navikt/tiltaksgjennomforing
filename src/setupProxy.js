const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch');
const { applyNotifikasjonMockMiddleware } = require('@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock');
const proxy = require('express-http-proxy');

const envProperties = {
    APIGW_URL: 'http://localhost:8080',
    LOGIN_URL: '/tiltaksgjennomforing/fakelogin/aad',
    LOGOUT_URL: '/tiltaksgjennomforing/fakelogout?domain=localhost',
    STILLINGSTITLER_URL: 'https://tiltak-stillingstitler.dev-gcp.nais.io/',
};

module.exports = function (app) {
    const apiURL = 'http://localhost:8080';

    const innloggingskilder = [
        {
            tittel: 'Som deltaker',
            part: 'DELTAKER',
            url: '/tiltaksgjennomforing/fakelogin/tokenx',
        },
        {
            tittel: 'Som mentor',
            part: 'MENTOR',
            url: '/tiltaksgjennomforing/fakelogin/tokenx',
        },
        {
            tittel: 'Som arbeidsgiver',
            part: 'ARBEIDSGIVER',
            url: '/tiltaksgjennomforing/fakelogin/tokenx',
        },
        {
            tittel: 'Som veileder',
            part: 'VEILEDER',
            url: '/tiltaksgjennomforing/fakelogin/aad',
        },
        {
            tittel: 'Som beslutter',
            part: 'BESLUTTER',
            url: '/tiltaksgjennomforing/fakelogin/aad',
        },
    ];

    app.get('/tiltaksgjennomforing/innloggingskilder', (req, res) => {
        res.json(innloggingskilder);
    });

    app.get('/tiltaksgjennomforing/logout', (req, res) => {
        res.redirect(envProperties.LOGOUT_URL);
    });

    app.get('/tiltaksgjennomforing/skal-backupmeny-brukes', (req, res) => {
        res.json(process.env.ENABLE_EXTERNAL_MENU !== 'true' && process.env.ENABLE_INTERNAL_MENU !== 'true');
    });

    app.get('/tiltaksgjennomforing/brukavInternflate', (req, res) => {
        res.json(process.env.ENABLE_INTERNAL_MENU === 'true');
    });

    app.get('/tiltaksgjennomforing/fakelogin/aad', async (req, res) => {
        const navIdent = req.headers['navident'] || 'Z123456';
        const url = `https://tiltak-fakelogin.labs.nais.io/token?iss=aad&aud=fake-aad&NAVident=${navIdent}`;

        const response = await fetch(url);
        const data = await response.text();

        res.cookie('fake-aad-idtoken', data);
        res.redirect('/tiltaksgjennomforing');
    });

    app.get('/tiltaksgjennomforing/fakelogin/tokenx', async (req, res) => {
        const subject = req.headers['fnr'] || '23090170716';
        const url = `https://tiltak-fakelogin.labs.nais.io/token?iss=tokenx&aud=fake-tokenx&pid=${subject}&acr=Level4`;

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

    setupLocalProxy(app, apiURL);
    applyNotifikasjonMockMiddleware({ app, path: '/tiltaksgjennomforing/notifikasjon-bruker-api' });

    app.use(
        '/tiltaksgjennomforing/stillingstitler',
        createProxyMiddleware({
            changeOrigin: true,
            pathRewrite: { '^/tiltaksgjennomforing/stillingstitler': '/' },
            target: envProperties.STILLINGSTITLER_URL,
            proxyTimeout: 10000,
        })
    );
};

function setupLocalProxy(app, apiUrl) {
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
        proxy(apiUrl, {
            proxyReqPathResolver: (req) => {
                return req.originalUrl.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api');
            },
            proxyReqOptDecorator: (options, req) => {
                if (req.headers && options.headers) {
                    const cookies = req.headers.cookie?.split(';');
                    const cookieWithFakeToken = cookies?.filter((cookie) => {
                        return cookie.includes('fake');
                    });
                    if (cookieWithFakeToken) {
                        const accessToken = cookieWithFakeToken[0].split('=')[1];
                        options.headers.Authorization = `Bearer ${accessToken}`;
                    }
                }
                return options;
            },
        })
    );
}
