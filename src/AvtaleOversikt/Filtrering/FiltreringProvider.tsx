import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import React, { FunctionComponent, PropsWithChildren, createContext, useState } from 'react';

export const FiltreringContext = createContext<[Filtrering, React.Dispatch<React.SetStateAction<Filtrering>>]>([
    {},
    () => null,
]);

export const FiltreringProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const params: any = {};
    const filterFraLocalStorage = localStorage.getItem('filtrering');
    console.log('filterFraLocalStorage', filterFraLocalStorage);
    
    for (const [k, v] of filterFraLocalStorage ? Object.entries(JSON.parse(filterFraLocalStorage)) : []) {
        params[k] = v;
    }
    console.log(params);
    
    const [filtre, setFiltre] = useState<Filtrering>(params);
    return <FiltreringContext.Provider value={[filtre, setFiltre]}>{props.children}</FiltreringContext.Provider>;
};
