'use strict';
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const serverUtils = require('./server/server-utils');
const setupProxy = require('./src/setupProxy');
const server = express();
// security
server.disable('x-powered-by');
server.use(helmet());
setupProxy(server);

const basePath = '/tiltaksgjennomforing';
const staticPaths = ['/static', '/index.css', '/asset-manifest.json'];

if (process.env.REACT_APP_ON_HEROKU === 'true') {
    server.get('/', (req, res) => res.redirect(req.baseUrl + '/tiltaksgjennomforing'));
}

// health checks
server.get('/tiltaksgjennomforing/internal/isAlive', (req, res) => res.sendStatus(200));
server.get('/tiltaksgjennomforing/internal/isReady', (req, res) => res.sendStatus(200));

const setStaticPath = slufix =>
    server.use(basePath.concat(slufix), express.static(path.join(__dirname, 'build'.concat(slufix))));

const serveAppWithMenu = app => {
    staticPaths.forEach(path => {
        setStaticPath(path);
    });
    server.get(['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'], (req, res) => {
        res.send(app);
    });
    setServerPort();
};

const setServerPort = () => {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log('server listening on port', port);
    });
};

const serveAppWithOutMenu = () => {
    setStaticPath('');
    server.get('/tiltaksgjennomforing/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
    setServerPort();
};

// HAR MILJOØVARIABLER BASERT PÅ (PROD|DEV)-SBS / (PROD|DEV)-FSS
process.env.ENABLE_EXTERNAL_MENU
    ? serverUtils.getMenuAndServeApp(() => {
          serverUtils.getMenu();
      })
    : process.env.ENABLE_INTERNAL_MENU
    ? serverUtils.getMenuAndServeApp(() => {
          serverUtils.readfile(serverUtils.injectInternalMenu);
      })
    : serveAppWithOutMenu();

module.exports.serveAppWithOutMenu = serveAppWithOutMenu;
module.exports.serveAppWithMenu = serveAppWithMenu;
