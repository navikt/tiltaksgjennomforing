import { FiltreringContext } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import _ from 'lodash';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

const toObject = (params: URLSearchParams) => Object.fromEntries(params.entries());

const updateOrDeleteKey = (params: URLSearchParams, filter: Filtrering, key: keyof Filtrering) => {
    if (filter.hasOwnProperty(key)) {
        if (!filter[key]) {
            params.delete(key);
        } else {
            params.set(key, filter[key] as string);
        }
    }
};

export const useFilter = () => {
    const [filtre, setFiltre] = useContext(FiltreringContext);
    const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(() => {
    //     const newParams = toObject(searchParams);
    //     if (!_.isEqual(newParams, filtre)) {
    //         setFiltre(newParams);
    //     }
    // }, [searchParams, filtre, setFiltre]);

    const endreFilter = (endring: Filtrering) => {
        //const newSearchParamsGammel = new URLSearchParams(searchParams);

        const newSeachParamsObj = JSON.parse(localStorage.getItem('filtrering') || '{}');
        const newSearchParams = new URLSearchParams(newSeachParamsObj);
        console.log("newSearchParams er: ", newSearchParams);
        console.log("newSearchParams med JSON.stringify: ", JSON.stringify(newSearchParams));
        debugger;
        
        

        updateOrDeleteKey(newSearchParams, endring, "avtaleNr");
        updateOrDeleteKey(newSearchParams, endring, "veilederNavIdent");
        updateOrDeleteKey(newSearchParams, endring, "deltakerFnr");
        updateOrDeleteKey(newSearchParams, endring, "bedriftNr");
        updateOrDeleteKey(newSearchParams, endring, "navEnhet");
        updateOrDeleteKey(newSearchParams, endring, "erUfordelt");
        updateOrDeleteKey(newSearchParams, endring, "status");
        updateOrDeleteKey(newSearchParams, endring, "sorteringskolonne");
        updateOrDeleteKey(newSearchParams, endring, "tilskuddPeriodeStatus");
        updateOrDeleteKey(newSearchParams, endring, "tiltakstype");

        // Alle endringer som ikke er en endring i paginering/sortering, bør nullstille pagineringen
        const changedKeys = Object.keys(endring);
        if (changedKeys.filter(k => !['page', 'sorteringskolonne'].includes(k)).length > 0) {
            newSearchParams.delete("page");
        }
        if (endring.hasOwnProperty('page')) {
            newSearchParams.set("page", '' + endring.page);
        }



        console.log("Endring er: ", JSON.stringify(endring));
        
        console.log("setter ny filtrering", JSON.stringify(toObject(newSearchParams)));

        const newParams = toObject(newSearchParams);
        debugger;
        if (!_.isEqual(newParams, filtre)) {
            localStorage.setItem('filtrering', JSON.stringify(newParams));
            setFiltre(newParams);
        }
    };

    return { filtre, endreFilter };
};
