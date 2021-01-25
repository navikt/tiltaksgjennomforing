import { ReactComponent as StillingIkon } from '@/assets/ikoner/toolbox.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { stillingstype } from '@/messages';
import { Stilling } from '@/types/avtale';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const StillingsOppsummeringLonnstilskudd: FunctionComponent<Stilling> = props => (
    <Stegoppsummering tittel="Stilling" ikon={<StillingIkon />}>
        <Element>Stillingstittel</Element>
        <SjekkOmVerdiEksisterer verdi={props.stillingstittel} />
        <VerticalSpacer rem={2} />
        <Element>Arbeidsoppgaver</Element>
        <SjekkOmVerdiEksisterer verdi={props.arbeidsoppgaver} />
        <VerticalSpacer rem={2} />
        <Element>Stillingstype</Element>
        <SjekkOmVerdiEksisterer verdi={props.stillingstype} formatertVerdi={stillingstype[props.stillingstype!]} />
    </Stegoppsummering>
);

export default StillingsOppsummeringLonnstilskudd;
