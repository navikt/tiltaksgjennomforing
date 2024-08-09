import { Express, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { requestOboToken } from '../auth';

export const setup = (app: Express): void => {
    app.use('/tiltaksgjennomforing/notifikasjon-bruker-api', (req, res, next: NextFunction) => {
        if (!req.headers['authorization']) {
            res.status(401).send();
        } else {
            next();
        }
    });

    app.use(
        '/tiltaksgjennomforing/notifikasjon-bruker-api',
        async (req, _, next) => {
            const accessToken = await requestOboToken(process.env.NOTIFIKASJON_AUDIENCE, req);
            req.headers.authorization = `Bearer ${accessToken}`;
            next();
        },
        createProxyMiddleware({
            target: `${process.env.NOTIFIKASJON_URL}/api/graphql`,
        }),
    );
};
