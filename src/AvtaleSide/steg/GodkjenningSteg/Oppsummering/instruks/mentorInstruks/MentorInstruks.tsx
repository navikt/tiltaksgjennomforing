import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import React, { FunctionComponent } from 'react';
import '../instruks.less';
import BehandlingAvPersonopplysninger from './tekster/BehandlingAvPersonopplysninger';

interface Props {
    erLaast: boolean;
}
const MentorInstruks: FunctionComponent<Props> = () => {
    return (
        <VeilederpanelMedUtklippstavleIkon>
            <BehandlingAvPersonopplysninger />
        </VeilederpanelMedUtklippstavleIkon>
    );
};

export default MentorInstruks;
