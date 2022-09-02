import { TiltaksType } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import '../instruks.less';
import ArbeidsgiverArbeidstreningInstruks from './ArbeidsgiverArbeidstreningInstruks';
import ArbeidsgiverInkluderingstilskuddInstruks from './ArbeidsgiverInkluderingstilskuddInstruks';
import ArbeidsgiverMentorInstruks from './ArbeidsgiverMentorInstruks';
import ArbeidsgiverMidlertidigLonnstilskuddInstruks from './ArbeidsgiverMidlertidigLonnstilskuddInstruks';
import ArbeidsgiverSommerjobbInstruks from './ArbeidsgiverSommerjobbInstruks';
import ArbeidsgiverVarigLonnstilskuddInstruks from './ArbeidsgiverVarigLonnstilskuddInstruks';
interface Props {
    erLaast: boolean;
    tiltakstype: TiltaksType;
    erPilot: boolean;
}
const ArbeidsgiverInstruks: FunctionComponent<Props> = (props) => {
    switch (props.tiltakstype) {
        case 'MIDLERTIDIG_LONNSTILSKUDD':
            return <ArbeidsgiverMidlertidigLonnstilskuddInstruks erPilot={props.erPilot} />;
        case 'VARIG_LONNSTILSKUDD':
            return <ArbeidsgiverVarigLonnstilskuddInstruks erPilot={props.erPilot} />;
        case 'ARBEIDSTRENING':
            return <ArbeidsgiverArbeidstreningInstruks />;
        case 'SOMMERJOBB':
            return <ArbeidsgiverSommerjobbInstruks />;
        case 'MENTOR':
            return <ArbeidsgiverMentorInstruks />;
        case 'INKLUDERINGSTILSKUDD':
            return <ArbeidsgiverInkluderingstilskuddInstruks />;
        default:
            return null;
    }
};

export default ArbeidsgiverInstruks;
