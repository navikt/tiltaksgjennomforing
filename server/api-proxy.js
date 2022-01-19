const proxy = require('express-http-proxy');
const tokenx = require('./tokenx')

const setup = (router, tokenxClient) => {
    router.use('/tiltaksgjennomforing/api', (req, res) => {
        if (!req.headers['authorization']) {
            res.status(401).send();
        }
    })

    router.use(
        '/tiltaksgjennomforing/api',
        proxy(process.env.APIGW_URL, {
            proxyReqPathResolver: (req) => {
                return req.originalUrl.replace("/tiltaksgjennomforing/api", "/tiltaksgjennomforing-api");
            },
            proxyReqOptDecorator: async (options, req) => {
                const accessToken = await tokenx.getTokenExchangeAccessToken(tokenxClient, req);
                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        })
    );
};

module.exports = { setup };
