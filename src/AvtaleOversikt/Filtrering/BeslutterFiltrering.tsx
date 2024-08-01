import EtterRegistrering from '@/AvtaleOversikt/EtterRegistrering/EtterRegistrering';
import TilskuddPeriodeStatusFilter from '@/AvtaleOversikt/Filtrering/TilskuddPeriodeStatusFilter';
import BEMHelper from '@/utils/bem';
import { FunctionComponent } from 'react';
import { DeltakerOgBedriftFilterGammel } from './GammelFiltrering/DeltakerOgBedriftFilterGammel';
import TiltakstypeFilterGammel from './GammelFiltrering/TiltakstypeFilterGamel';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';

const cls = BEMHelper('filtrering');
const BeslutterFiltrering: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <EtterRegistrering />
            <DeltakerOgBedriftFilterGammel />
            <TilskuddPeriodeStatusFilter />
            <TiltakstypeFilter erBeslutter={true} />
        </div>
    );
};

export default BeslutterFiltrering;
