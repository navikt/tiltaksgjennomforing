const proxy = require('http-proxy-middleware');

const envProperties = {
    APIGW_URL: process.env.APIGW_URL || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
    ISSO_LOGIN_URL:
        process.env.ISSO_LOGIN_URL ||
        '/tiltaksgjennomforing/api/local/isso-login?redirect=http://localhost:3000/tiltaksgjennomforing',
    SELVBETJENING_LOGIN_URL:
        process.env.SELVBETJENING_LOGIN_URL ||
        '/tiltaksgjennomforing/api/local/selvbetjening-login?redirect=http://localhost:3000/tiltaksgjennomforing',
    LOGOUT_URL:
        process.env.LOGOUT_URL ||
        '/tiltaksgjennomforing/api/local/logout?redirect=http://localhost:3000/tiltaksgjennomforing',
};

console.log('Relevante miljøvariable: ', envProperties);

module.exports = function(app) {
    app.get('/tiltaksgjennomforing/innloggingskilder', (req, res) => {
        const innloggingskilder = [];

        if (envProperties.SELVBETJENING_LOGIN_URL) {
            innloggingskilder.push({
                tittel: 'Logg inn via ID-porten',
                url: envProperties.SELVBETJENING_LOGIN_URL,
            });
        }
        if (envProperties.ISSO_LOGIN_URL) {
            innloggingskilder.push({
                tittel: 'Logg inn som NAV-veileder',
                url: envProperties.ISSO_LOGIN_URL,
            })
        }

        res.send(JSON.stringify(innloggingskilder));
    });

    app.get('/tiltaksgjennomforing/logout', (req, res) => {
        res.redirect(envProperties.LOGOUT_URL);
    });

    const proxyConfig = {
        changeOrigin: true,
        pathRewrite: {
            '^/tiltaksgjennomforing/api': '/tiltaksgjennomforing-api',
        },
        target: envProperties.APIGW_URL,
        secure: false,
        xfwd: true,
    };

    if (envProperties.APIGW_HEADER) {
        proxyConfig.headers = {
            'x-nav-apiKey': envProperties.APIGW_HEADER,
        };
    }

    app.use('/tiltaksgjennomforing/api', proxy(proxyConfig));
};
