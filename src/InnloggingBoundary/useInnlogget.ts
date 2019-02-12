import { useEffect, useState } from 'react';
import AutentiseringError from '../autentisering-error';
import RestService from '../services/rest-service';

export interface Innloggingskilde {
    tittel: string;
    url: string;
}

export interface InnloggetBruker {
    identifikator: string;
}

export interface Innlogget {
    innloggetBruker: InnloggetBruker | null;
    uinnlogget: boolean | null;
    innloggingskilder: Innloggingskilde[];
}

const useInnlogget = (): Innlogget => {
    const [
        innloggetBruker,
        setInnloggetBruker,
    ] = useState<InnloggetBruker | null>(null);

    const [innloggingskilder, setInnloggingskilder] = useState<
        Innloggingskilde[]
    >([]);

    const [uinnlogget, setUinnlogget] = useState<boolean | null>(null);

    useEffect(() => {
        RestService.hentInnloggetBruker()
            .then(setInnloggetBruker)
            .catch(error => {
                if (error instanceof AutentiseringError) {
                    setUinnlogget(true);
                } else {
                    throw error;
                }
            });
        RestService.hentInnloggingskilder().then(setInnloggingskilder);
    }, []);

    return { innloggetBruker, uinnlogget, innloggingskilder };
};

export default useInnlogget;
