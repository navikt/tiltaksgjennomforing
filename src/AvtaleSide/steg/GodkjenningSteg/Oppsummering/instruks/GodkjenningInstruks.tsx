import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { FunctionComponent, useContext } from 'react';
import DeltakerInstruks from './deltakerInstruks/DeltakerInstruks';
import ArbeidsgiverInstruks from './arbeidsgiverInstruks/ArbeidsgiverInstruks';
import VeilederInstruks from './veilederInstruks/VeilederInstruks';

const GodkjenningInstruks: FunctionComponent = () => {
    const { rolle } = useContext(InnloggetBrukerContext);
    const avtaleContext = useContext(AvtaleContext);

    const erLåst = avtaleContext.avtale.godkjentAvVeileder !== null;
    const tiltakstype = avtaleContext.avtale.tiltakstype;

    switch (rolle) {
        case 'DELTAKER':
            return <DeltakerInstruks erLaast={erLåst} tiltakstype={tiltakstype} />;
        case 'MENTOR':
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
