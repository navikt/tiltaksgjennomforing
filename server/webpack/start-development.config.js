require('dotenv').config();
const mustacheExpress = require('mustache-express');
const setupProxy = require('../../src/setupProxy');
const path = require('path');

const allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', true);
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type,X-XSRF-TOKEN,Location'
    );
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};

const configureDevServer = decoratorFragments => ({
    open: true,

    before: server => {
        server.engine('html', mustacheExpress());
        server.set('views', `${__dirname}/../../build`);
        server.set('view engine', 'mustache');
        server.use(allowCrossDomain);
        //setupProxy(server);
        server.get(/^\/(?!.*build).*$/, (req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });
    },

    contentBase: path.join(__dirname, './../../build'),
    watchContentBase: true,
    quiet: true,
    noInfo: true,
    stats: 'none',
    publicPath: '/build',
});

module.exports = configureDevServer;
