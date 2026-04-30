import React from 'react';
import { Label } from '@navikt/ds-react';

import { Avtale, TiltaksType } from '@/types/avtale';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';

import '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/instruks.less';

import GenerelVeilederTekst from './tekster/GenerelVeilederTekst';
import LonnstilskuddVeilederTekst from './tekster/LonnstilskuddVeilederTekst';
import SommerjobbVeilederTekst from './tekster/SommerjobbVeilederTekst';
import ArbeidstreningVeilederTekst from './tekster/ArbeidstreningVeilederTekst';
import VTAOVeilederTekst from './tekster/VTAOVeilederTekst';
import MentorVeilederTekst from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/veilederInstruks/tekster/MentorVeilederTekst';

interface Props {
    avtale: Avtale;
}

const hentInnholdForTiltakstype = (tiltakstype: TiltaksType): React.ReactNode => {
    switch (tiltakstype) {
        case 'SOMMERJOBB':
            return <SommerjobbVeilederTekst />;
        case 'MIDLERTIDIG_LONNSTILSKUDD':
        case 'VARIG_LONNSTILSKUDD':
        case 'FIREARIG_LONNSTILSKUDD':
            return <LonnstilskuddVeilederTekst />;
        case 'ARBEIDSTRENING':
            return <ArbeidstreningVeilederTekst />;
        case 'VTAO':
            return <VTAOVeilederTekst />;
        case 'MENTOR':
            return <MentorVeilederTekst />;
        default:
            return <GenerelVeilederTekst tiltakstype={tiltakstype} />;
    }
};

const VeilederInstruks = (props: Props) => {
    const { tiltakstype } = props.avtale;

    return (
        <VeilederpanelMedUtklippstavle>
            <Label>Hva skjer videre:</Label>
            {hentInnholdForTiltakstype(tiltakstype)}
        </VeilederpanelMedUtklippstavle>
    );
};

export default VeilederInstruks;
