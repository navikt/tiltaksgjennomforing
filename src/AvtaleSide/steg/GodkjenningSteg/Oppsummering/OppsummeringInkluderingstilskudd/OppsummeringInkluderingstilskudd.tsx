import RelasjonerOppsummering from "@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/RelasjonerOppsummering/RelasjonerOppsummering";
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";
import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import InkluderingstilskuddOppsummering from '../InkluderingstilskuddOppsummering/InkluderingstilskuddOppsummering';
import StartOgSluttdatoOppsummering from '../InkluderingstilskuddOppsummering/StartOgSluttdatoOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringInkluderingstilskudd: FunctionComponent<Props> = props => (
    <>
        <RelasjonerOppsummering {...props.avtaleinnhold} />
        <VerticalSpacer rem={2.5} />
        <InkluderingstilskuddOppsummering {...props.avtaleinnhold} />
        <StartOgSluttdatoOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringInkluderingstilskudd;
