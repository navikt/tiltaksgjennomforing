import React, { createContext, FunctionComponent, useContext, useState } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BeslutterOversikt from '@/BeslutterOversikt/BeslutterOversikt';
import AvtaleOversikt from '@/AvtaleOversikt/AvtaleOversikt';
import { Søkekriterier } from '@/AvtaleOversikt/Filtrering/søkekriterier';

export const SøkekriterierContext = createContext<
    [Søkekriterier, React.Dispatch<React.SetStateAction<Søkekriterier>>]
>([{}, () => {}]);

const Oversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const søkekriterier = useState<Søkekriterier>({});
    return (
        <SøkekriterierContext.Provider value={søkekriterier}>
            ({innloggetBruker.rolle === 'BESLUTTER' ? <BeslutterOversikt /> : <AvtaleOversikt />})
        </SøkekriterierContext.Provider>
    );
};

export default Oversikt;
