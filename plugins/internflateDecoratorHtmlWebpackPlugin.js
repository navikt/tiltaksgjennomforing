const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;
const scripts =
    '<script src="https://navikt.github.io/internarbeidsflatedecorator/v2/static/js/head.v2.min.js"></script>';
const styles =
    '<link rel="stylesheet" href="https://navikt.github.io/internarbeidsflatedecorator/v2/static/css/main.css">';

const htmlinsert = [
    { inject: 'styles', from: styles },
    { inject: 'scripts', from: scripts },
];

const internflateDecoratorHtmlWebpackPlugin = (enablemenu = false) => {
    return {
        overrideWebpackConfig: ({ webpackConfig }) => {
            if (enablemenu) {
                const plugin = getHtmlWebpackPlugin(webpackConfig.plugins);
                if (plugin) {
                    addElements(plugin);
                }
            }
            return webpackConfig;
        },
    };
};

const addElements = plugin => {
    htmlinsert.forEach(element => {
        plugin.options[element.inject] = element.from;
    });
};

const getHtmlWebpackPlugin = plugins => {
    return plugins.find(plugin => {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            return plugin;
        }
    });
};

module.exports = internflateDecoratorHtmlWebpackPlugin;
