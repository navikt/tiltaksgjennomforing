import { EnvProps } from './setupPath';

export interface PathVariables {
    tittel: string;
    part: string;
    url: string;
}

export const lokalOgLabsInnloggingskilder: PathVariables[] = [
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

export const getInnloggingskilderInternBrukerFlate = (props: EnvProps): PathVariables[] => {
    return [
        {
            tittel: 'Som veileder',
            part: 'VEILEDER',
            url: props.LOGIN_URL ?? '',
        },
        {
            tittel: 'Som beslutter',
            part: 'BESLUTTER',
            url: props.LOGIN_URL ?? '',
        },
    ];
};

const getInnloggingskilderEksternBrukerFlate = (props: EnvProps): PathVariables[] => {
    return [
        {
            tittel: 'Som deltaker',
            part: 'DELTAKER',
            url: props.LOGIN_URL ?? '',
        },
        {
            tittel: 'Som mentor',
            part: 'MENTOR',
            url: props.LOGIN_URL ?? '',
        },
        {
            tittel: 'Som arbeidsgiver',
            part: 'ARBEIDSGIVER',
            url: props.LOGIN_URL ?? '',
        },
    ];
};
export default {
    lokalOgLabsInnloggingskilder,
    getInnloggingskilderInternBrukerFlate,
    getInnloggingskilderEksternBrukerFlate,
};
