import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import React, { FunctionComponent } from 'react';
import { FiltreringProps } from './VeilederFiltrering';

const BeslutterFiltrering: FunctionComponent<FiltreringProps> = props => {
    return <TiltakstypeFilter {...props} />;
};

export default BeslutterFiltrering;
