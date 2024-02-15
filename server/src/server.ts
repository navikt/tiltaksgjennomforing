import { Request, Response } from 'express-serve-static-core';
import path from 'path';
import express, { Express } from 'express';
import helmet from 'helmet';
import { ParsedQs } from 'qs';
import { buildCspHeader } from "@navikt/nav-dekoratoren-moduler/ssr";

import appMedModiaDekoratoren from './dekorator/appMedModiaDekoratoren';
import appMedNavDekoratoren from './dekorator/appMedNavDekoratoren';
import loginProvider from './login/loginProvider';
import setupPath, { BASEPATH, STATIC_PATHS } from './paths/setupPath';
import { getEnv } from './paths/miljo';

const node: Express = express();
const indexPath = path.resolve(__dirname, '../dist', 'index.html');

async function startServer(): Promise<void> {
    setupPath.initializePath(node);
    setStaticPath();

    await loginProvider.setupOauth2Clients(node);

    console.log('ferdig med oauth client setup.');

    if (process.env.ENABLE_EXTERNAL_MENU) {
        await startMedNavDekoratoren();
    } else if (process.env.ENABLE_INTERNAL_MENU) {
        await startMedModiaDekoratoren();
    } else {
        await startLabs();
    }

    const csp = await buildCspHeader({}, { env: getEnv() });

    const port = process.env.PORT || 3000;
    node.disable('x-powered-by');
    node.use(helmet({ contentSecurityPolicy: false }));
    node.use((_, res, next) => {
        res.setHeader("Content-Security-Policy", csp);
        next();
    });
    node.listen(port, () => console.log('server listening on port', port));
}

async function startMedNavDekoratoren(): Promise<void> {
    node.get(
        ['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'],
        (req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) =>
            appMedNavDekoratoren.getNavdekoratoren(indexPath, res)
    );
}

async function startMedModiaDekoratoren(): Promise<void> {
    node.get(
        ['/*', '/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'],
        (req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) =>
            appMedModiaDekoratoren.getModiaDekoratoren(indexPath, res)
    );
}

async function startLabs(): Promise<void> {
    node.get(
        ['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'],
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ) => {
            res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
        }
    );
}

function setStaticPath(): void {
    node.use(express.static(BASEPATH), express.static(path.resolve(__dirname, '../dist')));
    STATIC_PATHS.forEach((staticpath: string): Express => {
        return node.use(
            BASEPATH.concat(staticpath),
            express.static(path.resolve(__dirname, '../dist', '.'.concat(staticpath)))
        );
    });
}

startServer()
    .then(() => console.log('server started successfully'))
    .catch((err) => console.error('server failed to start, with error: ', err));
