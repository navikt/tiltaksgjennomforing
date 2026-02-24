import React from 'react';

import { Avtale, Avtaleinnhold, TiltaksType } from '@/types';
import OppsummeringArbeidstrening from './OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import OppsummeringLonnstilskudd from './OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import OppsummeringMentor from './OppsummeringMentor/OppsummeringMentor';
import OppsummeringInkluderingstilskudd from './OppsummeringInkluderingstilskudd/OppsummeringInkluderingstilskudd';
import OppsummeringVTAO from './OppsummeringVTAO/OppsummeringVTAO';

interface PropsMedAvtale {
    avtale: Avtale;
}

interface PropsMedAvtaleInnhold {
    tiltakstype: TiltaksType;
    avtaleInnhold: Avtaleinnhold;
    visInnholdFraEtterMigrering: boolean;
}

type Props = PropsMedAvtale | PropsMedAvtaleInnhold;

const visInnholdFraEtterMigrering = (avtale: Avtale) => {
    switch (avtale.tiltakstype) {
        case 'MENTOR':
            return !(avtale.avtaleInngått && !avtale.gjeldendeInnhold.mentorValgtLonnstype);
        default:
            return true;
    }
};

const resolveProps = (props: Props): PropsMedAvtaleInnhold => {
    if ('avtale' in props) {
        const { tiltakstype, gjeldendeInnhold } = props.avtale;
        return {
            tiltakstype,
            avtaleInnhold: gjeldendeInnhold,
            visInnholdFraEtterMigrering: visInnholdFraEtterMigrering(props.avtale),
        };
    }
    return props;
};

function Oppsummering(props: Props) {
    const { tiltakstype, avtaleInnhold, visInnholdFraEtterMigrering } = resolveProps(props);

    switch (tiltakstype) {
        case 'SOMMERJOBB':
        case 'MIDLERTIDIG_LONNSTILSKUDD':
        case 'VARIG_LONNSTILSKUDD':
            return <OppsummeringLonnstilskudd avtaleinnhold={avtaleInnhold} />;
        case 'ARBEIDSTRENING':
            return <OppsummeringArbeidstrening avtaleinnhold={avtaleInnhold} />;
        case 'MENTOR':
            return (
                <OppsummeringMentor
                    avtaleinnhold={avtaleInnhold}
                    visInnholdFraEtterMigrering={visInnholdFraEtterMigrering}
                />
            );
        case 'INKLUDERINGSTILSKUDD':
            return <OppsummeringInkluderingstilskudd avtaleinnhold={avtaleInnhold} />;
        case 'VTAO':
            return <OppsummeringVTAO avtaleinnhold={avtaleInnhold} />;
    }
}

export default Oppsummering;
