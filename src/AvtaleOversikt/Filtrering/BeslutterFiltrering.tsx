import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import React, { FunctionComponent } from 'react';
import { FiltreringProps } from './VeilederFiltrering';
import TilskuddPeriodeStatusFilter from '@/AvtaleOversikt/Filtrering/TilskuddPeriodeStatusFilter';
import BEMHelper from '@/utils/bem';
import { BedriftFilter } from '@/AvtaleOversikt/Filtrering/BedriftFilter';
import Sortering from "@/AvtaleOversikt/Sortering";

const cls = BEMHelper('filtrering');
const BeslutterFiltrering: FunctionComponent<FiltreringProps> = props => {
    return (
        <div className={cls.className}>
            <Sortering endreSøk={props.endreSøk} />
            <BedriftFilter {...props} />
            <TilskuddPeriodeStatusFilter {...props} />
            <TiltakstypeFilter {...props} erBeslutter={true} />
        </div>
    );
};

export default BeslutterFiltrering;
