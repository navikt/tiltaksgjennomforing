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
        <VerticalSpacer sixteenPx={true} />
        <Element>Arbeidsoppgaver</Element>
        <SjekkOmVerdiEksisterer verdi={props.arbeidsoppgaver} />
    </Stegoppsummering>
);

export default StillingsOppsummering;
