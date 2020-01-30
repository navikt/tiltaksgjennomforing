const path = require('path');
const express = require('express');

const server = express();

server.get('/', (req, res) => res.redirect(req.baseUrl + '/tiltaksgjennomforing'));

server.use('/tiltaksgjennomforing', express.static(path.join(__dirname, 'build')));

server.get('/tiltaksgjennomforing/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server listening on port', port);
});
