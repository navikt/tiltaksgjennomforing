import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import { Avtaleinnhold } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import Avtaleparter from '../Avtaleparter/Avtaleparter';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import VarighetOppsummering from '../varighet/VarighetOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import StillingsOppsummering from '../StillingsOppsummering/StillingsOppsummering';
import RelasjonerOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/RelasjonerOppsummering/RelasjonerOppsummering';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Label } from '@navikt/ds-react';
import SjekkOmVerdiEksisterer from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import { stillingstype } from '@/messages';

interface Props {
    avtaleinnhold: Avtaleinnhold;
}

const OppsummeringVTAO: FunctionComponent<Props> = (props) => (
    <>
        <DeltakerInfo oppsummeringside={true} />
        <Avtaleparter avtaleinnhold={props.avtaleinnhold} />
        <RelasjonerOppsummering {...props.avtaleinnhold} />
        <VerticalSpacer rem={2.5} />
        <StillingsOppsummering {...props.avtaleinnhold} />
        <Label>Stillingstype</Label>
        <SjekkOmVerdiEksisterer
            verdi={props.avtaleinnhold.stillingstype}
            formatertVerdi={stillingstype[props.avtaleinnhold.stillingstype!]}
        />
        <VerticalSpacer rem={2.5} />
        <VarighetOppsummering {...props.avtaleinnhold} />
        <OppfolgingOppsummering {...props.avtaleinnhold} />
        <Tilrettelegging {...props.avtaleinnhold} />
    </>
);

export default OppsummeringVTAO;
