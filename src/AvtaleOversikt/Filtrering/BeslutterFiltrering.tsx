import EtterRegistrering from '@/AvtaleOversikt/EtterRegistrering/EtterRegistrering';
import TilskuddPeriodeStatusFilter from '@/AvtaleOversikt/Filtrering/TilskuddPeriodeStatusFilter';
import BEMHelper from '@/utils/bem';
import { FunctionComponent } from 'react';
import { DeltakerOgBedriftFilterGammel } from './GammelFiltrering/DeltakerOgBedriftFilterGammel';
import { useFilterGammel } from '@/AvtaleOversikt/Filtrering/GammelFiltrering/useFilterGammel';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';

const cls = BEMHelper('filtrering');
const BeslutterFiltrering: FunctionComponent = () => {
    const { endreFilter, filtre } = useFilterGammel();
    return (
        <div className={cls.className}>
            <EtterRegistrering />
            <DeltakerOgBedriftFilterGammel />
            <TilskuddPeriodeStatusFilter />
            <TiltakstypeFilter filtre={filtre} endreFilter={endreFilter} erBeslutter={true} />
        </div>
    );
};

export default BeslutterFiltrering;
