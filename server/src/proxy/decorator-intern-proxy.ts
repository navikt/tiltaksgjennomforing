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
            changeOrigin: true,
            selfHandleResponse: true,
            on: {
                proxyRes: responseInterceptor(async (responseBuffer) => {
                    console.log(responseBuffer.toString('utf8'));
                    const data = JSON.parse(responseBuffer.toString('utf8'));
                    console.log('proxyRes', data);
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
