import React, { FunctionComponent, useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import BeslutterOversikt from '@/BeslutterOversikt/BeslutterOversikt';
import AvtaleOversikt from '@/AvtaleOversikt/AvtaleOversikt';

const Oversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    if (innloggetBruker.rolle === 'BESLUTTER') {
        return <BeslutterOversikt />;
    } else {
        return <AvtaleOversikt />;
    }
};

export default Oversikt;
