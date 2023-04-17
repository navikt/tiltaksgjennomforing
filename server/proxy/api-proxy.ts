import tokenx from '../login/tokenx';
import azure from '../login/azure';
import { Express } from 'express';
import { BaseClient } from 'openid-client';
import { Request } from 'express-serve-static-core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import http from 'http';

export const restream = (proxyReq: http.ClientRequest, req: Request) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};

const tokenxSetup = (app: Express, tokenxClient: BaseClient): void => {
    console.log('api-proxy setup for tokenx');

    setupPath(app);

    app.use(
        '/tiltaksgjennomforing/api',
        createProxyMiddleware({
            onProxyReq: async (proxyReq, req, res) => {
                const accessToken = await tokenx.getTokenExchangeAccessToken(
                    tokenxClient,
                    process.env.API_AUDIENCE,
                    req
                );
                proxyReq.setHeader('Authorization', `Bearer ${accessToken}`);
                restream(proxyReq, req);
            },
            changeOrigin: true,
            pathRewrite: { '/tiltaksgjennomforing/api': '/tiltaksgjennomforing-api' },
            target: process.env.APIGW_URL,
            proxyTimeout: 10000,
        })
    );
};

const azureSetup = (app: Express, azureClient: BaseClient, azureTokenEndpoint: any): void => {
    console.log('api-proxy setup for azure');

    setupPath(app);

    app.use(
        '/tiltaksgjennomforing/api',
        createProxyMiddleware({
            onProxyReq: async (proxyReq, req, res) => {
                const accessToken = await azure.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req);
                proxyReq.setHeader('Authorization', `Bearer ${accessToken}`);
                restream(proxyReq, req);
            },
            changeOrigin: true,
            pathRewrite: { '/tiltaksgjennomforing/api': '/tiltaksgjennomforing-api' },
            target: process.env.APIGW_URL,
            proxyTimeout: 10000,
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
