import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import React, { FunctionComponent, PropsWithChildren, createContext, useState } from 'react';

export const FiltreringContext = createContext<[Filtrering, React.Dispatch<React.SetStateAction<Filtrering>>]>([
    {},
    () => null,
]);

export const FiltreringProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const params: any = {};
    // for (const [k, v] of new URLSearchParams(window.location.search)) {
    //     params[k] = v;
    // }
    const [filtre, setFiltre] = useState<Filtrering>(params);
    return <FiltreringContext.Provider value={[filtre, setFiltre]}>{props.children}</FiltreringContext.Provider>;
};
