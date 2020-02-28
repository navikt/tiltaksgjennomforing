'use strict';
const express = require('express');
const setupProxy = require('./src/setupProxy');
const helmet = require('helmet');

const server = express();

// Middleware for sikkerhet
server.use(helmet());

server.get('/', (req, res) => res.redirect(req.baseUrl + '/tiltaksgjennomforing'));

// health checks
server.get('/tiltaksgjennomforing/internal/isAlive', (req, res) => res.sendStatus(200));
server.get('/tiltaksgjennomforing/internal/isReady', (req, res) => res.sendStatus(200));

setupProxy(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('server listening on port', port);
});
