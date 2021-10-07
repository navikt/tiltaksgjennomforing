import React, { createContext, FunctionComponent, useState } from 'react';
import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';

export const FiltreringContext = createContext<[Filtrering, React.Dispatch<React.SetStateAction<Filtrering>>]>([
    {},
    () => null,
]);

export const FiltreringProvider: FunctionComponent = (props) => {
    const params: any = {};
    for (let [k, v] of new URLSearchParams(window.location.search)) {
        params[k] = v;
    }
    const [filtre, setFiltre] = useState<Filtrering>(params);
    return <FiltreringContext.Provider value={[filtre, setFiltre]}>{props.children}</FiltreringContext.Provider>;
};
