import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';

import { MODIACONTEXTHOLDER_API_SCOPE } from '../config';
import { requestOboToken } from '../auth';

export function setup(app: Express) {
    app.use(
        '/modiacontextholder',
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
            target: 'http://modiacontextholder.personoversikt/modiacontextholder',
            followRedirects: false,
            changeOrigin: true,
        }),
    );
}
