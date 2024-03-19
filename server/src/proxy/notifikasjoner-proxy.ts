import { Express, NextFunction } from 'express';
import proxy from 'express-http-proxy';
import { requestOboToken } from '../auth';
import { Request } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { RequestOptions } from 'http';

const setup = (app: Express): void => {
    app.use('/tiltaksgjennomforing/notifikasjon-bruker-api', (req, res, next: NextFunction) => {
        if (!req.headers['authorization']) {
            res.status(401).send();
        } else {
            next();
        }
    });

    app.use(
        '/tiltaksgjennomforing/notifikasjon-bruker-api',
        proxy(process.env.NOTIFIKASJON_URL as string, {
            proxyReqPathResolver: (): string => {
                return '/api/graphql';
            },
            proxyReqOptDecorator: async (
                options: RequestOptions,
                req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            ) => {
                if (options.headers) {
                    const accessToken = await requestOboToken(process.env.NOTIFIKASJON_AUDIENCE!, req);
                    options.headers.Authorization = `Bearer ${accessToken}`;
                }
                return options;
            },
        }),
    );
};
export default { setup };
