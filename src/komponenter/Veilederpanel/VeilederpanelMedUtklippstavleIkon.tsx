import * as React from 'react';
import { ReactComponent as UtklippstavleIkon } from './utklippstavlen.svg';
import VeilederpanelMedIkon from './VeilederpanelMedIkon';

const VeilederpanelMedUtklippstavle = (props: { children?: React.ReactNode }) => (
    <VeilederpanelMedIkon svg={<UtklippstavleIkon style={{ width: 49 }} />}>{props.children}</VeilederpanelMedIkon>
);

export default VeilederpanelMedUtklippstavle;
