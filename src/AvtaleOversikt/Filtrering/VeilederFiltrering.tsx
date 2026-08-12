import { DeltakerOgBedriftFilter } from '@/AvtaleOversikt/Filtrering/DeltakerOgBedriftFilter';
import StatusFilter from '@/AvtaleOversikt/Filtrering/StatusFilter';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import BEMHelper from '@/utils/bem';
import React, { FunctionComponent } from 'react';
import './Filtrering.less';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

const cls = BEMHelper('filtrering');

const VeilederFiltrering: FunctionComponent = () => {
    const { endreFilter, filtre } = useFilter();
    return (
        <div className={cls.className}>
            <DeltakerOgBedriftFilter />
            <TiltakstypeFilter filtre={filtre} endreFilter={endreFilter} erBeslutter={false} />
            <StatusFilter />
        </div>
    );
};

export default VeilederFiltrering;
