import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as CheckIkon } from '../../assets/ikoner/check-circle-green.svg';
import { ReactComponent as InfoIkon } from '../../assets/ikoner/infomation-circle.svg';
import { ReactComponent as ProblemIkon } from '../../assets/ikoner/report-problem-circle.svg';
import SmaaIkon from '../SmaaIkon/SmaaIkon';

const StatusIkon: FunctionComponent<{ status: string }> = ({ status }) => {
    let ikon;
    switch (status) {
        case 'Påbegynt':
            ikon = <InfoIkon />;
            break;
        case 'Klar for oppstart':
            ikon = <CheckIkon />;
            break;
        case 'Mangler godkjenning':
            ikon = <ProblemIkon />;
            break;
        case 'Avsluttet':
            ikon = <CheckIkon />;
            break;
    }

    return <>{ikon}</>;
};

export default StatusIkon;
