import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { Stilling } from '@/types/avtale';
import { Element } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const StillingsOppsummering: FunctionComponent<Stilling> = props => (
    <Stegoppsummering tittel="Stilling">
        <Element>Stillingstittel</Element>
        <SjekkOmVerdiEksisterer verdi={props.stillingtype} />
        <VerticalSpacer sixteenPx={true} />
        <Element>Arbeidsoppgaver</Element>
        <SjekkOmVerdiEksisterer verdi={props.arbeidsoppgaver} />
    </Stegoppsummering>
);

export default StillingsOppsummering;
