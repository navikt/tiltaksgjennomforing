const { createProxyMiddleware } = require('http-proxy-middleware');
const lokalProxy = require('../server/proxy/labs-proxy');
const fetch = require('node-fetch');
const { applyNotifikasjonMockMiddleware } = require('@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock');
const { lokalOgLabsInnloggingskilder } = require('../server/paths/pathVariables');


const envProperties = {
    APIGW_URL: 'http://localhost:8080',
    LOGIN_URL: '/tiltaksgjennomforing/fakelogin/aad',
    LOGOUT_URL: '/tiltaksgjennomforing/fakelogout?domain=localhost',
    STILLINGSTITLER_URL: 'https://tiltak-stillingstitler.dev-gcp.nais.io/',
};

module.exports = function (app) {
    const apiURL = 'http://localhost:8080';

    app.get('/tiltaksgjennomforing/innloggingskilder', (req, res) => {
        res.json(...lokalOgLabsInnloggingskilder);
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

    lokalProxy.setupFakeLoginProvider(app, apiURL);
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
