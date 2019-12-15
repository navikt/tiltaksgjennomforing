import * as React from 'react';
import { ReactComponent as AvsjekkIkon } from './avsjekk-sirkel.svg';
import VeilederpanelMedIkon from './VeilederpanelMedIkon';

const VeilederpanelMedAvsjekkIkon = (props: { children?: React.ReactNode }) => (
    <VeilederpanelMedIkon svg={<AvsjekkIkon style={{ width: 100 }} />}>
        {props.children}
    </VeilederpanelMedIkon>
);

export default VeilederpanelMedAvsjekkIkon;
