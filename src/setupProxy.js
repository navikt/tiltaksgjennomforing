const proxy = require('http-proxy-middleware');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    LOGIN_URL:
        process.env.LOGIN_URL ||
        'http://localhost:8080/tiltaksgjennomforing-api/local/cookie?redirect=http://localhost:3000/tiltaksgjennomforing',
    LOGOUT_URL: process.env.LOGOUT_URL,
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

    app.use('/tiltaksgjennomforing/api', proxy(proxyConfig));
};
