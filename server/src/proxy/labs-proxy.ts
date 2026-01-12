import { Express, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { notifikasjonsRespons } from '../mock/notifikasjon-bruker-api';

export const setup = (app: Express) => {
    const apiUrl = 'http://tiltaksgjennomforing-api-labs';

    app.get('/tiltaksgjennomforing/fakelogin/aad', async (req, res) => {
        try {
            const navIdent = req.headers['navident'] || 'Z123456';
            const url = `https://tiltak-fakelogin.ekstern.dev.nav.no/token?iss=aad&aud=fake-aad&NAVident=${navIdent}`;
            const response = await fetch(url);
            const data = await response.text();
            res.cookie('fake-aad-idtoken', data);
            res.redirect('/tiltaksgjennomforing');
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });

    app.get('/tiltaksgjennomforing/fakelogin/tokenx', async (req, res) => {
        try {
            const subject = req.headers['fnr'] || '23090170716';
            const url = `https://tiltak-fakelogin.ekstern.dev.nav.no/token?iss=tokenx&aud=fake-tokenx&pid=${subject}&acr=Level4`;
            const response = await fetch(url);
            const data = await response.text();
            res.cookie('fake-tokenx-idtoken', data);
            res.redirect('/tiltaksgjennomforing');
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });

    app.get('/tiltaksgjennomforing/fakelogout', (_, res) => {
        res.clearCookie('fake-tokenx-idtoken');
        res.clearCookie('fake-aad-idtoken');
        res.redirect('/tiltaksgjennomforing');
    });

    app.use('/tiltaksgjennomforing/notifikasjon-bruker-api', (req, res, next: NextFunction) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(notifikasjonsRespons()));
    });

    app.use(
        '/tiltaksgjennomforing/stillingstitler',
        createProxyMiddleware({
            target: 'http://tiltak-stillingstitler',
            changeOrigin: true,
            proxyTimeout: 10000,
        }),
    );

    app.use(
        '/tiltaksgjennomforing/api/kodeverk',
        createProxyMiddleware({
            target: `${apiUrl}/tiltaksgjennomforing-api/kodeverk`,
            ignorePath: true,
            changeOrigin: true,
            proxyTimeout: 2000,
        }),
    );

    app.use(
        '/tiltaksgjennomforing/api',
        (req, res, next) => {
            if (!req.headers.cookie) {
                res.status(401).send();
                return;
            }

            const cookies = req.headers.cookie.split(';');
            const cookieWithFakeToken = cookies.filter((c) => c.includes('fake'));

            if (cookieWithFakeToken.length === 0) {
                res.status(401).send();
                return;
            }

            next();
        },
        (req, _, next) => {
            const cookies = req.headers.cookie?.split(';');
            const cookieWithFakeToken = cookies?.filter((cookie: string) => cookie.includes('fake'));
            if (cookieWithFakeToken) {
                const accessToken = cookieWithFakeToken[0].split('=')[1];
                req.headers.Authorization = `Bearer ${accessToken}`;
            }
            next();
        },
        createProxyMiddleware({
            target: `${apiUrl}/tiltaksgjennomforing-api`,
            changeOrigin: true,
        }),
    );
};
