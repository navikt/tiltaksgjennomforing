const proxy = require('http-proxy-middleware');
const whitelist = require('./whitelist');

const erDevelopmentModus = process.env.NODE_ENV === 'development';

const envProperties = {
    APIGW_URL: process.env.APIGW_URL || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
    ISSO_LOGIN_URL:
        process.env.ISSO_LOGIN_URL ||
        (erDevelopmentModus &&
            '/tiltaksgjennomforing/api/local/isso-login?redirect=http://localhost:3000/tiltaksgjennomforing'),
    SELVBETJENING_LOGIN_URL:
        process.env.SELVBETJENING_LOGIN_URL ||
        (erDevelopmentModus &&
            '/tiltaksgjennomforing/api/local/selvbetjening-login?redirect=http://localhost:3000/tiltaksgjennomforing'),
    LOGOUT_URL:
        process.env.LOGOUT_URL ||
        (erDevelopmentModus &&
            '/tiltaksgjennomforing/api/local/logout?redirect=http://localhost:3000/tiltaksgjennomforing'),
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
                    part: 'deltaker',
                    url: envProperties.SELVBETJENING_LOGIN_URL,
                },
                {
                    tittel: 'Som arbeidsgiver',
                    part: 'arbeidsgiver',
                    url: envProperties.SELVBETJENING_LOGIN_URL,
                }
            );
        }
        if (envProperties.ISSO_LOGIN_URL) {
            innloggingskilder.push({
                tittel: 'Som NAV-veileder',
                part: 'veileder',
                url: envProperties.ISSO_LOGIN_URL,
            });
        }

        res.send(JSON.stringify(innloggingskilder));
    });

    app.get('/tiltaksgjennomforing/logout', (req, res) => {
        res.redirect(envProperties.LOGOUT_URL);
    });

    const proxyConfig = {
        changeOrigin: true,
        pathRewrite: whitelist,
        target: envProperties.APIGW_URL,
        xfwd: true,
    };

    if (envProperties.APIGW_HEADER) {
        proxyConfig.headers = {
            'x-nav-apiKey': envProperties.APIGW_HEADER,
        };
    }

    app.use('/tiltaksgjennomforing/api', proxy(proxyConfig));
};
