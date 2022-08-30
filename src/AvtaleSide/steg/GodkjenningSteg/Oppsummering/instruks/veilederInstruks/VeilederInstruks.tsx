import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import '../instruks.less';
import SommerjobbVeilederTekst from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/veilederInstruks/tekster/SommerjobbVeilederTekst';
import GenerelVeilederTekst from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/veilederInstruks/tekster/GenerelVeilederTekst';
import PilotVeilederTekst from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/veilederInstruks/tekster/PilotVeilederTekst';

const cls = BEMHelper('instruks');

const navnPåTiltakstype: { [key in TiltaksType]: string } = {
    ARBEIDSTRENING: 'Arbeidstrening',
    MIDLERTIDIG_LONNSTILSKUDD: 'Midlertidig lønnstilskudd',
    VARIG_LONNSTILSKUDD: 'Varig lønnstilskudd',
    MENTOR: 'Mentor',
    INKLUDERINGSTILSKUDD: 'Inkluderingstilskudd',
    SOMMERJOBB: 'Sommerjobb',
};

const VeilederInstruks: FunctionComponent<{ tiltakstype: TiltaksType; erPilot: boolean }> = (
    props: PropsWithChildren<{ tiltakstype: TiltaksType; erPilot: boolean }>
) => (
    <VeilederpanelMedUtklippstavle>
        <div className={cls.element('subheader')}>
            <Element>Hva skjer videre:</Element>
        </div>
        <SommerjobbVeilederTekst tiltakstype={props.tiltakstype} />
        <GenerelVeilederTekst tiltakstype={navnPåTiltakstype[props.tiltakstype]} erPilot={props.erPilot} />
        <PilotVeilederTekst erPilot={props.erPilot} />
    </VeilederpanelMedUtklippstavle>
);

export default VeilederInstruks;
