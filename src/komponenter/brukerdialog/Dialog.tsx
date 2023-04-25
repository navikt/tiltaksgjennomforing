import React, { useContext } from 'react';
import BrukerDialog from '@/komponenter/brukerdialog/BrukerDialog';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

const Dialog: React.FC = () => {
    const { rolle } = useContext(InnloggetBrukerContext);

    if (rolle !== 'ARBEIDSGIVER') {
        return null;
    }

    return <BrukerDialog />;
};
export default Dialog;
