import { Express, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { NOTIFIKASJON_AUDIENCE, NOTIFIKASJON_URL } from '../config';
import { requestOboToken } from '../auth';

export const setup = (app: Express): void => {
    app.use('/tiltaksgjennomforing/notifikasjon-bruker-api', (req, res, next: NextFunction) => {
        if (!req.headers.authorization) {
            res.status(401).send();
        } else {
            next();
        }
    });

    app.use(
        '/tiltaksgjennomforing/notifikasjon-bruker-api',
        async (req, res, next) => {
            try {
                const accessToken = await requestOboToken(NOTIFIKASJON_AUDIENCE, req);
                req.headers.authorization = `Bearer ${accessToken}`;
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        },
        createProxyMiddleware({
            target: `${NOTIFIKASJON_URL}/api/graphql`,
            changeOrigin: true,
            ignorePath: true,
        }),
    );
};
