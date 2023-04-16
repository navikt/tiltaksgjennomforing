const jsdom = require('jsdom');

const idList = ['styles', 'scripts', 'header-withmenu', 'footer-withmenu'];

const { JSDOM } = jsdom;
const url = 'https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level4&language=nb';

function getHtmlWebpackPlugin(plugins) {
    return plugins.find((plugin) => {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            return plugin;
        }
        return undefined;
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

const replaceWithUppercase = (str) =>
    str.replace(/[^a-z][a-z]/gi, (word) => word.toUpperCase().replace(/[^a-z]/gi, ''));

function addElement(indexHTML, document = {}) {
    idList.forEach((id) => {
        if (indexHTML.options[replaceWithUppercase(id)]) {
            indexHTML.options[replaceWithUppercase(id)] = document.getElementById(id)['innerHTML'];
        }
    });
}

module.exports = navDekoratoren;
