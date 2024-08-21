import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';

import { DECORATOR_EXTERNAL_URL } from '../config';

export function setup(app: Express) {
    app.use('/dekoratoren/api/auth', (_, res): void => {
        res.json({ authenticated: true, name: '' });
    });

    app.use('/dekoratoren/env', async (_, res) => {
        try {
            const response = await axios.get(`${DECORATOR_EXTERNAL_URL}/env?context=arbeidsgiver&feedback=false`);
            res.json({
                ...response.data,
                API_INNLOGGINGSLINJE_URL: '/dekoratoren/api',
                APP_URL: '/dekoratoren',
                LOGOUT_URL: '/logout',
            });
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });

    app.use('/dekoratoren', createProxyMiddleware({ target: 'https://www.nav.no/dekoratoren', changeOrigin: true }));
}
