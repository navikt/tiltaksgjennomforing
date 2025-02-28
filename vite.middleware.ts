import { ViteDevServer } from 'vite';
import axios from 'axios';

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

        middlewares.use('/tiltaksgjennomforing/chat', async (req, res) => {
            const redirectUrl = process.env.ARBEIDSGIVER_DIALOG_URL;
            const searchParams = new URLSearchParams(req.url);
            const orgNr = searchParams.get('organisasjonsnummer');
            const avtaleNr = searchParams.get('avtalenummer');

            res.writeHead(302, {
                Location: `${redirectUrl}/?organisasjonsnummer=${orgNr}&avtalenummer=${avtaleNr}`,
            });
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
            const notifikasjonsRespons = {
                data: {
                    notifikasjoner: {
                        feilAltinn: false,
                        feilDigiSyfo: false,
                        notifikasjoner: [
                            {
                                __typename: 'Beskjed',
                                brukerKlikk: {
                                    id: '16120101181-69b474d1-0274-4928-aa76-87128f1fa462',
                                    klikketPaa: false,
                                    __typename: 'BrukerKlikk',
                                },
                                virksomhet: {
                                    navn: 'MAURA OG KOLBU REGNSKAP',
                                    virksomhetsnummer: '910825518',
                                    __typename: 'Virksomhet',
                                },
                                lenke: 'https://tiltaksgjennomforing.ekstern.dev.nav.no/tiltaksgjennomforing/avtale/1d7978b5-1ecd-4f53-a031-816cff844ca7?part=ARBEIDSGIVER',
                                tekst: 'Avtale om Midlertidig lønnstilskudd godkjent.',
                                merkelapp: 'Lønnstilskudd',
                                opprettetTidspunkt: '2025-02-27T09:17:16.159985Z',
                                sorteringTidspunkt: '2025-02-27T09:17:16.159985Z',
                                id: '69b474d1-0274-4928-aa76-87128f1fa462',
                                sak: {
                                    tittel: 'Avtale om Midlertidig lønnstilskudd for Usymmetrisk Skogmarihand',
                                    __typename: 'SakMetadata',
                                },
                            },
                            {
                                __typename: 'Oppgave',
                                brukerKlikk: {
                                    id: '16120101181-c85c94b6-ba0f-4879-8984-021e2bdc2c33',
                                    klikketPaa: false,
                                    __typename: 'BrukerKlikk',
                                },
                                virksomhet: {
                                    navn: 'MAURA OG KOLBU REGNSKAP',
                                    virksomhetsnummer: '910825518',
                                    __typename: 'Virksomhet',
                                },
                                lenke: 'https://tiltaksgjennomforing.ekstern.dev.nav.no/tiltaksgjennomforing/avtale/1d7978b5-1ecd-4f53-a031-816cff844ca7?part=ARBEIDSGIVER',
                                tekst: 'Ny avtale om Midlertidig lønnstilskudd opprettet. Åpne avtalen og fyll ut innholdet.',
                                merkelapp: 'Lønnstilskudd',
                                opprettetTidspunkt: '2025-02-27T08:16:22.667501Z',
                                sorteringTidspunkt: '2025-02-27T08:16:22.667501Z',
                                paaminnelseTidspunkt: null,
                                utgaattTidspunkt: null,
                                utfoertTidspunkt: '2025-02-27T08:18:03.072167Z',
                                tilstand: 'UTFOERT',
                                id: 'c85c94b6-ba0f-4879-8984-021e2bdc2c33',
                                frist: null,
                                sak: {
                                    tittel: 'Avtale om Midlertidig lønnstilskudd for Usymmetrisk Skogmarihand',
                                    __typename: 'SakMetadata',
                                },
                            },
                        ],
                        __typename: 'NotifikasjonerResultat',
                    },
                },
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(notifikasjonsRespons));
        });
    },
});
