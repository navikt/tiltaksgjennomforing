import axios from 'axios';
import axiosRetry from 'axios-retry';
import useSWR from 'swr';

import {
    Aktsomhet,
    ApiError,
    AutentiseringError,
    AvtaleVersjon,
    FeilkodeError,
    IkkeFunnetError,
    IkkeTilgangError,
} from '@/types';
import { Enhet } from '@/types/enhet';
import { SIDE_FOER_INNLOGGING } from '@/RedirectEtterLogin';
import { basename } from '@/Router';

const api = axios.create({
    baseURL: '/tiltaksgjennomforing/api',
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.setItem(
                SIDE_FOER_INNLOGGING,
                window.location.pathname.replace(basename, '') + window.location.search,
            );
            throw new AutentiseringError('Er ikke logget inn.');
        }
        if (error.response?.status === 403) {
            throw new IkkeTilgangError('Bruker har ikke tilgang til ressursen.');
        }
        if (error.response?.status === 400 && error.response?.headers.feilkode) {
            throw new FeilkodeError(error.response?.headers.feilkode);
        }
        if (error.response?.status === 404) {
            throw new IkkeFunnetError('Fant ikke ressursen.');
        }
        throw new ApiError('Feil ved kontakt mot baksystem.');
    },
);

axiosRetry(api, { retries: 3 });

const axiosFetcher = (url: string) => api.get(url).then((res) => res.data);

const swrConfig = {
    fetcher: axiosFetcher,
    suspense: true,
};

export const useHentVersjoner = (avtaleId?: string) => {
    const { data } = useSWR<AvtaleVersjon[]>(avtaleId ? `/avtaler/${avtaleId}/versjoner` : undefined, swrConfig);
    return data || [];
};

export const useHentEnhet = (enhetsnummer?: string) => {
    return useSWR<Enhet>(enhetsnummer ? `/enheter/${enhetsnummer}` : undefined, {
        ...swrConfig,
        suspense: false,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    });
};

export const useAvtaleKreverAktsomhet = (avtaleId?: string) => {
    return useSWR<Aktsomhet>(avtaleId ? `/avtaler/${avtaleId}/krever-aktsomhet` : undefined, {
        ...swrConfig,
        revalidateOnFocus: false,
    });
};
