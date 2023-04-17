import proxy from 'express-http-proxy';
import tokenx from '../login/tokenx';
import azure from '../login/azure';
import { Express } from 'express';
import { BaseClient } from 'openid-client';
import { Request } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { createProxyMiddleware } from 'http-proxy-middleware';

const setHeaders = (proxyReqOpts: any, req: any, accessToken: any) => {
    proxyReqOpts.headers.Authorization = `Bearer ${accessToken}`;

    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['Content-Length'] = Buffer.byteLength(bodyData);
        req.write(bodyData);
    }

    return proxyReqOpts;
};

const tokenxSetup = (app: Express, tokenxClient: BaseClient): void => {
    console.log('api-proxy setup for tokenx');

    setupPath(app);

    app.use(
        '/tiltaksgjennomforing/api',
        proxy(process.env.APIGW_URL as string, {
            proxyReqPathResolver: (req: Request<{}, any, any, ParsedQs, Record<string, any>>) => {
                return req.originalUrl.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api');
            },
            proxyReqOptDecorator: async (proxyReqOpts: any, req: any) => {
                const accessToken = await tokenx.getTokenExchangeAccessToken(
                    tokenxClient,
                    process.env.API_AUDIENCE,
                    req
                );

                return setHeaders(proxyReqOpts, req, accessToken);
            },
        })
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
            proxyReqOptDecorator: async (proxyReqOpts: any, req: any) => {
                const accessToken = await azure.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req);

                return setHeaders(proxyReqOpts, req, accessToken);
            },
        })
    );
};

function setupPath(app: Express) {
    app.use('/tiltaksgjennomforing/api/internal', (req, res) => {
        res.status(401).send();
    });

    app.use('/tiltaksgjennomforing/api', (req, res, next) => {
        console.log('apiProxy /tiltaksgjennomforing/api');
        if (!req.headers['authorization']) {
            res.status(401).send();
        } else {
            next();
        }
    });

    app.use(
        '/tiltaksgjennomforing/stillingstitler',
        createProxyMiddleware({
            changeOrigin: true,
            pathRewrite: { '^/tiltaksgjennomforing/stillingstitler': '/' },
            target: process.env.STILLINGSTITLER_URL,
            proxyTimeout: 10000,
        })
    );
}

export default { tokenxSetup, azureSetup };
