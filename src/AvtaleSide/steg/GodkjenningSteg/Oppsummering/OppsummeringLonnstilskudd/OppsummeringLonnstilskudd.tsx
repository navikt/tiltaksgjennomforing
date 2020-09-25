import OppfolgingOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/oppfølging/OppfolgingOppsummering';
import { AltAvtaleinnhold, LonnstilskuddAvtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import BeregningTilskuddOppsummering from '../BeregningTilskuddOppsummering/BeregningTilskuddOppsummering';
import RelasjonerOppsummering from '../RelasjonerOppsummering/RelasjonerOppsummering';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';

interface Props {
    // Burde hatt typen LonnstilskuddAvtaleinnhold, og droppet typesetting av prop under, men fikk problemer :/
    avtaleinnhold: AltAvtaleinnhold;
}

const OppsummeringLonnstilskudd: FunctionComponent<Props> = (props: { avtaleinnhold: LonnstilskuddAvtaleinnhold }) => (
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
