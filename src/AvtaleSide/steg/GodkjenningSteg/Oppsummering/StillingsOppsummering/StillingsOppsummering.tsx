import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Stilling } from '@/types/avtale';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const StillingsOppsummering: FunctionComponent<Stilling> = props => (
    <Stegoppsummering tittel="Stilling">
        <Element>Stillingstittel</Element>
        <SjekkOmVerdiEksisterer verdi={props.stillingstittel} />
        <VerticalSpacer rem={2} />
        <Element>Arbeidsoppgaver</Element>
        <SjekkOmVerdiEksisterer verdi={props.arbeidsoppgaver} />
        <VerticalSpacer rem={2} />
    </Stegoppsummering>
);

export default StillingsOppsummering;
