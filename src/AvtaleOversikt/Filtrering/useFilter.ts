import { FiltreringContext } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import isEqual from 'fast-deep-equal';
import { useContext } from 'react';

const updateOrDeleteKeyFromObject = (filterobject: any, filterEndring: Filtrering, key: keyof Filtrering) => {
    if (filterEndring.hasOwnProperty(key)) {
        if (!filterEndring[key]) {
            delete filterobject[key];
        } else {
            filterobject[key] = filterEndring[key];
        }
    }
};

export const useFilter = () => {
    const [filtre, setFiltre] = useContext(FiltreringContext);

    const endreFilter = (endring: Filtrering) => {
        const obj = { ...filtre };

        updateOrDeleteKeyFromObject(obj, endring, 'avtaleNr');
        updateOrDeleteKeyFromObject(obj, endring, 'veilederNavIdent');
        updateOrDeleteKeyFromObject(obj, endring, 'deltakerFnr');
        updateOrDeleteKeyFromObject(obj, endring, 'bedriftNr');
        updateOrDeleteKeyFromObject(obj, endring, 'navEnhet');
        updateOrDeleteKeyFromObject(obj, endring, 'erUfordelt');
        updateOrDeleteKeyFromObject(obj, endring, 'status');
        updateOrDeleteKeyFromObject(obj, endring, 'sorteringskolonne');
        updateOrDeleteKeyFromObject(obj, endring, 'tilskuddPeriodeStatus');
        updateOrDeleteKeyFromObject(obj, endring, 'tiltakstype');
        updateOrDeleteKeyFromObject(obj, endring, 'sorteringOrder');

        // Alle endringer som ikke er en endring i paginering/sortering, bør nullstille pagineringen
        const changedKeys = Object.keys(endring);
        if (changedKeys.filter((k) => !['page', 'sorteringskolonne', 'sorteringOrder'].includes(k)).length > 0) {
            delete obj['page'];
        }
        if (endring.hasOwnProperty('page')) {
            obj['page'] = endring.page;
        }

        if (!isEqual(obj, filtre)) {
            setFiltre(obj);
        }
    };

    return { filtre, endreFilter };
};
