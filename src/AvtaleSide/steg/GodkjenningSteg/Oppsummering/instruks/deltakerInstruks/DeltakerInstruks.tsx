import { TiltaksType } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import '../instruks.less';
import DeltakerArbeidstreningInstruks from './DeltakerArbeidstreningInstruks';
import DeltakerInkluderingstilskuddInstruks from './DeltakerInkluderingstilskuddInstruks';
import DeltakerMentorInstruks from './DeltakerMentorInstruks';
import DeltakerMidlertidigLonnstilskuddInstruks from './DeltakerMidlertidigLonnstilskuddInstruks';
import DeltakerSommerjobbInstruks from './DeltakerSommerjobbInstruks';
import DeltakerVarigLonnstilskuddInstruks from './DeltakerVarigLonnstilskuddInstruks';

interface Props {
    erLaast: boolean;
    tiltakstype: TiltaksType;
}
const DeltakerInstruksNy: FunctionComponent<Props> = (props) => {
    switch (props.tiltakstype) {
        case 'MIDLERTIDIG_LONNSTILSKUDD':
            return <DeltakerMidlertidigLonnstilskuddInstruks />;
        case 'VARIG_LONNSTILSKUDD':
            return <DeltakerVarigLonnstilskuddInstruks />;
        case 'ARBEIDSTRENING':
            return <DeltakerArbeidstreningInstruks />;
        case 'SOMMERJOBB':
            return <DeltakerSommerjobbInstruks />;
        case 'MENTOR':
            return <DeltakerMentorInstruks />;
        case 'INKLUDERINGSTILSKUDD':
            return <DeltakerInkluderingstilskuddInstruks />;
        default:
            return null;
    }
};

export default DeltakerInstruksNy;
