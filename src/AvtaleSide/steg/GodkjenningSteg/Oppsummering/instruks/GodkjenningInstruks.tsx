import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { sjekkOmAvtaleErPilot } from '@/services/rest-service';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import ArbeidsgiverInstruksNy from './Arbeidsgiver/ArbeidsgiverInstruksNy';
import DeltakerInstruksNy from './Deltaker/DeltakerInstruksNy';
import DeltakerInstruks from './DeltakerInstruks';
import VeilederInstruks from './VeilederInstruks';

const GodkjenningInstruks: FunctionComponent = () => {
    const { rolle } = useContext(InnloggetBrukerContext);
    const avtaleContext = useContext(AvtaleContext);

    const erLåst = avtaleContext.avtale.godkjentAvVeileder !== null;
    const tiltakstype = avtaleContext.avtale.tiltakstype;
    const [erPilot, setErPilot] = useState<boolean>(false);

    useEffect(() => {
        if (tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || tiltakstype === 'VARIG_LONNSTILSKUDD') {
            sjekkOmAvtaleErPilot(avtaleContext.avtale).then(setErPilot);
        }
    }, [tiltakstype, avtaleContext.avtale]);

    switch (rolle) {
        case 'DELTAKER':
            // return <DeltakerInstruks erLaast={erLåst} tiltakstype={tiltakstype} />;
            return <DeltakerInstruksNy tiltakstype={tiltakstype}/>;
        case 'MENTOR':
            return <DeltakerInstruks erLaast={erLåst} tiltakstype={tiltakstype} />;
        case 'ARBEIDSGIVER':
            // return <ArbeidsgiverInstruks erLaast={erLåst} tiltakstype={tiltakstype} erPilot={erPilot} />;
            return <ArbeidsgiverInstruksNy tiltakstype={tiltakstype} erPilot={erPilot} />;
        case 'VEILEDER':
            return <VeilederInstruks tiltakstype={tiltakstype} erPilot={erPilot} />;
        default:
            return null;
    }
};

export default GodkjenningInstruks;
