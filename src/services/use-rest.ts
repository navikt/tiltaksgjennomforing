import axios from 'axios';
import axiosRetry from 'axios-retry';
import { SIDE_FOER_INNLOGGING } from '@/RedirectEtterLogin';
import { basename } from '@/paths';
import { ApiError, AutentiseringError, FeilkodeError } from '@/types/errors';
import { AvtaleVersjon } from '@/types/avtale';
import useSWR from 'swr';

const api = axios.create({
    baseURL: '/tiltaksgjennomforing/api',
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            sessionStorage.setItem(
                SIDE_FOER_INNLOGGING,
                window.location.pathname.replace(basename, '') + window.location.search
            );
            throw new AutentiseringError('Er ikke logget inn.');
        }
        if (error.response?.status === 400 && error.response?.headers.feilkode) {
            throw new FeilkodeError(error.response?.headers.feilkode);
        }
        throw new ApiError('Feil ved kontakt mot baksystem.');
    }
);

axiosRetry(api, { retries: 3 });

const axiosFetcher = (url: string) => api.get(url).then((res) => res.data);

const swrConfig = {
    fetcher: axiosFetcher,
    suspense: true,
};

export const useHentVersjoner = (avtaleId: string) => {
    const { data } = useSWR<AvtaleVersjon[]>(`/avtaler/${avtaleId}/versjoner`, swrConfig);
    return data!; // nosonar
};
