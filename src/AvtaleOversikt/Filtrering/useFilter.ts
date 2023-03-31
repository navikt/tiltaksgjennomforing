import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { FiltreringContext } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import _ from 'lodash';
import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useFilter = () => {
    const [filtre, setFiltre] = useContext(FiltreringContext);
    const navigate = useNavigate();

    const parseWindowLocationSearch = useCallback(() => {
        const params: any = {};
        for (const [k, v] of new URLSearchParams(window.location.search)) {
            params[k] = v;
        }
        if (!_.isEqual(params, filtre)) {
            setFiltre(params);
        }
    }, [setFiltre, filtre]);

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
        navigate('?' + new URLSearchParams(nyeFiltre).toString());
        parseWindowLocationSearch();
    };

    return { filtre, endreFilter, parseWindowLocationSearch };
};
