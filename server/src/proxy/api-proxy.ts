import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { requestOboToken } from '../auth';

export function tokenxSetup(app: Express) {
    console.log('api-proxy setup for tokenx');
    setup(app, process.env.API_AUDIENCE);
}

export function azureSetup(app: Express) {
    console.log('api-proxy setup for azure');
    setup(app, process.env.TILTAK_PROXY_API_SCOPE);
}

export function setup(app: Express, audience: string) {
    app.use('/tiltaksgjennomforing/api/internal', (_, res) => {
        res.status(401).send();
    });

    app.use(
        '/tiltaksgjennomforing/stillingstitler',
        createProxyMiddleware({
            changeOrigin: true,
            target: process.env.STILLINGSTITLER_URL,
            proxyTimeout: 10000,
        }),
    );

    app.use(
        '/tiltaksgjennomforing/api',
        (req, res, next) => {
            console.log('apiProxy /tiltaksgjennomforing/api');
            if (!req.headers.authorization) {
                res.status(401).send();
            } else {
                next();
            }
        },
        async (req, _, next) => {
            const accessToken = await requestOboToken(audience, req);
            req.headers.authorization = `Bearer ${accessToken}`;
            next();
        },
        createProxyMiddleware({
            target: `${process.env.APIGW_URL}/tiltaksgjennomforing-api`,
        }),
    );
}
