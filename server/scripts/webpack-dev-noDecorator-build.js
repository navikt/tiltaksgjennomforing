const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/start-development.config');

require('dotenv').config();

webpackConfig.entry = {
    reload: 'webpack-dev-server/client?http://localhost:3000/',
    ...webpackConfig.entry
};

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(
    compiler,
    configureDevServer({
        NAV_SCRIPTS: '',
        NAV_STYLES: '',
        NAV_HEADING: '',
        NAV_FOOTER: '',
        NAV_MENU_RESOURCES: ''
    })
);

server.listen(3000, '0.0.0.0', () =>
    console.log('Started development server on http://localhost:3000')
);