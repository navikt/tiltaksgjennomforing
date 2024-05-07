import React, { FunctionComponent, useContext } from 'react';
import VeilederAvtaleStatus from '@/AvtaleSide/AvtaleStatus/VeilederAvtaleStatus';
import DeltakerAvtaleStatus from '@/AvtaleSide/AvtaleStatus/DeltakerAvtaleStatus';
import ArbeidsgiverAvtaleStatus from '@/AvtaleSide/AvtaleStatus/ArbeidsgiverAvtaleStatus';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import MentorAvtaleStatus from './MentorAvtaleStatus';
import { AvtaleContext } from '@/AvtaleProvider';

const AvtaleStatus: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

    switch (innloggetBruker.rolle) {
        case 'DELTAKER':
            return <DeltakerAvtaleStatus avtale={avtale} />;
        case 'MENTOR':
            return <MentorAvtaleStatus avtale={avtale} />;
        case 'ARBEIDSGIVER':
            return <ArbeidsgiverAvtaleStatus avtale={avtale} />;
        case 'VEILEDER':
            return <VeilederAvtaleStatus avtale={avtale} />;
        default:
            return null;
    }
};

export default AvtaleStatus;
