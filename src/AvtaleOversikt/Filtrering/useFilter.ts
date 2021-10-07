import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FiltreringContext } from "@/AvtaleOversikt/Filtrering/FiltreringProvider";
import { Filtrering } from "@/AvtaleOversikt/Filtrering/filtrering";

export const useFilter = () => {
    const [filtre, setFiltre] = useContext(FiltreringContext);
    const history = useHistory();

    const parseWindowLocationSearch = useCallback(() => {
        const params: any = {};
        for (let [k, v] of new URLSearchParams(window.location.search)) {
            params[k] = v;
        }
        setFiltre(params);
    }, [setFiltre]);

    useEffect(() => {
        window.addEventListener('load', parseWindowLocationSearch);

        return () => {
            window.removeEventListener('load', parseWindowLocationSearch);
        };
    }, [parseWindowLocationSearch]);

    const endreFilter = (endring: Filtrering) => {
        // Type 'any' fordi Object.keys ikke skjønner at 'k' er en key av Filtrering
        const nyeFiltre: any = { ...filtre, ...endring };
        Object.keys(nyeFiltre).forEach((k) => !nyeFiltre[k] && delete nyeFiltre[k]);
        history.push('?' + new URLSearchParams(nyeFiltre).toString());
        parseWindowLocationSearch();
    };

    return { filtre, endreFilter, parseWindowLocationSearch };
};
