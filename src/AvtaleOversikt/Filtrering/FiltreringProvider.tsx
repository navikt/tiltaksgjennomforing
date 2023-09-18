import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import { getJsonObjectFromString } from '@/utils/stringUtils';
import React, { FunctionComponent, PropsWithChildren, createContext, useState } from 'react';

export const FiltreringContext = createContext<[Filtrering, React.Dispatch<React.SetStateAction<Filtrering>>]>([
    {},
    () => null,
]);

export const FiltreringProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const filterFraLocalStorage = localStorage.getItem('filtrering');
    const filterObjekt = getJsonObjectFromString(filterFraLocalStorage);
    
    const [filtre, setFiltre] = useState<Filtrering>(filterObjekt);
    return <FiltreringContext.Provider value={[filtre, setFiltre]}>{props.children}</FiltreringContext.Provider>;
};
