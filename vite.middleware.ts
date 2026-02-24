import axios from 'axios';
import { ViteDevServer } from 'vite';

import { notifikasjonsRespons } from './server/src/mock/notifikasjon-bruker-api';

const envProperties = {
    APIGW_URL: process.env.APIGW_URL || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
    LOGIN_URL: process.env.LOGIN_URL || '/tiltaksgjennomforing/fakelogin/aad',
    LOGOUT_URL: process.env.LOGOUT_URL || '/tiltaksgjennomforing/fakelogout?domain=localhost',
    STILLINGSTITLER_URL: process.env.STILLINGSTITLER_URL || 'https://tiltak-stillingstitler.intern.dev.nav.no',
};

export default () => ({
    name: 'configure-server',
    configureServer(server: ViteDevServer) {
        const { middlewares } = server;

        server.middlewares.use('/tiltaksgjennomforing/innloggingskilder', (_, res) => {
            const innloggingskilder = [
                {
                    tittel: 'Som deltaker',
                    part: 'DELTAKER',
                    url: '/tiltaksgjennomforing/fakelogin/tokenx',
                },
                {
                    tittel: 'Som mentor',
                    part: 'MENTOR',
                    url: '/tiltaksgjennomforing/fakelogin/tokenx',
                },
                {
                    tittel: 'Som arbeidsgiver',
                    part: 'ARBEIDSGIVER',
                    url: '/tiltaksgjennomforing/fakelogin/tokenx',
                },
                {
                    tittel: 'Som veileder',
                    part: 'VEILEDER',
                    url: '/tiltaksgjennomforing/fakelogin/aad',
                },
                {
                    tittel: 'Som beslutter',
                    part: 'BESLUTTER',
                    url: '/tiltaksgjennomforing/fakelogin/aad',
                },
            ];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(innloggingskilder));
        });

        middlewares.use('/tiltaksgjennomforing/logout', async (_, res) => {
            res.writeHead(302, { Location: envProperties.LOGOUT_URL as string });
            res.end();
        });

        middlewares.use('/tiltaksgjennomforing/fakelogin/tokenx', async (req, res) => {
            const subject = req.headers['fnr'] || '23090170716';
            const url = `https://tiltak-fakelogin.ekstern.dev.nav.no/token?iss=tokenx&aud=fake-tokenx&pid=${subject}&acr=Level4`;
            const response = await axios.get(url);
            res.setHeader('set-cookie', `fake-tokenx-idtoken=${response.data};path=/`);
            res.writeHead(302, { Location: '/tiltaksgjennomforing' });
            res.end();
        });

        middlewares.use('/tiltaksgjennomforing/fakelogin/aad', async (req, res) => {
            const navIdent = req.headers['navident'] || 'Z123456';
            const url = `https://tiltak-fakelogin.ekstern.dev.nav.no/token?iss=aad&aud=fake-aad&NAVident=${navIdent}`;
            const response = await axios.get(url);

            res.setHeader('set-cookie', `fake-aad-idtoken=${response.data};path=/`);
            res.writeHead(302, { Location: '/tiltaksgjennomforing' });
            res.end();
        });

        middlewares.use('/tiltaksgjennomforing/brukavInternflate', async (_, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(process.env.ENABLE_INTERNAL_MENU === 'true'));
        });

        middlewares.use('/tiltaksgjennomforing/fakelogout', async (_, res) => {
            res.setHeader('set-cookie', [
                'fake-tokenx-idtoken=; max-age=0; path=/',
                'fake-aad-idtoken=; max-age=0; path=/',
            ]);
            res.writeHead(302, { Location: '/tiltaksgjennomforing' });
            res.end();
        });

        middlewares.use('/tiltaksgjennomforing/skal-backupmeny-brukes', async (_, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify(
                    process.env.ENABLE_EXTERNAL_MENU !== 'true' && process.env.ENABLE_INTERNAL_MENU !== 'true',
                ),
            );
        });

        middlewares.use('/tiltaksgjennomforing/notifikasjon-bruker-api', async (_, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(notifikasjonsRespons()));
        });
    },
});
