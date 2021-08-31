import { Innloggingskilde } from '@/types/innlogget-bruker';
import axios from 'axios';

const api = axios.create({
    baseURL: '/tiltaksgjennomforing',
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
});


export const hentInnloggingskilder = async (): Promise<Innloggingskilde[]> => {
    const response = await api.get<Innloggingskilde[]>(`/innloggingskilder`);
    return response.data;
};

export const sjekkOmMenySkalBrukes = async (url: string): Promise<boolean> => {
    const response = await fetch(url);
    return response.json();
};
