import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import asyncHandler from 'express-async-handler';
import { Express } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const setup = (app: Express): void => {
    app.use(
        '/dekoratoren/api/auth',
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>,
        ): void => {
            res.json({ authenticated: true, name: '' });
        },
    );

    app.use(
        '/dekoratoren/env',
        asyncHandler(
            async (
                req: Request<{}, any, any, ParsedQs, Record<string, any>>,
                res: Response<any, Record<string, any>, number>,
            ) => {
                const response = await axios.get(
                    `${process.env.DECORATOR_EXTERNAL_URL}/env?context=arbeidsgiver&feedback=false`,
                );
                res.json({
                    ...response.data,
                    API_INNLOGGINGSLINJE_URL: '/dekoratoren/api',
                    APP_URL: '/dekoratoren',
                    LOGOUT_URL: '/logout',
                });
            },
        ),
    );

    app.use('/dekoratoren', createProxyMiddleware({ target: 'https://www.nav.no/dekoratoren', changeOrigin: true }));
};
export default { setup };
