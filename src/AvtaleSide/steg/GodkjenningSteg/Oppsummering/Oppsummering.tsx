import React from 'react';

import { Avtaleinnhold, TiltaksType } from '@/types';
import OppsummeringArbeidstrening from './OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import OppsummeringLonnstilskudd from './OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import OppsummeringMentor from './OppsummeringMentor/OppsummeringMentor';
import OppsummeringInkluderingstilskudd from './OppsummeringInkluderingstilskudd/OppsummeringInkluderingstilskudd';
import OppsummeringVTAO from './OppsummeringVTAO/OppsummeringVTAO';

interface Props {
    tiltakstype: TiltaksType;
    avtaleInnhold: Avtaleinnhold;
}

function Oppsummering(props: Props) {
    const { tiltakstype, avtaleInnhold } = props;

    switch (tiltakstype) {
        case 'FIREARIG_LONNSTILSKUDD':
        case 'MIDLERTIDIG_LONNSTILSKUDD':
        case 'SOMMERJOBB':
        case 'VARIG_LONNSTILSKUDD':
            return <OppsummeringLonnstilskudd avtaleinnhold={avtaleInnhold} tiltakstype={tiltakstype} />;
        case 'ARBEIDSTRENING':
            return <OppsummeringArbeidstrening avtaleinnhold={avtaleInnhold} />;
        case 'MENTOR':
            return <OppsummeringMentor avtaleinnhold={avtaleInnhold} />;
        case 'INKLUDERINGSTILSKUDD':
            return <OppsummeringInkluderingstilskudd avtaleinnhold={avtaleInnhold} />;
        case 'VTAO':
            return <OppsummeringVTAO avtaleinnhold={avtaleInnhold} />;
    }
}

export default Oppsummering;
