const proxy = require('express-http-proxy');
const tokenx = require('./tokenx')

const setup = (app, tokenxClient) => {
    app.use('/tiltaksgjennomforing/notifikasjon-bruker-api', (req, res, next) => {
        if (!req.headers['authorization']) {
            res.status(401).send();
        } else {
            next();
        }
    })

    app.use(
        '/tiltaksgjennomforing/notifikasjon-bruker-api',
        proxy(process.env.NOTIFIKASJON_URL, {
            proxyReqPathResolver: () => {
                return '/api/graphql'
            },
            proxyReqOptDecorator: async (options, req) => {
                const accessToken = await tokenx.getTokenExchangeAccessToken(tokenxClient, process.env.NOTIFIKASJON_AUDIENCE,  req);
                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        })
    );
};

module.exports = { setup };
