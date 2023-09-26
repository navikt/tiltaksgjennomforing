import { FiltreringContext } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import _ from 'lodash';
import { useContext } from 'react';

const toObject = (params: URLSearchParams) => Object.fromEntries(params.entries());

const updateOrDeleteKeyFromObject = (filterobject: any, filterEnring: Filtrering, key: keyof Filtrering) => {
    if (filterEnring.hasOwnProperty(key)) {
        if (!filterEnring[key]) {
            delete filterobject[key];
        } else {
            filterobject[key] = filterEnring[key];
        }
    }
}

export const useFilter = () => {
    const [filtre, setFiltre] = useContext(FiltreringContext);

    const endreFilter = (endring: Filtrering) => {
        const obj = {...filtre};
        
        updateOrDeleteKeyFromObject(obj, endring, "avtaleNr");
        updateOrDeleteKeyFromObject(obj, endring, "veilederNavIdent");
        updateOrDeleteKeyFromObject(obj, endring, "deltakerFnr");
        updateOrDeleteKeyFromObject(obj, endring, "bedriftNr");
        updateOrDeleteKeyFromObject(obj, endring, "navEnhet");
        updateOrDeleteKeyFromObject(obj, endring, "erUfordelt");
        updateOrDeleteKeyFromObject(obj, endring, "status");
        updateOrDeleteKeyFromObject(obj, endring, "sorteringskolonne");
        updateOrDeleteKeyFromObject(obj, endring, "tilskuddPeriodeStatus");
        updateOrDeleteKeyFromObject(obj, endring, "tiltakstype");

        // Alle endringer som ikke er en endring i paginering/sortering, bør nullstille pagineringen
        const changedKeys = Object.keys(endring);
        if (changedKeys.filter(k => !['page', 'sorteringskolonne'].includes(k)).length > 0) {
            delete obj["page"];
        }
        if (endring.hasOwnProperty('page')) {
            obj["page"] = endring.page;
        }
        
        
        if (!_.isEqual(obj, filtre)) {
           
            //localStorage.setItem('filtrering', JSON.stringify(obj));
            setFiltre(obj);
        }
    };

    return { filtre, endreFilter };
};
