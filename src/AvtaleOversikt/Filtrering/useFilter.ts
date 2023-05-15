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
            console.log("Sett params");
            setFiltre(newParams);
        }
    }, [searchParams, setFiltre, filtre]);

    // const endreFilter = useCallback(
    //     (endring: Filtrering) => {
    //         const nyeFiltre: any = { ...filtre, ...endring };
    //         Object.keys(nyeFiltre).forEach((key: string) => !nyeFiltre[key] && delete nyeFiltre[key]);
    //         navigate('?' + new URLSearchParams(nyeFiltre).toString());
    //         parseWindowLocationSearch();
    //     },
    //     [filtre, navigate, parseWindowLocationSearch]
    // );

    const endreFilter = (endring: Filtrering) => {
        // Type 'any' fordi Object.keys ikke skjønner at 'k' er en key av Filtrering
        const nyeFiltre: any = { ...filtre, ...endring };
        Object.keys(nyeFiltre).forEach((k) => !nyeFiltre[k] && delete nyeFiltre[k]);
        console.log(nyeFiltre);
        if (!_.isEqual(nyeFiltre, filtre)) {
            setSearchParams(nyeFiltre);
        }
    };

    return { filtre, endreFilter };
};
