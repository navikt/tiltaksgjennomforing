import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Label } from '@navikt/ds-react';
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

const VeilederInstruks: FunctionComponent<{ tiltakstype: TiltaksType }> = (
    props: PropsWithChildren<{ tiltakstype: TiltaksType }>
) => (
    <VeilederpanelMedUtklippstavle>
        <div className={cls.element('subheader')}>
            <Label>Hva skjer videre:</Label>
        </div>
        <SommerjobbVeilederTekst tiltakstype={props.tiltakstype} />
        <GenerelVeilederTekst tiltakstype={navnPåTiltakstype[props.tiltakstype]} />
        <PilotVeilederTekst />
    </VeilederpanelMedUtklippstavle>
);

export default VeilederInstruks;
