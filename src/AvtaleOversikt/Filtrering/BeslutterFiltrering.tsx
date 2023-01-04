import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import React, { FunctionComponent } from 'react';
import TilskuddPeriodeStatusFilter from '@/AvtaleOversikt/Filtrering/TilskuddPeriodeStatusFilter';
import BEMHelper from '@/utils/bem';
import { BedriftFilter } from '@/AvtaleOversikt/Filtrering/BedriftFilter';
import Sortering from '@/AvtaleOversikt/Sortering';
import EtterRegistrering from '@/AvtaleOversikt/EtterRegistrering/EtterRegistrering';

const cls = BEMHelper('filtrering');
const BeslutterFiltrering: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <EtterRegistrering />
            <Sortering />
            <BedriftFilter />
            <TilskuddPeriodeStatusFilter />
            <TiltakstypeFilter erBeslutter={true} />
        </div>
    );
};

export default BeslutterFiltrering;
