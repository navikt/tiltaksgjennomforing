import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import React, { FunctionComponent } from 'react';
import { FiltreringProps } from './VeilederFiltrering';
import TilskuddPeriodeStatusFilter from '@/AvtaleOversikt/Filtrering/TilskuddPeriodeStatusFilter';
import BEMHelper from '@/utils/bem';

const cls = BEMHelper('filtrering');
const BeslutterFiltrering: FunctionComponent<FiltreringProps> = props => {
    return (
        <div className={cls.className}>
            <TilskuddPeriodeStatusFilter {...props} />
            <TiltakstypeFilter {...props} />
        </div>
    );
};

export default BeslutterFiltrering;
