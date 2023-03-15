import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Label } from '@navikt/ds-react';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import '../instruks.less';
import SommerjobbVeilederTekst from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/veilederInstruks/tekster/SommerjobbVeilederTekst';
import GenerelVeilederTekst from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/veilederInstruks/tekster/GenerelVeilederTekst';
import LonnstilskuddVeilederTekst from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/veilederInstruks/tekster/LonnstilskuddVeilederTekst';

const cls = BEMHelper('instruks');

const VeilederInstruks: FunctionComponent<{ tiltakstype: TiltaksType }> = (
    props: PropsWithChildren<{ tiltakstype: TiltaksType }>
) => (
    <VeilederpanelMedUtklippstavle>
        <div className={cls.element('subheader')}>
            <Label>Hva skjer videre:</Label>
        </div>
        <SommerjobbVeilederTekst tiltakstype={props.tiltakstype} />
        <GenerelVeilederTekst tiltakstype={props.tiltakstype} />
        <LonnstilskuddVeilederTekst tiltakstype={props.tiltakstype}/>
    </VeilederpanelMedUtklippstavle>
);

export default VeilederInstruks;
