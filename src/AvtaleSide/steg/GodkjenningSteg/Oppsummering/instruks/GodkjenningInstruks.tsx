import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import DeltakerInstruks from './deltakerInstruks/DeltakerInstruks';
import ArbeidsgiverInstruks from './arbeidsgiverInstruks/ArbeidsgiverInstruks';
import VeilederInstruks from './veilederInstruks/VeilederInstruks';
import { sjekkOmAvtaleErPilot } from '@/services/rest-service';

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
            return <DeltakerInstruks erLaast={erLåst} tiltakstype={tiltakstype} />;
        case 'MENTOR':
            return <DeltakerInstruks erLaast={erLåst} tiltakstype={tiltakstype} />;
        case 'ARBEIDSGIVER':
            return <ArbeidsgiverInstruks erLaast={erLåst} tiltakstype={tiltakstype} erPilot={erPilot} />;
        case 'VEILEDER':
            return <VeilederInstruks tiltakstype={tiltakstype} erPilot={erPilot} />;
        default:
            return null;
    }
};

export default GodkjenningInstruks;
