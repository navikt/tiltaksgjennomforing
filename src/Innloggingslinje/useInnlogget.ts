import { useEffect, useState } from 'react';
import AutentiseringError from '../autentisering-error';
import RestService from '../services/rest-service';
import InnloggetBruker from './innlogget-bruker';

export interface Innloggingskilde {
    title: string;
    login: string;
}

export interface InnloggingMetadata {
    login: Innloggingskilde[];
    logout: string;
}

export interface Innlogget {
    innloggetBruker: InnloggetBruker | null;
    uinnlogget: boolean | null;
    innloggingMetadata: InnloggingMetadata | null;
}

const useInnlogget = (): Innlogget => {
    const [
        innloggetBruker,
        setInnloggetBruker,
    ] = useState<InnloggetBruker | null>(null);

    const [
        innloggingMetadata,
        setInnloggingMetadata,
    ] = useState<InnloggingMetadata | null>(null);

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
        RestService.hentInnloggingMetadata().then(setInnloggingMetadata);
    }, []);

    return { innloggetBruker, uinnlogget, innloggingMetadata };
};

export default useInnlogget;
