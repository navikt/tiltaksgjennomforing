import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import { Avtaleinnhold } from '@/types/avtale';
import { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringVTAO: FunctionComponent<Props> = (props) => (
    <>
        <DeltakerInfo oppsummeringside={true} />
        <Avtaleparter avtaleinnhold={props.avtaleinnhold} />
    </>
);

export default OppsummeringVTAO;
