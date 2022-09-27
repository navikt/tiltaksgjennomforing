const proxy = require('express-http-proxy');
const tokenx = require('./tokenx');
const onbehalfof = require('./azure');
const whitelist = require('../src/whitelist');

const setup = (app, tokenxClient, azureClient, azureTokenEndpoint) => {
    console.log('apiProxy setup');
    app.use('/tiltaksgjennomforing/api', (req, res, next) => {
        console.log('apiProxy /tiltaksgjennomforing/api');
        if (!req.headers['authorization']) {
            res.status(401).send();
        } else {
            next();
        }
    });

    app.use(
        '/tiltaksgjennomforing/api',
        proxy(process.env.APIGW_URL, {
            proxyReqPathResolver: (req) => {
                return req.originalUrl.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api');
            },
            proxyReqOptDecorator: async (options, req) => {
                const accessToken = process.env.INTERN_INGRESS
                    ? await onbehalfof.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req)
                    : await tokenx.getTokenExchangeAccessToken(tokenxClient, req);
                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        })
    );
};

module.exports = { setup };
