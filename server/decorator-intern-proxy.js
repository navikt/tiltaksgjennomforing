const axios = require('axios');
const proxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');

const onbehalfof = require('./azure');
const asyncHandler = require('express-async-handler');

const setup = (app, azureClient, azureTokenEndpoint) => {

    app.use(
        '/modiacontextholder/api/decorator',
        proxy(process.env.APIGW_URL, {
            proxyReqPathResolver: (req) => {
                return req.originalUrl.replace('/modiacontextholder/api/decorator', '/tiltaksgjennomforing-api/innlogget-bruker');
            },
            proxyReqOptDecorator: async (options, req) => {
                const accessToken = await onbehalfof.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req)
                options.headers.Authorization = `Bearer ${accessToken}`;
                let cookies = options.headers['cookie'];
                cookies = 'innlogget-part=VEILEDER; ' + cookies;
                options.headers['cookie'] = cookies;
                return options;
            },
            userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
                data = JSON.parse(proxyResData.toString('utf8'));
                return JSON.stringify({ ...data, ident: data.identifikator || '' });
              }
        })
    );

    app.use(
        '/internarbeidsflatedecorator', (req, res) => {
            res.redirect(process.env.DECORATOR_INTERNAL + req.originalUrl);
        }
    );
};

module.exports = { setup };
