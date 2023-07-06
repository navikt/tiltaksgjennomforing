import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import React, { FunctionComponent } from 'react';
import TilskuddPeriodeStatusFilter from '@/AvtaleOversikt/Filtrering/TilskuddPeriodeStatusFilter';
import BEMHelper from '@/utils/bem';
import Sortering from '@/AvtaleOversikt/Sortering';
import EtterRegistrering from '@/AvtaleOversikt/EtterRegistrering/EtterRegistrering';
import { DeltakerOgBedriftFilter } from './DeltakerOgBedriftFilter';

const cls = BEMHelper('filtrering');
const BeslutterFiltrering: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <EtterRegistrering />
            <Sortering />
            <DeltakerOgBedriftFilter />
            <TilskuddPeriodeStatusFilter />
            <TiltakstypeFilter erBeslutter={true} />
        </div>
    );
};

export default BeslutterFiltrering;
