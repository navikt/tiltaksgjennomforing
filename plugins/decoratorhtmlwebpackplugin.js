const jsdom = require('jsdom');
const fetch = require('node-fetch');

const { JSDOM } = jsdom;
const url = 'https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level4&language=nb';
const htmlinsert = [
    { inject: 'styles', from: 'styles' },
    { inject: 'scripts', from: 'scripts' },
    { inject: 'headerWithmenu', from: 'header-withmenu' },
    { inject: 'footerWithmenu', from: 'footer-withmenu' },
    { inject: 'megamenuResources', from: 'megamenu-resources' },
];

const decoratorHtmlWebpackPlugin = (enablemenu = false) => {
    return {
        overrideWebpackConfig: ({ webpackConfig }) => {
            if (enablemenu) {
                const plugin = getHtmlWebpackPlugin(webpackConfig.plugins);
                if (plugin) {
                    getMenu(plugin);
                }
            }
            return webpackConfig;
        },
    };
};

const addElements = (plugin, documentisfetched, document = {}) => {
    htmlinsert.forEach(element => {
        plugin.options[element.inject] = documentisfetched ? getElement(document, element.from) : '';
    });
};

const getHtmlWebpackPlugin = plugins => {
    return plugins.find(plugin => {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            return plugin;
        }
    });
};

const enablebackup = plugin => {
    console.log('failed to fetch decorator from:' + url);
    addElements(plugin, false);
};

const getElement = (document, id) => {
    const prop = 'innerHTML';
    return document.getElementById(id)[prop];
};

const getMenu = plugin => {
    fetch(url, { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            const { document } = new JSDOM(data).window;
            addElements(plugin, true, document);
        })
        .catch(err => {
            console.warn('failed to fetch decorator. cause: ', err);
            enablebackup(plugin);
        });
};

module.exports = decoratorHtmlWebpackPlugin;
