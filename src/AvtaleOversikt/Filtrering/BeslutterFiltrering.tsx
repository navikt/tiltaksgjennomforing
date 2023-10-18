import EtterRegistrering from '@/AvtaleOversikt/EtterRegistrering/EtterRegistrering';
import TilskuddPeriodeStatusFilter from '@/AvtaleOversikt/Filtrering/TilskuddPeriodeStatusFilter';
import BEMHelper from '@/utils/bem';
import { FunctionComponent } from 'react';
import { DeltakerOgBedriftFilterGammel } from './GammelFiltrering/DeltakerOgBedriftFilterGammel';
import SorteringGammel from './GammelFiltrering/SorteringGammel';
import TiltakstypeFilterGammel from './GammelFiltrering/TiltakstypeFilterGamel';

const cls = BEMHelper('filtrering');
const BeslutterFiltrering: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <EtterRegistrering />
            <SorteringGammel />
            <DeltakerOgBedriftFilterGammel />
            <TilskuddPeriodeStatusFilter />
            <TiltakstypeFilterGammel erBeslutter={true} />
        </div>
    );
};

export default BeslutterFiltrering;
