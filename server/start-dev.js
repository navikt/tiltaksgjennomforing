const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack/webpack.config.dev');
const configureDevServer = require('./webpack/start-development.config');
const getDecorator = require('./decorator');

require('dotenv').config();

getDecorator().then((decoratorData) => {
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(
        compiler,
        configureDevServer(decoratorData)
    );

    server.listen(3000, '127.0.0.1', () =>
        console.log('Started server on http://localhost:3000')
    );
});
