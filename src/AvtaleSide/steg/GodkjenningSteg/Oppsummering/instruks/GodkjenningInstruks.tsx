import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { FunctionComponent, useContext } from 'react';
import DeltakerInstruks from './deltakerInstruks/DeltakerInstruks';
import ArbeidsgiverInstruks from './arbeidsgiverInstruks/ArbeidsgiverInstruks';
import VeilederInstruks from './veilederInstruks/VeilederInstruks';
import MentorInstruks from './mentorInstruks/MentorInstruks';
import { useFeatureToggles } from '@/FeatureToggleProvider';

const GodkjenningInstruks: FunctionComponent = () => {
    const { rolle } = useContext(InnloggetBrukerContext);
    const featureToggles = useFeatureToggles();
    const avtaleContext = useContext(AvtaleContext);

    const erLåst = avtaleContext.avtale.godkjentAvVeileder !== null;
    const tiltakstype = avtaleContext.avtale.tiltakstype;

    switch (rolle) {
        case 'DELTAKER':
            return <DeltakerInstruks erLaast={erLåst} tiltakstype={tiltakstype} />;
        case 'MENTOR':
            return <MentorInstruks />;
        case 'ARBEIDSGIVER':
            return (
                <ArbeidsgiverInstruks
                    mentorFeatureToggle={featureToggles.mentorFeatureToggle}
                    erLaast={erLåst}
                    tiltakstype={tiltakstype}
                />
            );
        case 'VEILEDER':
            return <VeilederInstruks avtale={avtaleContext.avtale} />;
        default:
            return null;
    }
};

export default GodkjenningInstruks;
