import { Express } from 'express';
import proxy from 'express-http-proxy';
import { Request } from 'express-serve-static-core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ParsedQs } from 'qs';
import { requestOboToken } from '../auth';

const publicPaths = ['/kodeverk', '/kodeverk/statuser', '/kodeverk/tiltakstyper'];

const tokenxSetup = (app: Express): void => {
    console.log('api-proxy setup for tokenx');
    setup(app, process.env.API_AUDIENCE!);
};

const azureSetup = (app: Express): void => {
    console.log('api-proxy setup for azure');
    setup(app, process.env.TILTAK_PROXY_API_SCOPE);
};

const setup = (app: Express, audience: string) => {
    app.use('/tiltaksgjennomforing/api/internal', (req, res) => {
        res.status(401).send();
    });

    app.use('/tiltaksgjennomforing/api', (req, res, next) => {
        console.log('apiProxy /tiltaksgjennomforing/api');
        console.log('path:', req.path, 'url:', req.url);
        if (!req.headers['authorization'] && !publicPaths.includes(req.path)) {
            res.status(401).send();
        } else {
            next();
        }
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
        proxy(process.env.APIGW_URL as string, {
            proxyReqPathResolver: (req: Request<{}, any, any, ParsedQs, Record<string, any>>) => {
                return req.originalUrl.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api');
            },
            proxyReqOptDecorator: async (options: any, req: Request<{}, any, any, ParsedQs, Record<string, any>>) => {
                const accessToken = await requestOboToken(audience, req);
                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        }),
    );
};

export default { tokenxSetup, azureSetup };
