import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiltreringContext } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import _ from 'lodash';

const toObject = (params: URLSearchParams) => Object.fromEntries(params.entries());

export const useFilter = () => {
    const [filtre, setFiltre] = useContext(FiltreringContext);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const newParams = toObject(searchParams);
        if (!_.isEqual(newParams, filtre)) {
            setFiltre(newParams);
        }
    }, [searchParams, setFiltre, filtre]);

    const endreFilter = (endring: Filtrering) => {
        // Type 'any' fordi Object.keys ikke skjønner at 'k' er en key av Filtrering
        const nyeFiltre: any = { ...filtre, ...endring };
        Object.keys(nyeFiltre).forEach((k) => !nyeFiltre[k] && delete nyeFiltre[k]);
        if (!_.isEqual(nyeFiltre, filtre)) {
            // For alle filtreringer som ikke er en page-endring, nullstill til "side 1"
            if (!endring.page) {
                delete nyeFiltre['page'];
            }
            setSearchParams(nyeFiltre);
        }
    };

    return { filtre, endreFilter };
};
