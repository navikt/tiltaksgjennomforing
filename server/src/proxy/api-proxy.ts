import { Express } from 'express';
import proxy from 'express-http-proxy';
import { Request } from 'express-serve-static-core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { BaseClient } from 'openid-client';
import { ParsedQs } from 'qs';
import azure from '../login/azure';
import tokenx from '../login/tokenx';
import { whitelistPaths } from '../paths/whitelistPaths';
const tokenxSetup = (app: Express, tokenxClient: BaseClient): void => {
    console.log('api-proxy setup for tokenx');

    setupPath(app);

    app.use(
        '/tiltaksgjennomforing/api',
        proxy(process.env.APIGW_URL as string, {
            proxyReqPathResolver: (req: Request<{}, any, any, ParsedQs, Record<string, any>>) => {
                return req.originalUrl.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api');
            },
            proxyReqOptDecorator: async (options: any, req: Request<{}, any, any, ParsedQs, Record<string, any>>) => {
                const accessToken = await tokenx.getTokenExchangeAccessToken(
                    tokenxClient,
                    process.env.API_AUDIENCE,
                    req,
                );
                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        }),
    );
};

const azureSetup = (app: Express, azureClient: BaseClient, azureTokenEndpoint: any): void => {
    console.log('api-proxy setup for azure');

    setupPath(app);

    app.use(
        '/tiltaksgjennomforing/api',
        proxy(process.env.APIGW_URL as string, {
            proxyReqPathResolver: (req: Request<{}, any, any, ParsedQs, Record<string, any>>) => {
                return req.originalUrl.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api');
            },
            proxyReqOptDecorator: async (options: any, req: Request<{}, any, any, ParsedQs, Record<string, any>>) => {
                const accessToken = await azure.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req);
                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        }),
    );
};

function setupPath(app: Express) {
    app.use('/tiltaksgjennomforing/api/internal', (req, res) => {
        res.status(401).send();
    });

    app.use('/tiltaksgjennomforing/api', (req, res, next) => {
        console.log('apiProxy /tiltaksgjennomforing/api');
        if (whitelistPaths.includes(req.path)) {
            next();
        } else {
            if (!req.headers['authorization']) {
                res.status(401).send();
            } else {
                next();
            }
        }
    });

    app.use(
        '/tiltaksgjennomforing/stillingstitler',
        createProxyMiddleware({
            changeOrigin: true,
            pathRewrite: { '^/tiltaksgjennomforing/stillingstitler': '/' },
            target: process.env.STILLINGSTITLER_URL,
            proxyTimeout: 10000,
        }),
    );
}

export default { tokenxSetup, azureSetup };
