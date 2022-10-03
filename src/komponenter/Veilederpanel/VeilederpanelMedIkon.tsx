import { GuidePanel } from '@navikt/ds-react';
import * as React from 'react';
import './VeilederpanelMedIkon.less';

const VeilederpanelMedIkon = (props: { svg: React.ReactNode; children?: React.ReactNode }) => (
    <div className="veilederpanel-med-ikon">
        <GuidePanel poster>{props.children}</GuidePanel>
    </div>
);

export default VeilederpanelMedIkon;
