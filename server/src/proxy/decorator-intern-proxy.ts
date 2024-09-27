import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { Express } from 'express';

import { APIGW_URL, MODIACONTEXTHOLDER_API_SCOPE, DECORATOR_INTERNAL, TILTAK_PROXY_API_SCOPE } from '../config';
import { requestOboToken } from '../auth';

export function setup(app: Express) {
    app.use(
        '/modiacontextholder/api/decorator',
        async (req, res, next) => {
            try {
                const accessToken = await requestOboToken(TILTAK_PROXY_API_SCOPE, req);
                req.headers.authorization = `Bearer ${accessToken}`;
                req.headers.cookie = 'innlogget-part=VEILEDER; ' + req.headers.cookie;
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        },
        createProxyMiddleware({
            target: `${APIGW_URL}/tiltaksgjennomforing-api/innlogget-bruker`,
            ignorePath: true,
            selfHandleResponse: true,
            changeOrigin: true,
            on: {
                proxyRes: responseInterceptor(async (responseBuffer) => {
                    console.log('interceptor', responseBuffer.toString('utf8'));
                    const data = JSON.parse(responseBuffer.toString('utf8'));
                    return JSON.stringify({ ...data, ident: data.identifikator || '' });
                }),
            },
        }),
    );

    app.use(
        '/modiacontextholder/redirect',
        async (req, res, next) => {
            try {
                const accessToken = await requestOboToken(MODIACONTEXTHOLDER_API_SCOPE, req);
                req.headers.authorization = `Bearer ${accessToken}`;
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        },
        createProxyMiddleware({
            target: 'http://modiacontextholder.personoversikt/modiacontextholder/redirect',
            followRedirects: false,
            changeOrigin: true,
        }),
    );

    app.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect(DECORATOR_INTERNAL + req.originalUrl.replace('/internarbeidsflatedecorator', ''));
    });
}
