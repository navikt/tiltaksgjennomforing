import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { API_AUDIENCE, TILTAK_PROXY_API_SCOPE, STILLINGSTITLER_URL, APIGW_URL } from '../config';
import { requestOboToken } from '../auth';

export function tokenxSetup(app: Express) {
    console.log('api-proxy setup for tokenx');
    setup(app, API_AUDIENCE);
}

export function azureSetup(app: Express) {
    console.log('api-proxy setup for azure');
    setup(app, TILTAK_PROXY_API_SCOPE);
}

export function setup(app: Express, audience: string) {
    app.use(
        '/tiltaksgjennomforing/stillingstitler',
        createProxyMiddleware({
            changeOrigin: true,
            target: STILLINGSTITLER_URL,
            proxyTimeout: 10000,
        }),
    );

    app.use('/tiltaksgjennomforing/api/internal', (_, res) => {
        res.status(401).send();
    });

    app.use(
        '/tiltaksgjennomforing/api/kodeverk',
        createProxyMiddleware({
            target: `${APIGW_URL}/tiltaksgjennomforing-api/kodeverk`,
            ignorePath: true,
            changeOrigin: true,
        }),
    );

    app.use(
        '/tiltaksgjennomforing/api',
        (req, res, next) => {
            console.log('apiProxy /tiltaksgjennomforing/api');
            if (!req.headers.authorization) {
                res.sendStatus(401);
            } else {
                next();
            }
        },
        async (req, res, next) => {
            try {
                const accessToken = await requestOboToken(audience, req);
                req.headers.authorization = `Bearer ${accessToken}`;
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        },
        createProxyMiddleware({
            target: `${APIGW_URL}/tiltaksgjennomforing-api`,
            changeOrigin: true,
        }),
    );
}
