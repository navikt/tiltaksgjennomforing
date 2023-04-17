const proxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');

const setup = (app) => {
    console.log('Lokal proxy-setup');
    const isLabs = process.env.NAIS_CLUSTER_NAME === 'labs-gcp';

    const apiUrl = isLabs ? 'http://tiltaksgjennomforing-api:8080' : 'http://localhost:8080';
    if (isLabs) {
        app.use(
            '/tiltaksgjennomforing/api/kodeverk',
            proxy(apiUrl, {
                proxyReqPathResolver: (req) => {
                    return req.originalUrl.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api');
                },
            })
        );
    }

    app.use('/tiltaksgjennomforing/api', (req, res, next) => {
        if (req.headers.cookie) {
            let cookies = req.headers.cookie.split(';');
            let cookieWithFakeToken = cookies.filter((c) => {
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
        createProxyMiddleware({
            onProxyReq: async (proxyReq, req, res) => {
                let cookies = req.headers.cookie.split(';');
                let cookieWithFakeToken = cookies.filter((c) => {
                    return c.includes('fake');
                });
                const accessToken = cookieWithFakeToken[0].split('=')[1];
                proxyReq.setHeader('Authorization', `Bearer ${accessToken}`);

                if (req.body) {
                    const bodyData = JSON.stringify(req.body);
                    proxyReq.setHeader('Content-Type', 'application/json');
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                    proxyReq.write(bodyData);
                }
            },
            changeOrigin: true,
            pathRewrite: { '/tiltaksgjennomforing/api': '/tiltaksgjennomforing-api' },
            target: apiUrl,
            proxyTimeout: 10000,
        })
    );
};

module.exports = { setup };
