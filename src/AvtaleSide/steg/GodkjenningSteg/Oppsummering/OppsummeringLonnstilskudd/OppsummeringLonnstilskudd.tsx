import OppfolgingOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/oppfølging/OppfolgingOppsummering';
import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import BeregningTilskuddOppsummering from '../BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import RelasjonerOppsummering from '../RelasjonerOppsummering/RelasjonerOppsummering';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringLonnstilskudd: FunctionComponent<Props> = props => (
    <>
        <RelasjonerOppsummering {...props.avtaleinnhold} />
        <StillingsOppsummering {...props.avtaleinnhold} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
        <BeregningTilskuddOppsummering {...props.avtaleinnhold} />
    </>
);

export default OppsummeringLonnstilskudd;
