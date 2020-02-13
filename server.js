'use strict';
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const server = express();
const fs = require('fs');
const request = require('request');
const jsdom = require('jsdom');
const NodeCache = require('node-cache');

// security
server.disable('x-powered-by');
server.use(helmet());

const { JSDOM } = jsdom;
const prop = 'innerHTML';
const url =
    process.env.DECORATOR_EXTERNAL_URL ||
    'https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true';

const htmlinsert = [
    { inject: 'styles', from: 'styles' },
    { inject: 'scripts', from: 'scripts' },
    { inject: 'headerWithmenu', from: 'header-withmenu' },
    { inject: 'footerWithmenu', from: 'footer-withmenu' },
    { inject: 'megamenuResources', from: 'megamenu-resources' },
];

// Cache init
const mainCacheKey = 'tiltak-withMenu';
const backupCacheKey = 'tiltak-withMenuBackup';
const mainCache = new NodeCache({ stdTTL: 10000, checkperiod: 10020 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const setupProxy = require('./src/setupProxy');
setupProxy(server);

// health checks
server.get('/tiltaksgjennomforing/internal/isAlive', (req, res) => res.sendStatus(200));
server.get('/tiltaksgjennomforing/internal/isReady', (req, res) => res.sendStatus(200));

const injectMenuIntoHtml = menu => {
    fs.readFile(__dirname + '/build/index.html', 'utf8', function(err, html) {
        if (!err) {
            const { document } = new JSDOM(html).window;
            htmlinsert.forEach(element => {
                document.getElementById(element.inject)[prop] = menu.getElementById(element.from)[prop];
            });
            const output = document.documentElement.innerHTML;
            mainCache.set(mainCacheKey, output, 10000);
            backupCache.set(backupCacheKey, output, 0);
            serveAppWithMenu(output);
        } else {
            checkBackupCache();
        }
    });
};

const getMenu = () => {
    request({ method: 'GET', uri: url }, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
            const { document } = new JSDOM(body).window;
            injectMenuIntoHtml(document);
        } else {
            checkBackupCache();
        }
    });
};

const serveAppWithMenu = app => {
    server.use('/tiltaksgjennomforing/static', express.static(path.join(__dirname, 'build/static')));
    server.use('/tiltaksgjennomforing/index.css', express.static(path.join(__dirname, 'build/index.css')));
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
    server.use('/tiltaksgjennomforing', express.static(path.join(__dirname, 'build')));
    server.get('/tiltaksgjennomforing/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
    setServerPort();
};

const getMenuAndServeApp = () => {
    mainCache.get(mainCacheKey, (err, response) => {
        if (!err && response !== undefined) {
            serveAppWithMenu(response);
        } else {
            getMenu();
        }
    });
};

const checkBackupCache = () => {
    backupCache.get(backupCacheKey, (err, response) => {
        if (!err && response !== undefined) {
            mainCache.set(mainCacheKey, response, 10000);
            serveAppWithMenu(response);
        } else {
            serveAppWithOutMenu();
        }
    });
};

// HAR MILJOØVARIABLER BASERT PÅ (PROD|DEV)-SBS / (PROD|DEV)-FSS
process.env.ENABLE_EXTERNAL_MENU ? getMenuAndServeApp() : serveAppWithOutMenu();
