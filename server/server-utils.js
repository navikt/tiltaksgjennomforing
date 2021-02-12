const fs = require('fs-extra');
const fetch = require('node-fetch');
const jsdom = require('jsdom');
const NodeCache = require('node-cache');
const server = require('../server');
const template = require('./template');

// Cache init
const prop = 'innerHTML';
const mainCacheKey = 'tiltak-withMenu';
const backupCacheKey = 'tiltak-withMenuBackup';
const mainCache = new NodeCache({ stdTTL: 100, checkperiod: 10 });
const backupCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const { JSDOM } = jsdom;
const url = process.env.DECORATOR_EXTERNAL_URL || template.externalMenuUri;

const readfile = (injectHtml, menu = {}) => {
    fs.readFile(__dirname + '/../build/index.html', 'utf8', function(err, html) {
        if (!err) {
            const { document } = new JSDOM(html).window;
            Object.keys(menu).length !== 0 ? injectHtml(document, menu) : injectHtml(document);
        } else {
            checkBackupCache();
        }
    });
};

const injectExternalMenu = (document, menu) => {
    template.htmlExternal.forEach(element => {
        document.getElementById(element.inject)[prop] = menu.getElementById(element.from)[prop];
    });
    setCache(`<!DOCTYPE html>${document.documentElement.outerHTML}`);
};

const injectInternalMenu = document => {
    template.htmlInternal.forEach(element => {
        document.getElementById(element.inject)[prop] = element.from;
    });
    setCache(`<!DOCTYPE html>${document.documentElement.outerHTML}`);
};

const setCache = output => {
    mainCache.set(mainCacheKey, output, 100);
    backupCache.set(backupCacheKey, output, 0);
    server.serveAppWithMenu(output);
};

const getMenu = () => {
    fetch(url, { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            const { document } = new JSDOM(data).window;
            readfile(injectExternalMenu, document);
        })
        .catch(err => {
            console.warn('failed to fetch decorator. cause: ', err);
            checkBackupCache();
        });
};

const getMenuAndServeApp = callback => {
    mainCache.get(mainCacheKey, (err, response) => {
        if (!err && response !== undefined) {
            server.serveAppWithMenu(response);
        } else {
            callback();
        }
    });
};

const checkBackupCache = () => {
    backupCache.get(backupCacheKey, (err, response) => {
        if (!err && response !== undefined) {
            mainCache.set(mainCacheKey, response, 10000);
            serveAppWithMenu(response);
        } else {
            server.serveAppWithOutMenu();
        }
    });
};

module.exports.getMenu = getMenu;
module.exports.readfile = readfile;
module.exports.injectInternalMenu = injectInternalMenu;
module.exports.getMenuAndServeApp = getMenuAndServeApp;
