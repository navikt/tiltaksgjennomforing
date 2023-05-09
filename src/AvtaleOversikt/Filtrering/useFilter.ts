import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiltreringContext } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import _ from 'lodash';

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

    const endreFilter = useCallback(
        (endring: Filtrering) => {
            const nyeFiltre: any = { ...filtre, ...endring };
            Object.keys(nyeFiltre).forEach((key: string) => !nyeFiltre[key] && delete nyeFiltre[key]);
            navigate('?' + new URLSearchParams(nyeFiltre).toString());
            parseWindowLocationSearch();
        },
        [filtre, navigate, parseWindowLocationSearch]
    );

    return { filtre, endreFilter, parseWindowLocationSearch };
};
