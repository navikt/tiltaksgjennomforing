const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const helmet = require('helmet');
const buildPath = path.join(__dirname, 'build');
const standardUrlPathway = require('./server/urlPathway');
const getDecorator = require('./server/decorator');
const express = require('express');
const server = express();

server.set('views', buildPath);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

// security
server.disable('x-powered-by');

server.use(helmet());

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
    server.use(standardUrlPathway('/'), express.static(buildPath));

    server.get(standardUrlPathway('/internal/isAlive'), (req, res) =>
        res.sendStatus(200)
    );
    server.get(standardUrlPathway('/internal/isReady'), (req, res) =>
        res.sendStatus(200)
    );

    server.get(standardUrlPathway('/*'), (req, res) => {
        res.send(html);
    });

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
        .then(renderApp, error => {
            console.log('Kunne ikke hente dekorator ', error);
            process.exit(1);
        })
        .then(startServer, error => {
            console.log('Kunne ikke rendre app ', error);
            process.exit(1);
        });
}
