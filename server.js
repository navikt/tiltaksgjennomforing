const path = require('path');
const express = require('express');
const helmet = require('helmet');

const server = express();

// security
server.disable('x-powered-by');
server.use(helmet());

const setupProxy = require('./src/setupProxy');
setupProxy(server);

// health checks
server.get('/tiltaksgjennomforing/internal/isAlive', (req, res) => res.sendStatus(200));
server.get('/tiltaksgjennomforing/internal/isReady', (req, res) => res.sendStatus(200));

server.use('/tiltaksgjennomforing', express.static(path.join(__dirname, 'build')));

server.get('/tiltaksgjennomforing/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server listening on port', port);
});
