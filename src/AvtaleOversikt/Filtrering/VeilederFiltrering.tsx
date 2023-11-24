import { DeltakerOgBedriftFilter } from '@/AvtaleOversikt/Filtrering/DeltakerOgBedriftFilter';
import StatusFilter from '@/AvtaleOversikt/Filtrering/StatusFilter';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import BEMHelper from '@/utils/bem';
import React, { FunctionComponent } from 'react';
import './Filtrering.less';

const cls = BEMHelper('filtrering');

const VeilederFiltrering: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <DeltakerOgBedriftFilter />
            <TiltakstypeFilter erBeslutter={false} />
            <StatusFilter />
        </div>
    );
};

export default VeilederFiltrering;
