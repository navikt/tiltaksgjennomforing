import * as React from 'react';
import { ReactComponent as UtklippstavleIkon } from './utklippstavlen.svg';
import VeilederpanelMedIkon from './VeilederpanelMedIkon';

const VeilederpanelMedUtklippstavleIkon = (props: { children?: React.ReactNode }) => (
    <VeilederpanelMedIkon svg={<UtklippstavleIkon style={{ width: 49, marginLeft: '24px' }} />}>
        {props.children}
    </VeilederpanelMedIkon>
);

export default VeilederpanelMedUtklippstavleIkon;
