import cookieParser from 'cookie-parser';
import express, { Express, Handler } from 'express';
import helmet from 'helmet';
import path from 'path';
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr';

import { ENV, PORT, ENABLE_EXTERNAL_MENU, ENABLE_INTERNAL_MENU } from './config';
import * as appMedModiaDekoratoren from './dekorator/appMedModiaDekoratoren';
import * as appMedNavDekoratoren from './dekorator/appMedNavDekoratoren';
import { initializePath, BASEPATH, STATIC_PATHS } from './paths/setupPath';
import { setupRoutes } from './routes';

const indexPath = path.resolve(__dirname, '../client', 'index.html');

const eksternCspMiddleware = (): Handler => {
    let csp: string;

    return async (_, res, next) => {
        if (!csp) {
            csp = await buildCspHeader({}, { env: ENV });
        }
        res.setHeader('Content-Security-Policy', csp);
        next();
    };
};

const node: Express = express();
node.use(cookieParser());
node.disable('x-powered-by');

if (ENABLE_EXTERNAL_MENU) {
    node.use(helmet({ contentSecurityPolicy: false }));
    node.use(eksternCspMiddleware());
} else {
    node.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'default-src': ["'self'", 'wss://*.nav.no', '*.nav.no'],
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

    if (ENABLE_EXTERNAL_MENU) {
        await startMedNavDekoratoren();
    } else if (ENABLE_INTERNAL_MENU) {
        await startMedModiaDekoratoren();
    } else {
        await startLabs();
    }

    node.listen(PORT, () => console.log('server listening on port', PORT));
}

async function startMedNavDekoratoren() {
    node.get(['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'], (req, res) =>
        appMedNavDekoratoren.getNavdekoratoren(indexPath, req, res),
    );
}

async function startMedModiaDekoratoren() {
    node.get(['/*', '/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'], (req, res) =>
        appMedModiaDekoratoren.getModiaDekoratoren(indexPath, req, res),
    );
}

async function startLabs() {
    node.get(['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'], (_, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
    });
}

function setStaticPath(): void {
    node.use(express.static(BASEPATH), express.static(path.resolve(__dirname, '../client')));
    STATIC_PATHS.forEach((staticpath: string) =>
        node.use(
            BASEPATH.concat(staticpath),
            express.static(path.resolve(__dirname, '../client', '.'.concat(staticpath))),
        ),
    );
}

startServer()
    .then(() => console.log('server started successfully'))
    .catch((err) => console.error('server failed to start, with error: ', err));
