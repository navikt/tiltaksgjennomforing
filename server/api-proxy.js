const proxy = require('express-http-proxy');
const tokenx = require('./tokenx')

const setup = (app, tokenxClient) => {
    app.use('/tiltaksgjennomforing/api', (req, res, next) => {
        if (!req.originalUrl.includes("feature") && !req.headers['authorization']) {
            res.status(401).send();
        } else {
            next();
        }
    })

    app.use(
        '/tiltaksgjennomforing/api',
        proxy(process.env.APIGW_URL, {
            proxyReqPathResolver: (req) => {
                return req.originalUrl.replace("/tiltaksgjennomforing/api", "/tiltaksgjennomforing-api");
            },
            proxyReqOptDecorator: async (options, req) => {
              if(!req.originalUrl.includes("feature")){
                const accessToken = await tokenx.getTokenExchangeAccessToken(tokenxClient, req);
                options.headers.Authorization = `Bearer ${accessToken}`;
              }
              return options;
            },
        })
    );
};

module.exports = { setup };
