import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import React, { FunctionComponent } from 'react';
import '../instruks.less';
import BehandlingAvPersonopplysninger from './tekster/BehandlingAvPersonopplysninger';

const MentorInstruks: FunctionComponent = () => {
    return (
        <VeilederpanelMedUtklippstavleIkon>
            <BehandlingAvPersonopplysninger />
        </VeilederpanelMedUtklippstavleIkon>
    );
};

export default MentorInstruks;
