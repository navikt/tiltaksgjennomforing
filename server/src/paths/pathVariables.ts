import { LOGIN_URL } from '../config';

export interface PathVariables {
    tittel: string;
    part: string;
    url: string;
}

export const labsInnloggingskilder: PathVariables[] = [
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

export const innloggingskilderInternBrukerFlate: PathVariables[] = [
    {
        tittel: 'Som veileder',
        part: 'VEILEDER',
        url: LOGIN_URL,
    },
    {
        tittel: 'Som beslutter',
        part: 'BESLUTTER',
        url: LOGIN_URL,
    },
];

export const innloggingskilderEksternBrukerFlate: PathVariables[] = [
    {
        tittel: 'Som deltaker',
        part: 'DELTAKER',
        url: LOGIN_URL,
    },
    {
        tittel: 'Som mentor',
        part: 'MENTOR',
        url: LOGIN_URL,
    },
    {
        tittel: 'Som arbeidsgiver',
        part: 'ARBEIDSGIVER',
        url: LOGIN_URL,
    },
];
