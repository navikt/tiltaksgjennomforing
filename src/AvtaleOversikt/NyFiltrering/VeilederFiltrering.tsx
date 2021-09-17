import StatusFilter from '@/AvtaleOversikt/NyFiltrering/StatusFilter';
import TiltakstypeFilter from '@/AvtaleOversikt/NyFiltrering/TiltakstypeFilter';
import BEMHelper from '@/utils/bem';
import React, { FunctionComponent } from 'react';
import './Filtrering.less';
import { NavEnhet } from '@/types/innlogget-bruker';
import Sortering from '@/AvtaleOversikt/NyFiltrering/Sortering';
import { DeltakerOgBedriftFilter } from '@/AvtaleOversikt/NyFiltrering/DeltakerOgBedriftFilter';

const cls = BEMHelper('filtrering');

export type FiltreringProps = {
    navEnheter?: NavEnhet[];
};

const VeilederFiltrering: FunctionComponent<FiltreringProps> = (props) => {
    return (
        <div className={cls.className}>
            <Sortering />
            <DeltakerOgBedriftFilter />
            <TiltakstypeFilter erBeslutter={false} />
            <StatusFilter />
        </div>
    );
};

export default VeilederFiltrering;
