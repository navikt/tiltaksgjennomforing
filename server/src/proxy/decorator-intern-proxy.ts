import proxy from 'express-http-proxy';
import { Express, Response } from 'express';
import { Request } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { IncomingMessage, RequestOptions } from 'http';
import { requestOboToken } from '../auth';

const setup = (app: Express) => {
    app.use(
        '/modiacontextholder/api/decorator',
        proxy(process.env.APIGW_URL as string, {
            proxyReqPathResolver: (req: Request<{}, any, any, ParsedQs, Record<string, any>>) => {
                return req.originalUrl.replace(
                    '/modiacontextholder/api/decorator',
                    '/tiltaksgjennomforing-api/innlogget-bruker',
                );
            },
            proxyReqOptDecorator: async (
                options: RequestOptions,
                req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            ) => {
                const accessToken = await requestOboToken(process.env.API_SCOPE!, req);
                if (options?.headers) {
                    options.headers.Authorization = `Bearer ${accessToken}`;
                    let cookies = options.headers.cookie;
                    cookies = 'innlogget-part=VEILEDER; ' + cookies;
                    options.headers.cookie = cookies;
                }
                return options;
            },
            userResDecorator: (proxyRes: IncomingMessage, proxyResData: any, userReq: Request, userRes: Response) => {
                const data = JSON.parse(proxyResData.toString('utf8'));
                return JSON.stringify({ ...data, ident: data.identifikator || '' });
            },
        }),
    );

    app.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect(process.env.DECORATOR_INTERNAL + req.originalUrl);
    });
};
export default { setup };
