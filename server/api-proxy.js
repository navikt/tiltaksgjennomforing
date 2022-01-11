const proxy = require('express-http-proxy');
const tokenx = require('./tokenx')

const setup = (router, tokenxClient) => {
    router.use(
        '/tiltaksgjennomforing/api',
        proxy("https://tiltak-proxy.dev-fss-pub.nais.io", {
            proxyReqPathResolver: (req) => {
                return req.originalUrl;
            },
            proxyReqOptDecorator: async (options, req) => {
                const accessToken = await tokenx.getTokenExchangeAccessToken(tokenxClient, req);
                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        })
    );
};

export default { setup };
