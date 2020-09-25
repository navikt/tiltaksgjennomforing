import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import React, { FunctionComponent } from 'react';
import { FiltreringProps } from './VeilederFiltrering';

const ArbeidsgiverFiltrering: FunctionComponent<FiltreringProps> = props => {
    return <TiltakstypeFilter {...props} />;
};

export default ArbeidsgiverFiltrering;
