import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import '../instruks.less';
import BehandlingAvPersonopplysninger from './tekster/BehandlingAvPersonopplysninger';

interface Props {
    erLaast: boolean;
}
const MentorInstruks: FunctionComponent<Props> = (props) => {
    const { erLaast } = props;
    return (
        <>
            {!erLaast && (
                <BodyShort size="small">Når du signerer taushetserklæringen godtar du kravene fra Nav</BodyShort>
            )}
            <VeilederpanelMedUtklippstavleIkon>
                <BehandlingAvPersonopplysninger />
            </VeilederpanelMedUtklippstavleIkon>
        </>
    );
};

export default MentorInstruks;
