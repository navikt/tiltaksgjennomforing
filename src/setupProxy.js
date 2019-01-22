const proxy = require('http-proxy-middleware');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    // Bruk .../local/selvbetjening-cookie?... for login som bruker
    LOGIN_URL:
        process.env.LOGIN_URL ||
        'http://localhost:8080/tiltaksgjennomforing-api/local/isso-cookie?redirect=http://localhost:3000/tiltaksgjennomforing',
    LOGOUT_URL: process.env.LOGOUT_URL,
    APIGW_HEADER: process.env.APIGW_HEADER,
};

console.log('Relevante miljøvariable: ', envProperties);

module.exports = function(app) {
    app.get('/tiltaksgjennomforing/login', (req, res) => {
        res.redirect(envProperties.LOGIN_URL);
    });

    app.get('/tiltaksgjennomforing/logout', (req, res) => {
        res.redirect(envProperties.LOGOUT_URL);
    });

    const proxyConfig = {
        changeOrigin: true,
        pathRewrite: {
            '^/tiltaksgjennomforing/api': '/tiltaksgjennomforing-api',
        },
        target: envProperties.API_GATEWAY,
        secure: false,
        xfwd: true,
    };

    if (envProperties.APIGW_HEADER) {
        proxyConfig.headers = {
            'x-nav-apiKey': envProperties.APIGW_HEADER
        }
    }

    app.use('/tiltaksgjennomforing/api', proxy(proxyConfig));
};
