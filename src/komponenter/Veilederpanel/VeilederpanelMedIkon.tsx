import Veilederpanel from 'nav-frontend-veilederpanel';
import { ReactComponentLike } from 'prop-types';
import * as React from 'react';
import './VeilederpanelMedIkon.less';

const VeilederpanelMedIkon = (props: {
    svg: React.ReactNode;
    children?: React.ReactNode;
}) => (
    <div className="veilederpanel-med-ikon">
        <Veilederpanel svg={props.svg} kompakt={true} type="plakat">
            {props.children}
        </Veilederpanel>
    </div>
);

export default VeilederpanelMedIkon;
