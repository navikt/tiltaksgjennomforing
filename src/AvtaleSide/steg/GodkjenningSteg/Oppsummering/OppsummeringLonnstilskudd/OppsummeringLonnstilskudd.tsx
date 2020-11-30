import OppfolgingOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/oppfølging/OppfolgingOppsummering';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import BeregningTilskuddOppsummering from '../BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import RelasjonerOppsummering from '../RelasjonerOppsummering/RelasjonerOppsummering';
import StillingsOppsummeringLonnstilskudd from '../StillingsOppsummeringLonnstilskudd/StillingsOppsummeringLonnstilskudd';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import TilskuddsPerioderOppsummering from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderOppsummering';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringLonnstilskudd: FunctionComponent<Props> = props => (
    <>
        <RelasjonerOppsummering {...props.avtaleinnhold} />
        <VerticalSpacer rem={2.5} />
        <StillingsOppsummeringLonnstilskudd {...props.avtaleinnhold} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
        <BeregningTilskuddOppsummering {...props.avtaleinnhold} />
        <TilskuddsPerioderOppsummering />
    </>
);

export default OppsummeringLonnstilskudd;
