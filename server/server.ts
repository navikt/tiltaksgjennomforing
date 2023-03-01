'use strict';

import { Request, Response } from 'express-serve-static-core';
import path from 'path';
import express, { Express } from 'express';
import helmet from 'helmet';
import serverUtils from './dekorator/getMenu';
import decoratorInternProxy from './proxy/decorator-intern-proxy';
import decoratorEksternProxy from './proxy/decorator-ekstern-proxy';
import apiProxy from './proxy/api-proxy';
import lokalProxy from './lokal/lokalproxy';
import notifikasjonProxy from './proxy/notifikasjoner-proxy';
import tokenx from './prod/tokenx';
import { ParsedQs } from 'qs';
import azure from './prod/azure';
import { getMiljø, Miljø } from './common/miljø';
import { BaseClient } from 'openid-client';

const server: Express = express();
const miljo: Miljø = getMiljø();

// security
server.disable('x-powered-by');
server.use(helmet());

const BASEPATH: string = '/tiltaksgjennomforing';
const STATIC_PATHS: string[] = ['/static', '/index.css', '/asset-manifest.json'];

// health checks
server.get(
    '/tiltaksgjennomforing/internal/isAlive',
    (
        req: Request<{}, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>, number>
    ): Response<any, Record<string, any>, number> => res.sendStatus(200)
);
server.get(
    '/tiltaksgjennomforing/internal/isReady',
    (
        req: Request<{}, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>, number>
    ): Response<any, Record<string, any>, number> => res.sendStatus(200)
);

const setStaticPath = (sulfix: string): Express =>
    server.use(BASEPATH.concat(sulfix), express.static(path.join(__dirname, 'build'.concat(sulfix))));

async function startServer(): Promise<void> {
    const port = process.env.PORT || 3000;
    server.listen(port, () => console.log('server listening on port', port));
}

const setupOauth2Clients = async (): Promise<void> => {
    if (miljo === Miljø.DEV_GCP || miljo === Miljø.PROD_GCP) {
        if (process.env.INTERN_INGRESS) {
            await initLoginAndProxySettingsForInternalEnvironment();
        } else {
            await initLoginAndProxySettingsForExternalEnvironment();
        }
    } else {
        lokalProxy.setup(server);
    }
};

async function initLoginAndProxySettingsForInternalEnvironment(): Promise<void> {
    const client: BaseClient = await azure.client();
    const tokenEndpoint = await azure.azureTokenEndpoint();
    apiProxy.azureSetup(server, client, tokenEndpoint);
    decoratorInternProxy.setup(server, client, tokenEndpoint);

    console.log('Satt opp api-proxy med azure obh');
}

async function initLoginAndProxySettingsForExternalEnvironment(): Promise<void> {
    const tokenxAuthClient = await tokenx.client();
    apiProxy.tokenxSetup(server, tokenxAuthClient);
    notifikasjonProxy.setup(server, tokenxAuthClient);
    decoratorEksternProxy.setup(server);

    console.log('Satt opp api-proxy med tokenx');
}

const startWithMenu = async (app: any): Promise<void> => {
    STATIC_PATHS.forEach((staticpath: string): void => {
        setStaticPath(staticpath);
    });
    await setupOauth2Clients();
    server.get(
        ['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'],
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ) => {
            res.send(app);
        }
    );
    await startServer();
};

const startWithOutMenu = async (): Promise<void> => {
    setStaticPath('');
    await setupOauth2Clients();
    server.get(
        '/tiltaksgjennomforing/*',
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ) => {
            res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
        }
    );
    await startServer();
};

// HAR MILJOØVARIABLER BASERT PÅ (PROD|DEV)-SBS / (PROD|DEV)-FSS
if (process.env.ENABLE_EXTERNAL_MENU) {
    serverUtils.getMenuAndServeApp(() => {
        serverUtils.getMenu();
    });
} else if (process.env.ENABLE_INTERNAL_MENU) {
    serverUtils.getMenuAndServeApp(() => {
        serverUtils.readfile(serverUtils.injectInternalMenu);
    });
} else {
    startWithOutMenu();
}
export default { startWithMenu, startWithOutMenu };
