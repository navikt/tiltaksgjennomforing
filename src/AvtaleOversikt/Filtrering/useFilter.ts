import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiltreringContext } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import _ from 'lodash';

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

    useEffect(() => {
        const newParams = toObject(searchParams);
        if (!_.isEqual(newParams, filtre)) {
            setFiltre(newParams);
        }
    }, [searchParams, filtre, setFiltre]);

    const endreFilter = (endring: Filtrering) => {
        const newSearchParams = new URLSearchParams(searchParams);

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

        setSearchParams(newSearchParams);
    };

    return { filtre, endreFilter };
};
