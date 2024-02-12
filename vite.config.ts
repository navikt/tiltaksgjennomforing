import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

import middlewarePlugin from './vite.middleware';

const GIT_COMMIT_HASH = execSync('git log -n 1 --pretty=format:\'%h\'').toString();

export default defineConfig({
    base: '/tiltaksgjennomforing',
    build: {
        sourcemap: true,
    },
    define: {
        GIT_COMMIT_HASH: JSON.stringify(GIT_COMMIT_HASH),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },   
    plugins: [react(), svgr(), middlewarePlugin()],
    server: {
        open: true,
        port: 3000,
        proxy: {
            '/tiltaksgjennomforing/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (p) => p.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api'),
                proxyTimeout: 10000,
                configure: (proxy) => {
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        const cookies = req.headers?.cookie?.split(';');
                        const cookieWithFakeToken = cookies?.filter(c => c.includes('fake'));
                        if (!cookieWithFakeToken?.length) {
                            res.writeHead(401);
                            res.end();
                            return;
                        }
                        const accessToken = cookieWithFakeToken[0].split('=')[1];
                        proxyReq.setHeader('Authorization', `Bearer ${accessToken}`);
                    });
                },
            },
            '/tiltaksgjennomforing/stillingstitler': {
                target: process.env.STILLINGSTITLER_URL || 'https://tiltak-stillingstitler.intern.dev.nav.no',
                changeOrigin: true,
                rewrite: (p) => p.replace('/tiltaksgjennomforing/stillingstitler', '/'),
                proxyTimeout: 10000,
            },
        },
    },
});
