import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { Express } from 'express';

import { requestOboToken } from '../auth';

export function setup(app: Express) {
    app.use(
        '/modiacontextholder/api/decorator',
        async (req, _, next) => {
            const accessToken = await requestOboToken(process.env.MODIACONTEXTHOLDER_API_SCOPE, req);
            req.headers.authorization = `Bearer ${accessToken}`;
            req.headers.cookie = 'innlogget-part=VEILEDER; ' + req.headers.cookie;
            console.log('header', req.headers);
            next();
        },
        createProxyMiddleware({
            target: `${process.env.APIGW_URL}/tiltaksgjennomforing-api/innlogget-bruker`,
            selfHandleResponse: true,
            changeOrigin: true,
            on: {
                proxyReq: (proxyReq, req) => {
                    console.log(proxyReq.host, req.url, req.headers);
                },
                proxyRes: responseInterceptor(async (responseBuffer) => {
                    const data = JSON.parse(responseBuffer.toString('utf8'));
                    return JSON.stringify({ ...data, ident: data.identifikator || '' });
                }),
            },
        }),
    );

    app.use(
        '/modiacontextholder/redirect',
        async (req, _, next) => {
            const accessToken = await requestOboToken(process.env.MODIACONTEXTHOLDER_API_SCOPE, req);
            req.headers.authorization = `Bearer ${accessToken}`;
            next();
        },
        createProxyMiddleware({
            target: 'http://modiacontextholder.personoversikt/modiacontextholder/redirect',
            followRedirects: false,
            changeOrigin: true,
        }),
    );

    app.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect(process.env.DECORATOR_INTERNAL + req.originalUrl);
    });
}
