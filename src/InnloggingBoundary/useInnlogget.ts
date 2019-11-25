import { useEffect, useState } from 'react';
import { ApiError, AutentiseringError } from '@/types/errors';
import RestService from '@/services/rest-service';

export interface Innloggingskilde {
    tittel: string;
    part: string;
    url: string;
}

export interface InnloggetBruker {
    identifikator: string;
    erNavAnsatt: boolean;
}

export interface Innlogget {
    innloggetBruker: InnloggetBruker | null;
    uinnlogget: boolean | null;
    innloggingskilder: Innloggingskilde[];
    feilmelding: string | null;
}

const useInnlogget = (): Innlogget => {
    const [innloggetBruker, setInnloggetBruker] = useState<InnloggetBruker | null>(null);

    const [innloggingskilder, setInnloggingskilder] = useState<Innloggingskilde[]>([]);

    const [feilmelding, setFeilmelding] = useState<string | null>(null);

    const [uinnlogget, setUinnlogget] = useState<boolean | null>(null);

    useEffect(() => {
        RestService.hentInnloggetBruker()
            .then(setInnloggetBruker)
            .catch(error => {
                if (error instanceof AutentiseringError) {
                    setUinnlogget(true);
                } else if (error instanceof ApiError) {
                    setFeilmelding(error.message);
                } else {
                    throw error;
                }
            });
        RestService.hentInnloggingskilder().then(setInnloggingskilder);
    }, []);

    return { innloggetBruker, uinnlogget, innloggingskilder, feilmelding };
};

export default useInnlogget;
