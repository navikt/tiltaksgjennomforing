const proxy = require('http-proxy-middleware');
const fetch = require('node-fetch');
const whitelist = require('./whitelist');

const brukLokalLogin = process.env.NODE_ENV === 'development';

const envProperties = {
    APIGW_URL: process.env.APIGW_URL || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
    ISSO_LOGIN_URL: process.env.ISSO_LOGIN_URL || (brukLokalLogin && '/tiltaksgjennomforing/fakelogin/isso'),
    SELVBETJENING_LOGIN_URL:
        process.env.SELVBETJENING_LOGIN_URL || (brukLokalLogin && '/tiltaksgjennomforing/fakelogin/selvbetjening'),
    LOGOUT_URL: process.env.LOGOUT_URL || (brukLokalLogin && '/tiltaksgjennomforing/fakelogout?domain=localhost'),
};

if (!envProperties.LOGOUT_URL || !(envProperties.ISSO_LOGIN_URL || envProperties.SELVBETJENING_LOGIN_URL)) {
    console.error(
        'Må sette en variabel for innlogging og en for utlogging: LOGOUT_URL, SELVBETJENING_LOGIN_URL, ISSO_LOGIN_URL.'
    );
    process.exit(1);
}

module.exports = function(app) {
    app.get('/tiltaksgjennomforing/innloggingskilder', (req, res) => {
        const innloggingskilder = [];

        if (envProperties.SELVBETJENING_LOGIN_URL) {
            innloggingskilder.push(
                {
                    tittel: 'Som deltaker',
                    part: 'DELTAKER',
                    url: envProperties.SELVBETJENING_LOGIN_URL,
                },
                {
                    tittel: 'Som arbeidsgiver',
                    part: 'ARBEIDSGIVER',
                    url: envProperties.SELVBETJENING_LOGIN_URL,
                }
            );
        }
        if (envProperties.ISSO_LOGIN_URL) {
            innloggingskilder.push(
                {
                    tittel: 'Som Veileder',
                    part: 'VEILEDER',
                    url: envProperties.ISSO_LOGIN_URL,
                },
                {
                    tittel: 'Som Beslutter',
                    part: 'BESLUTTER',
                    url: envProperties.ISSO_LOGIN_URL,
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

    const proxyConfig = {
        changeOrigin: true,
        pathRewrite: whitelist,
        target: envProperties.APIGW_URL,
        xfwd: true,
        proxyTimeout: 10000,
    };

    app.get('/tiltaksgjennomforing/fakelogin/isso', async (req, res) => {
        const navIdent = req.headers['isso-id'] || 'Z123456';
        const url = `https://tiltak-fakelogin.labs.nais.io/token?iss=isso&aud=aud-isso&NAVident=${navIdent}`;
        const response = await fetch(url);
        const data = await response.text();
        res.cookie('isso-idtoken', data);
        res.redirect('/tiltaksgjennomforing');
    });

    app.get('/tiltaksgjennomforing/fakelogin/selvbetjening', async (req, res) => {
        const subject = req.headers['selvbetjening-id'] || '20000000052';
        const url = `https://tiltak-fakelogin.labs.nais.io/token?iss=selvbetjening&aud=aud-selvbetjening&sub=${subject}&acr=Level4`;
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

    if (envProperties.APIGW_HEADER) {
        proxyConfig.headers = {
            'x-nav-apiKey': envProperties.APIGW_HEADER,
        };
    }

    app.use('/tiltaksgjennomforing/api', proxy(proxyConfig));
};
