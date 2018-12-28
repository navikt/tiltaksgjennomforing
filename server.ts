// @ts-ignore
import * as express from 'express';
// @ts-ignore
import * as helmet from 'helmet';
import * as path from 'path';

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

const server = express();

// tslint:disable-next-line
const proxy = require('http-proxy-middleware');

// security
server.disable('x-powered-by');
server.use(helmet());

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY,
    LOGIN_URL: process.env.LOGIN_URL,
    LOGOUT_URL: process.env.LOGOUT_URL,
    PROXY_API_KEY: process.env.API_PROXY_API_APIKEY,
};

console.log('Relevante miljøvariable: ', envProperties);

// health checks
server.get(
    '/tiltaksgjennomforing/internal/isAlive',
    (req: express.Request, res: express.Response) => res.sendStatus(HTTP_OK)
);
server.get(
    '/tiltaksgjennomforing/internal/isReady',
    (req: express.Request, res: express.Response) => res.sendStatus(HTTP_OK)
);

server.get(
    '/tiltaksgjennomforing/login',
    (req: express.Request, res: express.Response) => {
        if (envProperties.LOGIN_URL) {
            res.redirect(envProperties.LOGIN_URL);
        } else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    }
);

server.get(
    '/tiltaksgjennomforing/logout',
    (req: express.Request, res: express.Response) => {
        if (envProperties.LOGOUT_URL) {
            res.redirect(envProperties.LOGOUT_URL);
        } else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    }
);

server.use(
    '/tiltaksgjennomforing/api',
    proxy({
        target: envProperties.API_GATEWAY,
        changeOrigin: true,
        xfwd: true,
        pathRewrite: {
            '^/tiltaksgjennomforing/api': '/',
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
