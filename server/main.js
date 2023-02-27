import { startLabs } from './labs';
import express from 'express';
import helmet from 'helmet';
import session from './session';
import bodyParser from 'body-parser';
import tokenx from './auth/tokenx';
import routes from './routes';
import idporten from './auth/idporten';
import logger from './logger';

const cors = require('cors');

async function startNormal(server) {
    try {
        server.use(bodyParser.json());

        session.setup(server);

        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // setup sane defaults for CORS and HTTP headers
        // server.use(helmet());
        server.use(
            cors({
                allowedHeaders: ['sessionId', 'Content-Type'],
                exposedHeaders: ['sessionId'],
                origin: '*',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                preflightContinue: false,
            })
        );

        const tokenxAuthClient = await tokenx.client();
        const idportenAuthClient = await idporten.client();

        // setup routes
        server.use('/', routes.setup(tokenxAuthClient, idportenAuthClient));

        const port = 3000;
        server.listen(port, () => logger.info(`Listening on port ${port}`));
    } catch (error) {
        logger.error('Error during start-up', error);
    }
}

if (process.env.NAIS_CLUSTER_NAME === 'labs-gcp') {
    startLabs(express()).catch((err) => logger.info(err));
} else {
    startNormal(express()).catch((err) => logger.info(err));
}
