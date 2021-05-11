import React, { FunctionComponent, useContext } from 'react';
import VeilederAvtaleStatus from '@/AvtaleSide/NyAvtaleStatus/VeilederAvtaleStatus';
import DeltakerAvtaleStatus from '@/AvtaleSide/NyAvtaleStatus/DeltakerAvtaleStatus';
import ArbeidsgiverAvtaleStatus from '@/AvtaleSide/NyAvtaleStatus/ArbeidsgiverAvtaleStatus';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

const NyAvtaleStatus: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    switch (innloggetBruker.rolle) {
        case 'DELTAKER':
            return <DeltakerAvtaleStatus />;
        case 'ARBEIDSGIVER':
            return <ArbeidsgiverAvtaleStatus />;
        case 'VEILEDER':
            return <VeilederAvtaleStatus />;
        default:
            return null;
    }
};

export default NyAvtaleStatus;
