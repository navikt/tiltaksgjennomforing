import { Filtrering } from '@/AvtaleOversikt/Filtrering/filtrering';
import React, { FunctionComponent, PropsWithChildren, createContext, useState } from 'react';

export const FiltreringContextGammel = createContext<[Filtrering, React.Dispatch<React.SetStateAction<Filtrering>>]>([
    {},
    () => null,
]);

export const FiltreringProviderGammel: FunctionComponent<PropsWithChildren> = (props) => {
    const params: any = {};
    for (const [k, v] of new URLSearchParams(window.location.search)) {
        params[k] = v;
    }
    const [filtre, setFiltre] = useState<Filtrering>(params);
    return (
        <FiltreringContextGammel.Provider value={[filtre, setFiltre]}>
            {props.children}
        </FiltreringContextGammel.Provider>
    );
};
