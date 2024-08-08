import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import asyncHandler from 'express-async-handler';
import { Express } from 'express';

export function setup(app: Express) {
    app.use('/dekoratoren/api/auth', (_, res): void => {
        res.json({ authenticated: true, name: '' });
    });

    app.use(
        '/dekoratoren/env',
        asyncHandler(async (_, res) => {
            const response = await axios.get(
                `${process.env.DECORATOR_EXTERNAL_URL}/env?context=arbeidsgiver&feedback=false`,
            );
            res.json({
                ...response.data,
                API_INNLOGGINGSLINJE_URL: '/dekoratoren/api',
                APP_URL: '/dekoratoren',
                LOGOUT_URL: '/logout',
            });
        }),
    );

    app.use('/dekoratoren', createProxyMiddleware({ target: 'https://www.nav.no/dekoratoren', changeOrigin: true }));
}
