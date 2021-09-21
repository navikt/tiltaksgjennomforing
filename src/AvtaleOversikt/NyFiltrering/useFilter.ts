import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Søkekriterier } from '@/AvtaleOversikt/Filtrering/søkekriterier';
import { SøkekriterierContext } from '@/Oversikt';

export const useFilter = () => {
    const [filtre, setFiltre] = useContext(SøkekriterierContext);
    const history = useHistory();

    const parseWindowLocationSearch = useCallback(() => {
        console.log('parseWindowLocationSearch');
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

    const endreFilter = (endring: Søkekriterier) => {
        // Type 'any' fordi Object.keys ikke skjønner at 'k' er en key av Søkekriterier
        const nyeFiltre: any = { ...filtre, ...endring };
        Object.keys(nyeFiltre).forEach((k) => !nyeFiltre[k] && delete nyeFiltre[k]);
        history.push('?' + new URLSearchParams(nyeFiltre).toString());
        parseWindowLocationSearch();
    };

    return { filtre, endreFilter };
};
