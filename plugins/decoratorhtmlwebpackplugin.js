const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;
const url =
    process.env.DECORATOR_EXTERNAL_URL ||
    'https://appres-q1.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true';
const htmlinsert = [
    { inject: 'styles', from: 'styles' },
    { inject: 'scripts', from: 'scripts' },
    { inject: 'headerWithmenu', from: 'header-withmenu' },
    { inject: 'footerWithmenu', from: 'footer-withmenu' },
    { inject: 'megamenuResources', from: 'megamenu-resources' },
];

const decoratorhtmlwebpackplugin = (enablemenu = false, title = '') => {
    return {
        overrideWebpackConfig: ({ webpackConfig }) => {
            const plugin = gethtmlwebpackplugin(webpackConfig.plugins);
            if (plugin) {
                plugin.options.title = title;
                enablemenu ? getmenu(plugin) : addelements(plugin, false);
            }
            return webpackConfig;
        },
    };
};

const addelements = (plugin, documentisfetched, document = {}) => {
    htmlinsert.forEach(element => {
        plugin.options[element.inject] = documentisfetched ? getelement(document, element.from) : '';
    });
};

const gethtmlwebpackplugin = plugins => {
    return plugins.find(plugin => {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            return plugin;
        }
    });
};

const enablebackup = plugin => {
    process.env.ENABLE_EXTERNAL_MENU = 'enable';
    addelements(plugin, false);
};

const getelement = (document, id) => {
    const prop = 'innerHTML';
    return document.getElementById(id)[prop];
};

const getmenu = plugin => {
    request({ method: 'GET', uri: url }, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
            const { document } = new JSDOM(body).window;
            addelements(plugin, true, document);
        } else {
            enablebackup(plugin);
        }
    });
};

module.exports = decoratorhtmlwebpackplugin;
