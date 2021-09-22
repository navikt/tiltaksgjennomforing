import React, { FunctionComponent, useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BeslutterOversikt from '@/BeslutterOversikt/BeslutterOversikt';
import AvtaleOversikt from '@/AvtaleOversikt/AvtaleOversikt';
import { FiltreringProvider } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';

const Oversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    return (
        <FiltreringProvider>
            ({innloggetBruker.rolle === 'BESLUTTER' ? <BeslutterOversikt /> : <AvtaleOversikt />})
        </FiltreringProvider>
    );
};

export default Oversikt;
