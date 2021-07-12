import React, { FunctionComponent, useContext } from 'react';
import VeilederAvtaleStatus from '@/AvtaleSide/AvtaleStatus/VeilederAvtaleStatus';
import DeltakerAvtaleStatus from '@/AvtaleSide/AvtaleStatus/DeltakerAvtaleStatus';
import ArbeidsgiverAvtaleStatus from '@/AvtaleSide/AvtaleStatus/ArbeidsgiverAvtaleStatus';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

const AvtaleStatus: FunctionComponent = () => {
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

export default AvtaleStatus;
