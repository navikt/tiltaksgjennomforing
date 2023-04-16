const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const url = 'https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level4&language=nb';

function getHtmlWebpackPlugin(plugins) {
    return plugins.find((plugin) => {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            return plugin;
        }
    });
}

function navDekoratoren(enablemenu = false) {
    return {
        overrideWebpackConfig: ({ webpackConfig }) => {
            if (enablemenu) {
                const htmlWebpackPlugin = getHtmlWebpackPlugin(webpackConfig.plugins);
                if (htmlWebpackPlugin) {
                    getMenu(htmlWebpackPlugin);
                }
            }
            return webpackConfig;
        },
    };
}

function getMenu(indexHTML) {
    fetch(url, { method: 'GET' })
        .then((response) => response.text())
        .then((data) => {
            const { document } = new JSDOM(data).window;
            if (document) {
                addElement(indexHTML, document);
            }
        })
        .catch((err) => {
            console.warn('failed to fetch decorator. cause: ', err);
        });
}

function addElement(indexHTML, document = {}) {
    indexHTML.options['styles'] = document.getElementById('styles')['innerHTML'];
    indexHTML.options['scripts'] = document.getElementById('scripts')['innerHTML'];
    indexHTML.options['headerWithmenu'] = document.getElementById('header-withmenu')['innerHTML'];
    indexHTML.options['footerWithmenu'] = document.getElementById('footer-withmenu')['innerHTML'];
}

module.exports = navDekoratoren;
