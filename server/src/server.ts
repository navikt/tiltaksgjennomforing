import cookieParser from 'cookie-parser';
import express, { Express, Handler } from 'express';
import helmet from 'helmet';
import path from 'path';
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr';

import * as appMedModiaDekoratoren from './dekorator/appMedModiaDekoratoren';
import * as appMedNavDekoratoren from './dekorator/appMedNavDekoratoren';
import { initializePath, BASEPATH, STATIC_PATHS } from './paths/setupPath';
import { getEnv } from './paths/miljo';
import { setupRoutes } from './routes';

const indexPath = path.resolve(__dirname, '../client', 'index.html');

const eksternCspMiddleware = (): Handler => {
    let csp: string;

    return async (_, res, next) => {
        if (!csp) {
            csp = await buildCspHeader({}, { env: getEnv() });
        }
        res.setHeader('Content-Security-Policy', csp);
        next();
    };
};

const node: Express = express();
node.use(cookieParser());
node.disable('x-powered-by');

if (process.env.ENABLE_EXTERNAL_MENU) {
    node.use(helmet({ contentSecurityPolicy: false }));
    node.use(eksternCspMiddleware());
} else {
    node.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'default-src': ["'self'", '*.nav.no'],
                    'script-src': ["'self'", '*.nav.no', '*.adeo.no', "'unsafe-inline'"],
                    'style-src': ["'self'", '*.nav.no', '*.adeo.no', "'unsafe-inline'"],
                    'font-src': ["'self'", '*.nav.no', 'data:'],
                    'img-src': ["'self'", '*.nav.no'],
                },
            },
        }),
    );
}

async function startServer(): Promise<void> {
    initializePath(node);
    setStaticPath();

    setupRoutes(node);

    console.log('ferdig med oauth client setup.');

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
    node.get(['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'], (req, res) =>
        appMedNavDekoratoren.getNavdekoratoren(indexPath, req, res),
    );
}

async function startMedModiaDekoratoren(): Promise<void> {
    node.get(['/*', '/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'], (req, res) =>
        appMedModiaDekoratoren.getModiaDekoratoren(indexPath, req, res),
    );
}

async function startLabs(): Promise<void> {
    node.get(['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'], (_, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
    });
}

function setStaticPath(): void {
    node.use(express.static(BASEPATH), express.static(path.resolve(__dirname, '../client')));
    STATIC_PATHS.forEach((staticpath: string): Express => {
        return node.use(
            BASEPATH.concat(staticpath),
            express.static(path.resolve(__dirname, '../client', '.'.concat(staticpath))),
        );
    });
}

startServer()
    .then(() => console.log('server started successfully'))
    .catch((err) => console.error('server failed to start, with error: ', err));
