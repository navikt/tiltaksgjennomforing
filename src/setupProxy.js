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
        process.env.ISSO_LOGOUT_URL ||
        '/tiltaksgjennomforing/api/local/logout?redirect=http://localhost:3000/tiltaksgjennomforing',
};

console.log('Relevante miljøvariable: ', envProperties);

module.exports = function(app) {
    app.get('/tiltaksgjennomforing/innlogging-metadata', (req, res) => {
        const metadata = {
            login: [
                {
                    title: 'ID-porten',
                    login: envProperties.SELVBETJENING_LOGIN_URL,
                },
                {
                    title: 'NAV',
                    login: envProperties.ISSO_LOGIN_URL,
                },
            ],
            logout: envProperties.LOGOUT_URL,
        };
        res.send(JSON.stringify(metadata));
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
