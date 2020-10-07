import { hentInnloggetBruker, hentInnloggingskilder } from '@/services/rest-service';
import { ApiError, AutentiseringError } from '@/types/errors';
import { InnloggetBruker, Innloggingskilde } from '@/types/innlogget-bruker';
import amplitude from '@/utils/amplitude';
import { useEffect, useState } from 'react';
import { FeilkodeError } from './../types/errors';

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
        hentInnloggetBruker()
            .then(response => {
                setInnloggetBruker(response);
                amplitude.setUserProperties({ rolle: response.rolle });
            })
            .catch(error => {
                if (error instanceof AutentiseringError || error instanceof FeilkodeError) {
                    setUinnlogget(true);
                } else if (error instanceof ApiError) {
                    setFeilmelding(error.message);
                } else {
                    throw error;
                }
            });
        hentInnloggingskilder().then(setInnloggingskilder);
    }, []);

    return { innloggetBruker, uinnlogget, innloggingskilder, feilmelding };
};

export default useInnlogget;
