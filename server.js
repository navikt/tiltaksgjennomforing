'use strict';
const express = require('express');
const setupProxy = require('./src/setupProxy');

const server = express();

server.get('/', (req, res) => res.redirect(req.baseUrl + '/tiltaksgjennomforing'));

// health checks
server.get('/tiltaksgjennomforing/internal/isAlive', (req, res) => res.sendStatus(200));
server.get('/tiltaksgjennomforing/internal/isReady', (req, res) => res.sendStatus(200));

// security
server.disable('x-powered-by');

try {
    const helmet = require.resolve('helmet');
    server.use(helmet());
} catch (error) {
    console.warn('WARN: Helmet er ikke installert. Starter Express uten.');
}

setupProxy(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('server listening on port', port);
});
