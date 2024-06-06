import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';
import RelasjonerOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/RelasjonerOppsummering/RelasjonerOppsummering';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringVTAO: FunctionComponent<Props> = (props) => (
    <>
        <DeltakerInfo oppsummeringside={true} />
        <RelasjonerOppsummering {...props.avtaleinnhold} />
        <Avtaleparter avtaleinnhold={props.avtaleinnhold} />
        <StillingsOppsummering {...props.avtaleinnhold} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringVTAO;
