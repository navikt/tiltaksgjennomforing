import { Rolle } from '@/AvtaleContext';
import { hentInnloggetBruker, hentInnloggingskilder } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import { ApiError, AutentiseringError } from '@/types/errors';
import { Organisasjon as AltinnOrganisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { useEffect, useState } from 'react';
import { FeilkodeError } from './../types/errors';

export interface Innloggingskilde {
    tittel: string;
    part: string;
    url: string;
}

export interface InnloggetBruker {
    identifikator: string;
    erNavAnsatt: boolean;
    altinnOrganisasjoner: AltinnOrganisasjon[];
    rolle: Rolle;
    tilganger: { [bedriftNr: string]: TiltaksType[] };
}

export interface Organisasjon {
    bedriftNavn: string;
    bedriftNr: string;
    tilgangstyper: TiltaksType[];
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
        hentInnloggetBruker()
            .then(setInnloggetBruker)
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
