import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import MaalOppsummering from '../maalOppsummering/MaalOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringArbeidstrening: FunctionComponent<Props> = props => (
    <>
        <DeltakerInfo oppsummeringside={true} />
        <Avtaleparter avtaleinnhold={props.avtaleinnhold} />
        <MaalOppsummering {...props.avtaleinnhold} />
        <StillingsOppsummering {...props.avtaleinnhold} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringArbeidstrening;
