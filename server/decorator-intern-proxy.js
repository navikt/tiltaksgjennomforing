const axios = require('axios');
const proxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');

const onbehalfof = require('./azure');
const asyncHandler = require('express-async-handler');

const setup = (app, azureClient, azureTokenEndpoint) => {
    // app.use(
    //     '/modiacontextholder/api/decorator',
    //     asyncHandler(async (req, res) => {
    //         const accessToken = await onbehalfof.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req);
    //         console.log("Henter innlogget bruker til modia");
    //         const response = await axios.get(`${process.env.APIGW_URL}/tiltaksgjennomforing-api/innlogget-bruker`, {
    //             headers: { ...req.headers, Authorization: `Bearer ${accessToken}` },
    //         });
    //         res.json({ ...response.data, ident: response.data.identifikator || '' });
    //     })
    // );

    app.use(
        '/modiacontextholder/api/decorator',
        proxy(process.env.APIGW_URL, {
            proxyReqPathResolver: (req) => {
                return req.originalUrl.replace('/modiacontextholder/api/decorator', '/tiltaksgjennomforing-api/innlogget-bruker');
            },
            proxyReqOptDecorator: async (options, req) => {
                const accessToken = onbehalfof.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req)
                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        })
    );

    app.use(
        '/internarbeidsflatedecorator', (req, res) => {
            res.redirect(process.env.DECORATOR_INTERNAL + req.originalUrl);
        }
    );
};

module.exports = { setup };
