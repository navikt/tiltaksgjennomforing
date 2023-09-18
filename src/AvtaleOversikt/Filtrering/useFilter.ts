import { FiltreringContext } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import _ from 'lodash';
import { useContext, useEffect } from 'react';

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


    // Dette gjøres for å synce ulike faner i nettleseren
    useEffect(() => {
        // Respond to the `storage` event
        const storageEventHandler = (event: any) => {
            if (event.key === "filtrering") {
                const filtre = JSON.parse(event.newValue);
                setFiltre(filtre);
            }
        }
        // Hook up the event handler
        window.addEventListener("storage", storageEventHandler);
        return () => {
            // Remove the handler when the component unmounts
            window.removeEventListener("storage", storageEventHandler);
        };
    }, []);
    

    const endreFilter = (endring: Filtrering) => {
        const obj = JSON.parse(localStorage.getItem('filtrering') || '{}');
        
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
            localStorage.setItem('filtrering', JSON.stringify(obj));
            setFiltre(obj);
        }
    };

    return { filtre, endreFilter };
};
