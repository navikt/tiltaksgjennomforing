const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;
const url =
    'https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true';
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
            const plugin = getHtmlWebpackPlugin(webpackConfig.plugins);
            if (plugin) {
                enablemenu ? getMenu(plugin) : addElements(plugin, false);
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
    request({ method: 'GET', uri: url }, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
            const { document } = new JSDOM(body).window;
            addElements(plugin, true, document);
        } else {
            enablebackup(plugin);
        }
    });
};

module.exports = decoratorHtmlWebpackPlugin;
