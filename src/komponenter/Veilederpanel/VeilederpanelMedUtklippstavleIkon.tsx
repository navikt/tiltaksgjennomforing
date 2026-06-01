import * as React from 'react';
import UtklippstavleIkon from './utklippstavlen.svg?react';
import VeilederpanelMedIkon from './VeilederpanelMedIkon';

const VeilederpanelMedUtklippstavleIkon = (props: { children?: React.ReactNode }) => (
    <VeilederpanelMedIkon svg={<UtklippstavleIkon style={{ width: 36, marginLeft: '20px' }} />}>
        {props.children}
    </VeilederpanelMedIkon>
);

export default VeilederpanelMedUtklippstavleIkon;
