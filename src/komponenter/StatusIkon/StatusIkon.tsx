import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as CheckIkon } from '../../assets/ikoner/check.svg';
import { ReactComponent as InfoIkon } from '../../assets/ikoner/informasjon.svg';
import { ReactComponent as ProblemIkon } from '../../assets/ikoner/varsel.svg';
import { ReactComponent as InaktivIkon } from '../../assets/ikoner/inaktiv.svg';
import { ReactComponent as AvbruttIkon } from '../../assets/ikoner/stop.svg';

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
        case 'Avbrutt':
            ikon = <ProblemIkon />;
            break;
        case 'Avbrutt':
            ikon = <AvbruttIkon />;
            break;
        case 'Avsluttet':
            ikon = <InaktivIkon />;
            break;
    }
    return <>{ikon}</>;
};

export default StatusIkon;
