import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
const asyncHandler = require('express-async-handler');

const setup = (app) => {
    app.use('/dekoratoren/api/auth', (req, res) => {
        res.json({ authenticated: true, name: '' });
    });

    app.use(
        '/dekoratoren/env',
        asyncHandler(async (req, res) => {
            const response = await axios.get(
                `${process.env.DECORATOR_EXTERNAL_URL}/env?context=arbeidsgiver&feedback=false`
            );
            res.json({
                ...response.data,
                API_INNLOGGINGSLINJE_URL: '/dekoratoren/api',
                APP_URL: '/dekoratoren',
                LOGOUT_URL: '/logout',
            });
        })
    );

    app.use('/dekoratoren', createProxyMiddleware({ target: 'https://www.nav.no', changeOrigin: true }));
};

export default { setup };
