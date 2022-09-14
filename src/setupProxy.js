const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch');
const apiProxy = require('../server/api-proxy');
const tokenx = require('../server/tokenx');
const azure = require('../server/azure').default

const brukLokalLogin = process.env.NODE_ENV === 'development';

const envProperties = {
    APIGW_URL: process.env.APIGW_URL || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
    LOGIN_URL: process.env.LOGIN_URL || (brukLokalLogin && '/tiltaksgjennomforing/fakelogin/isso'), 
    LOGOUT_URL: process.env.LOGOUT_URL || (brukLokalLogin && '/tiltaksgjennomforing/fakelogout?domain=localhost'),
    STILLINGSTITLER_URL: process.env.STILLINGSTITLER_URL || 'https://tiltak-stillingstitler.dev-gcp.nais.io/',
};

if (!envProperties.LOGOUT_URL || !envProperties.LOGIN_URL) {
    console.error(
        'Må sette en variabel for innlogging og en for utlogging: LOGOUT_URL, LOGIN_URL.'
    );
    process.exit(1);
}

module.exports = function (app) {
    app.get('/tiltaksgjennomforing/innloggingskilder', (req, res) => {
        const innloggingskilder = [];

        if (!process.env.INTERN_INGRESS) {
            innloggingskilder.push(
                {
                    tittel: 'Som deltaker',
                    part: 'DELTAKER',
                    url: envProperties.LOGIN_URL,
                },{
                    tittel: 'Som mentor',
                    part: 'MENTOR',
                    url: envProperties.LOGIN_URL,
                },
                {
                    tittel: 'Som arbeidsgiver',
                    part: 'ARBEIDSGIVER',
                    url: envProperties.LOGIN_URL,
                }
            );
        }
        if (process.env.INTERN_INGRESS) {
            innloggingskilder.push(
                {
                    tittel: 'Som veileder',
                    part: 'VEILEDER',
                    url: envProperties.LOGIN_URL,
                },
                {
                    tittel: 'Som beslutter',
                    part: 'BESLUTTER',
                    url: envProperties.LOGIN_URL,
                }
            );
        }
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

    app.get('/tiltaksgjennomforing/fakelogin/isso', async (req, res) => {
        const navIdent = req.headers['isso-id'] || 'Z123456';
        const url = `https://tiltak-fakelogin.labs.nais.io/token?iss=isso&aud=aud-isso&NAVident=${navIdent}`;
        const response = await fetch(url);
        const data = await response.text();
        res.cookie('isso-idtoken', data);
        res.redirect('/tiltaksgjennomforing');
    });

    app.get('/tiltaksgjennomforing/fakelogin/selvbetjening', async (req, res) => {
        const subject = req.headers['selvbetjening-id'] || '23090170716';
        const url = `https://tiltak-fakelogin.labs.nais.io/token?iss=selvbetjening&aud=aud-selvbetjening&pid=${subject}&acr=Level4`;
        const response = await fetch(url);
        const data = await response.text();
        res.cookie('selvbetjening-idtoken', data);
        res.redirect('/tiltaksgjennomforing');
    });

    app.get('/tiltaksgjennomforing/fakelogout', async (req, res) => {
        res.clearCookie('selvbetjening-idtoken');
        res.clearCookie('isso-idtoken');
        res.redirect('/tiltaksgjennomforing');
    });

    const gcpTokenExchange = async () => {
        const tokenxAuthClient = await tokenx.client();
        const azureClient = await azure.client();
        const azureTokenEndpoint = await azure.azureTokenEndpoint();
        apiProxy.setup(app, tokenxAuthClient, azureClient, azureTokenEndpoint);
    };

    gcpTokenExchange();

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
