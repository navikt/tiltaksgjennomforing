import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { FunctionComponent, useContext } from 'react';
import ArbeidsgiverInstruks from './ArbeidsgiverInstruks';
import DeltakerInstruks from './DeltakerInstruks';
import VeilederInstruks from './VeilederInstruks';

const GodkjenningInstruks: FunctionComponent = () => {
    const { rolle } = useContext(InnloggetBrukerContext);
    const avtaleContext = useContext(AvtaleContext);

    const erLåst = avtaleContext.avtale.erLaast;
    const tiltakstype = avtaleContext.avtale.tiltakstype;

    switch (rolle) {
        case 'DELTAKER':
            return <DeltakerInstruks erLaast={erLåst} tiltakstype={tiltakstype} />;
        case 'ARBEIDSGIVER':
            return <ArbeidsgiverInstruks erLaast={erLåst} tiltakstype={tiltakstype} />;
        case 'VEILEDER':
            return <VeilederInstruks tiltakstype={tiltakstype} />;
        default:
            return null;
    }
};

export default GodkjenningInstruks;
