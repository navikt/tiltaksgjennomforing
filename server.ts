// @ts-ignore
import * as express from 'express';
// @ts-ignore
import * as helmet from 'helmet';
import * as path from 'path';

const server = express();

// tslint:disable-next-line
const proxy = require('express-http-proxy');

// security
server.disable('x-powered-by');
server.use(helmet());

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY,
    LOGIN_URL: process.env.LOGINSERVICE_URL,
    LOGOUT_URL: process.env.LOGOUTSERVICE_URL,
    PROXY_API_KEY: process.env.API_PROXY_API_APIKEY,
};

const backendHost = (): string => {
    if (envProperties.API_GATEWAY) {
        const hostAndPath = envProperties.API_GATEWAY.split('://').pop();
        if (!hostAndPath) {
            throw Error(
                'Error: Kunne ikke hente host fra envProperties.API_GATEWAY (' +
                    envProperties.API_GATEWAY +
                    ')'
            );
        }
        const host = hostAndPath.split('/').shift();
        if (!host) {
            throw Error('Error: Kunne ikke hente host fra path');
        }
        return host;
    }
    throw Error('Error: process.env.API_GATEWAY mangler');
};

const gatewayPrefix = (): string => {
    if (envProperties.API_GATEWAY) {
        const pathUnchecked = envProperties.API_GATEWAY.split(
            backendHost()
        ).pop();
        const pathFinal = pathUnchecked && pathUnchecked.replace(/\//g, ''); // replace all / with ''
        return pathFinal || '';
    }
    throw new Error('Error: error getting gateway prefix');
};

// health checks
server.get(
    '/tiltaksgjennomforing/internal/isAlive',
    (req: express.Request, res: express.Response) => res.sendStatus(200)
);
server.get(
    '/tiltaksgjennomforing/internal/isReady',
    (req: express.Request, res: express.Response) => res.sendStatus(200)
);

// proxy til backend
console.log('proxy host: ' + backendHost());
console.log('proxy prefix: ' + gatewayPrefix());

server.use(
    '/tiltaksgjennomforing/api',
    proxy(backendHost(), {
        https: true,
        /*proxyReqOptDecorator: (proxyReqOpts: any, srcReq: any) => ({
            ...proxyReqOpts,
            cookie: srcReq.headers.cookie,
            headers: {
                ...srcReq.headers,
                ...proxyReqOpts.headers,
                //'x-nav-apiKey': envProperties.PROXY_API_KEY
            },
        }),*/
        proxyReqPathResolver: (req: any) => {
            const convertedPath = `/${gatewayPrefix()}/${req.originalUrl
                .split('/tiltaksgjennomforing/api/')
                .pop()}`;
            console.log(convertedPath);
            return convertedPath;
        },
    })
);

server.use(
    '/tiltaksgjennomforing',
    express.static(path.join(__dirname, 'build'))
);

server.use(
    '/tiltaksgjennomforing',
    (req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    }
);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server listening on port', port);
});
