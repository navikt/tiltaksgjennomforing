'use strict';
const path = require('path');
const fs = require('fs');
const NodeCache = require('node-cache');
const express = require('express');
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const cacheKey = 'tiltak-withMenu';
const cache = new NodeCache();
let menuInjectedSuccessfully = false;

const readIndexFile = async () => {
    try {
        return await fs.promises.readFile(path.join(__dirname, 'build/index.html'), 'utf8');
    } catch (error) {
        console.error('ERROR: Feil ved lesing av index.html', error);
    }
};

const fetchMenu = async () => {
    const url =
        process.env.DECORATOR_EXTERNAL_URL ||
        'https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true';
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        console.error('ERROR: Feil ved fetch av meny fra url: ' + url, error);
    }
};

const injectMenuToIndexDocument = (indexDocument, menuDocument) => {
    const htmlinsert = [
        { inject: 'styles', from: 'styles' },
        { inject: 'scripts', from: 'scripts' },
        { inject: 'headerWithmenu', from: 'header-withmenu' },
        { inject: 'footerWithmenu', from: 'footer-withmenu' },
        { inject: 'megamenuResources', from: 'megamenu-resources' },
    ];
    htmlinsert.forEach(element => {
        indexDocument.getElementById(element.inject).innerHTML = menuDocument.getElementById(element.from).innerHTML;
    });
};

const decoratedIndexHtml = async () => {
    const indexHtml = await readIndexFile();
    const indexDocument = new JSDOM(indexHtml).window.document;

    try {
        const menu = await fetchMenu();
        const menuDocument = new JSDOM(menu).window.document;

        injectMenuToIndexDocument(indexDocument, menuDocument);
        menuInjectedSuccessfully = true;
    } catch (error) {
        console.error('ERROR: Kunne ikke injecte fra meny', error);
        menuInjectedSuccessfully = false;
    }

    return indexDocument.documentElement.innerHTML;
};

module.exports = server => {
    server.get('/tiltaksgjennomforing/skal-backupmeny-brukes', (req, res) => {
        res.send(!menuInjectedSuccessfully);
    });
    server.use('/tiltaksgjennomforing/static', express.static(path.join(__dirname, 'build/static')));
    server.use('/tiltaksgjennomforing/index.css', express.static(path.join(__dirname, 'build/index.css')));

    // Rekkefølgen er viktig. Denne linja må være sist.
    server.get(['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'], async (req, res) => {
        if (process.env.ENABLE_EXTERNAL_MENU === 'true') {
            if (!cache.has(cacheKey)) {
                const indexHtml = await decoratedIndexHtml();
                const TI_MINUTTER = 600;
                const ETT_MINUTT = 60;
                cache.set(cacheKey, indexHtml, menuInjectedSuccessfully ? TI_MINUTTER : ETT_MINUTT);
            }
            res.send(cache.get(cacheKey));
        } else {
            const indexFile = await readIndexFile();
            res.send(indexFile);
        }
    });
};
