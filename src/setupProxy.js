const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch');
const whitelist = require('./whitelist');
const apiProxy = require('../server/api-proxy');
const lokalProxy = require('../server/lokalproxy');
const tokenx = require('../server/tokenx');
const azure = require('../server/azure');

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

        if (brukLokalLogin) {
            innloggingskilder.push(
                {
                    tittel: 'Som deltaker',
                    part: 'DELTAKER',
                    url: '/tiltaksgjennomforing/fakelogin/tokenx'
                },{
                    tittel: 'Som mentor',
                    part: 'MENTOR',
                    url: '/tiltaksgjennomforing/fakelogin/tokenx'
                },
                {
                    tittel: 'Som arbeidsgiver',
                    part: 'ARBEIDSGIVER',
                    url: '/tiltaksgjennomforing/fakelogin/tokenx'
                },
                {
                    tittel: 'Som veileder',
                    part: 'VEILEDER',
                    url: '/tiltaksgjennomforing/fakelogin/aad'
                },
                {
                    tittel: 'Som beslutter',
                    part: 'BESLUTTER',
                    url: '/tiltaksgjennomforing/fakelogin/aad'
                }
            );
        } else {
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

    const gcpTokenExchange = async () => {
        if(process.env.INTERN_INGRESS) {
            console.log('gcpTokenExchange: Intern ingress');
            const azureClient = await azure.client();
            const azureTokenEndpoint = await azure.azureTokenEndpoint();
            console.log('intern ingress - neste kall er apiProxy.setup()');
            apiProxy.setup(app, null, azureClient, azureTokenEndpoint);
            console.log('intern ingress - apiProxy.setup() er ferdig');

        } else {
            console.log('gcpTokenExchange: Ekstern ingress');
            const tokenxAuthClient = await tokenx.client();
            apiProxy.setup(app, tokenxAuthClient, null, null);
            console.log('gcpTokenExchange: Ekstern ingress - apiProxy.setup() er ferdig');
        }
    };

    if (process.env.NAIS_CLUSTER_NAME === 'dev-gcp' || process.env.NAIS_CLUSTER_NAME === 'prod-gcp') {
        gcpTokenExchange();
    } else {
        lokalProxy.setup(app);
    }

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
