import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Stilling } from '@/types/avtale';
import { Label } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const StillingsOppsummering: FunctionComponent<Stilling> = (props) => (
    <Stegoppsummering tittel="Stilling">
        <Label>Stillingstittel</Label>
        <SjekkOmVerdiEksisterer verdi={props.stillingstittel} />
        <VerticalSpacer rem={2} />
        <Label>Arbeidsoppgaver</Label>
        <SjekkOmVerdiEksisterer verdi={props.arbeidsoppgaver} />
        <VerticalSpacer rem={2} />
    </Stegoppsummering>
);

export default StillingsOppsummering;
