const proxy = require('express-http-proxy');
const tokenx = require('./tokenx');
const onbehalfof = require('./azure').default;

const setup = (app, tokenxClient, azureClient, azureTokenEndpoint) => {
    app.use('/tiltaksgjennomforing/api', (req, res, next) => {
        if (!req.headers['authorization']) {
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

                const accessToken =
                    internIngress ?
                        await tokenx.getTokenExchangeAccessToken(tokenxClient, req) :
                        await onbehalfof.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req);

                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        })
    );

};

module.exports = { setup };
