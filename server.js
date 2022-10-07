'use strict';
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const serverUtils = require('./server/server-utils');
const setupProxy = require('./src/setupProxy');
const server = express();

const decoratorInternProxy = require('./server/decorator-intern-proxy');
const decoratorEksternProxy = require('./server/decorator-ekstern-proxy');
const apiProxy = require('./server/api-proxy');
const lokalProxy = require('./server/lokalproxy');
const notifikasjonProxy = require('./server/notifikasjoner-proxy');
const tokenx = require('./server/tokenx');
const azure = require('./server/azure');
// security
server.disable('x-powered-by');
server.use(helmet());

setupProxy(server);

const basePath = '/tiltaksgjennomforing';
const staticPaths = ['/static', '/index.css', '/asset-manifest.json'];

// health checks
server.get('/tiltaksgjennomforing/internal/isAlive', (req, res) => res.sendStatus(200));
server.get('/tiltaksgjennomforing/internal/isReady', (req, res) => res.sendStatus(200));

const setStaticPath = (slufix) =>
    server.use(basePath.concat(slufix), express.static(path.join(__dirname, 'build'.concat(slufix))));

const startServer = async () => {
    const port = process.env.PORT || 3000;
    server.listen(port, () => console.log('server listening on port', port));
};

const setupOauth2Clients = async (server) => {
    if (process.env.NAIS_CLUSTER_NAME === 'dev-gcp' || process.env.NAIS_CLUSTER_NAME === 'prod-gcp') {
        if (process.env.INTERN_INGRESS) {
            console.log('Intern ingress, setup azure klient');
            const azureClient = await azure.client();
            const azureTokenEndpoint = await azure.azureTokenEndpoint();
            apiProxy.setup(server, null, azureClient, azureTokenEndpoint);
            decoratorInternProxy.setup(server, azureClient, azureTokenEndpoint);
            console.log('Satt opp api-proxy med azure obh');
        } else {
            console.log('Ekstern ingress, setup tokenx klient');
            const tokenxAuthClient = await tokenx.client();
            apiProxy.setup(server, tokenxAuthClient, null, null);
            notifikasjonProxy.setup(server, tokenxAuthClient);
            decoratorEksternProxy.setup(server);
            console.log('Satt opp api-proxy med tokenx');
        }
    } else {
        lokalProxy.setup(server);
    }
};

const serveAppWithMenu = async (app) => {
    staticPaths.forEach((staticpath) => {
        setStaticPath(staticpath);
    });
    await setupOauth2Clients(server);
    server.get(['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'], (req, res) => {
        res.send(app);
    });
    startServer();
};

const serveAppWithOutMenu = async () => {
    setStaticPath('');
    await setupOauth2Clients(server);
    server.get('/tiltaksgjennomforing/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
    startServer();
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
    serveAppWithOutMenu();
}

module.exports.serveAppWithOutMenu = serveAppWithOutMenu;
module.exports.serveAppWithMenu = serveAppWithMenu;
