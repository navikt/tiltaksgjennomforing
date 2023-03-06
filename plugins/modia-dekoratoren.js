const modiaDekoratoren = (enablemenu = false) => {
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

function getHtmlWebpackPlugin(plugins) {
    return plugins.find((plugin) => {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            return plugin;
        }
    });
}

function addElements(plugin) {
    plugin.options['styles'] =
        '<link rel="stylesheet" href="https://navikt.github.io/internarbeidsflatedecorator/v2.1/static/css/main.css">';
    plugin.options['scripts'] =
        '<script src="https://navikt.github.io/internarbeidsflatedecorator/v2.1/static/js/head.v2.min.js"></script>';
}

module.exports = modiaDekoratoren;
