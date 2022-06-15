import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import RelasjonerOppsummering
    from "@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/RelasjonerOppsummering/RelasjonerOppsummering";
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";
import InkluderingstilskuddOppsummering from '../InkluderingstilskuddOppsummering/InkluderingstilskuddOppsummering';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringInkluderingstilskudd: FunctionComponent<Props> = props => (
    <>
        <RelasjonerOppsummering {...props.avtaleinnhold} />
        <VerticalSpacer rem={2.5} />
        <InkluderingstilskuddOppsummering {...props.avtaleinnhold} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringInkluderingstilskudd;
