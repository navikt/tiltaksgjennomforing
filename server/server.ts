'use strict';

import { Request, Response } from 'express-serve-static-core';
import path from 'path';
import express, { Express } from 'express';
import helmet from 'helmet';
import { ParsedQs } from 'qs';
import appMedNavDekoratoren from './dekorator/appMedNavDekoratoren';
import appMedModiaDekoratoren from './dekorator/appMedModiaDekoratoren';
import loginProvider from './login/loginProvider';
import setupPath, { BASEPATH, STATIC_PATHS } from './paths/setupPath';
import labsProxy from './proxy/labs-proxy';
import bodyParser from 'body-parser';

const node: Express = express();

// security
node.disable('x-powered-by');
node.use(helmet());

async function startServer(): Promise<void> {
    setupPath.initializePath(node);
    setStaticPath();

    node.use(bodyParser.json());
    node.use(express.json());
    node.use(express.urlencoded({ extended: true }));

    // await loginProvider.setupOauth2Clients(server);

    labsProxy.setup(node);

    if (process.env.ENABLE_EXTERNAL_MENU) {
        await startMedNavDekoratoren();
    } else if (process.env.ENABLE_INTERNAL_MENU) {
        await startMedModiaDekoratoren();
    } else {
        await startLabs();
    }

    const port = process.env.PORT || 3000;
    node.listen(port, () => console.log('server listening on port', port));
}

async function startMedNavDekoratoren(): Promise<void> {
    node.get(
        ['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'],
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ) => {
            res.send(appMedNavDekoratoren.getNavdekoratoren(path.resolve(__dirname, 'index.html')));
        }
    );
    await startServer();
}

async function startMedModiaDekoratoren(): Promise<void> {
    // const app = await appMedModiaDekoratoren.getModiaDekoratoren();
    node.get(
        ['/*', '/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'],
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ) => {
            //  res.send(appMedModiaDekoratoren.getModiaDekoratoren());
            res.status(200);
            res.sendFile(path.resolve(__dirname, 'index.html'));
        }
    );
}

async function startLabs(): Promise<void> {
    node.get(
        ['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'],
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ) => {
            res.sendFile(path.resolve(__dirname, 'index.html'));
        }
    );
}

function setStaticPath(): void {
    node.use(
        express.static(BASEPATH, {
            etag: false,
        }),
        express.static(path.resolve(__dirname))
    );

    node.use(
        express.static(BASEPATH, {
            etag: false,
        }),
        express.static(path.resolve(__dirname))
    );
    STATIC_PATHS.forEach((staticpath: string): Express => {
        return node.use(BASEPATH.concat(staticpath), express.static(path.resolve(__dirname, '.'.concat(staticpath))));
    });
}

startServer()
    .then(() => console.log('server started successfully'))
    .catch((err) => console.error('server failed to start, with error: ', err));
