import fs from 'fs-extra';
import fetch from 'node-fetch';
import jsdom from 'jsdom';
import NodeCache from 'node-cache';
import server from '../server';
import template from './template';

// Cache init
const prop = 'innerHTML';
const mainCacheKey = 'tiltak-withMenu';
const backupCacheKey = 'tiltak-withMenuBackup';
const mainCache: NodeCache = new NodeCache({ stdTTL: 100, checkperiod: 10 });
const backupCache: NodeCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const { JSDOM } = jsdom;
const url = process.env.DECORATOR_EXTERNAL_URL || template.externalMenuUri;

const readfile = (injectHtml, menu = {}) => {
    fs.readFile(__dirname + '/../build/index.html', 'utf8', (err, html) => {
        if (!err) {
            const { document } = new JSDOM(html).window;
            Object.keys(menu).length !== 0 ? injectHtml(document, menu) : injectHtml(document);
        } else {
            checkBackupCache();
        }
    });
};

const setExternalMenu = (document, menu) => {
    template.htmlKeyValueMap.forEach((domElement) => {
        document.getElementById(domElement.key)[prop] = menu.getElementById(domElement.value)[prop];
    });
    setCache(`<!DOCTYPE html>${document.documentElement.outerHTML}`);
};

const setInternalMenu = (document) => {
    template.htmlInternalKeyValueMap.forEach((element) => {
        document.getElementById(element.key)[prop] = element.value;
    });
    setCache(`<!DOCTYPE html>${document.documentElement.outerHTML}`);
};

const setCache = (output) => {
    mainCache.set(mainCacheKey, output, 100);
    backupCache.set(backupCacheKey, output, 0);
    server.startWithOutMenu(output);
};

const getMenu = () => {
    fetch(url, { method: 'GET' })
        .then((response) => response.text())
        .then((data) => {
            const { document } = new JSDOM(data).window;
            readfile(setExternalMenu, document);
        })
        .catch((err) => {
            console.warn('failed to fetch decorator. cause: ', err);
            checkBackupCache();
        });
};

const getMenuAndServeApp = (callback: () => void) => {
    const cacheContent = backupCache.get(mainCacheKey);
    if (cacheContent) {
        server.startWithMenu(cacheContent);
    }

    mainCache.get(mainCacheKey, (err, response) => {
        if (!err && response !== undefined) {
            server.serveAppWithMenu(response);
        } else {
            callback();
        }
    });
};

const checkBackupCache = () => {
    const cacheContent = backupCache.get(backupCacheKey);
    if (cacheContent) {
        mainCache.set(mainCacheKey, cacheContent, 10000);
        server.startWithMenu(cacheContent);
    }
    server.startWithOutMenu();
};

export default { getMenu, readfile, setInternalMenu, getMenuAndServeApp };
