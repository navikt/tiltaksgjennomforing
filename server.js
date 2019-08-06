const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const helmet = require('helmet');
const server = express();
const buildPath = path.join(__dirname, 'build');
const standardUrlPathway = require('./server/urlPathway');
const getDecorator = require('./server/decorator');

server.engine('html', mustacheExpress());
server.set('view engine', 'mustache');
server.set('views', buildPath);

// security
server.disable('x-powered-by');

server.use(helmet());

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
server.use(allowCrossDomain);

const setupProxy = require('./src/setupProxy');
setupProxy(server);

// health checks
const renderApp = decoratorFragments =>
    new Promise((resolve, reject) => {
        server.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = html => {
    server.use(
        standardUrlPathway('/'),
        express.static(buildPath, { index: false })
    );

    server.get(standardUrlPathway('/internal/isAlive'), (req, res) =>
        res.sendStatus(200)
    );
    server.get(standardUrlPathway('/internal/isReady'), (req, res) =>
        res.sendStatus(200)
    );

    server.get(
        ['/', standardUrlPathway('/*'), '/informasjonsside/*'],
        (req, res) => {
            res.send(html);
        }
    );

    server.listen(3000, () => {
        console.log('Server listening on port', 3000);
    });
};

noDecorator = () => {
    const noHeaderAndFooterInject = {
        NAV_SCRIPTS: '',
        NAV_STYLES: '',
        NAV_HEADING: '',
        NAV_FOOTER: '',
        NAV_MENU_RESOURCES: '',
    };
    renderApp(noHeaderAndFooterInject).then(startServer, error =>
        console.log('Kunne ikke rendre app ', error)
    );
};

if (process.env.INTERNFLATE === 'true') {
    noDecorator();
} else {
    getDecorator()
        .then(renderApp, error =>
            console.log('Kunne ikke hente dekorator ', error)
        )
        .then(startServer, error =>
            console.log('Kunne ikke rendre app ', error)
        );
}
