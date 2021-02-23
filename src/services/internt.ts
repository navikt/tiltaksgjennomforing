import { Innloggingskilde } from '@/types/innlogget-bruker';

export const hentInnloggingskilder = async (): Promise<Innloggingskilde[]> => {
    const response = await fetch('/tiltaksgjennomforing/innloggingskilder');
    return response.json();
};

export const sjekkOmMenySkalBrukes = async (url: string): Promise<boolean> => {
    const response = await fetch(url);
    return response.json();
};
