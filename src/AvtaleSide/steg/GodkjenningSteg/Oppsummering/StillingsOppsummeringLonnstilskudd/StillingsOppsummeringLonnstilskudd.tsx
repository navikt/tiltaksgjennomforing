import StillingIkon from '@/assets/ikoner/toolbox.svg?react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { stillingstype } from '@/messages';
import { Stilling } from '@/types/avtale';
import { Label } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const StillingsOppsummeringLonnstilskudd: FunctionComponent<Stilling> = (props) => (
    <Stegoppsummering tittel="Stilling" ikon={<StillingIkon />}>
        <Label>Stillingstittel</Label>
        <SjekkOmVerdiEksisterer verdi={props.stillingstittel} />
        <VerticalSpacer rem={2} />
        <Label>Arbeidsoppgaver</Label>
        <SjekkOmVerdiEksisterer verdi={props.arbeidsoppgaver} />
        <VerticalSpacer rem={2} />
        <Label>Stillingstype</Label>
        <SjekkOmVerdiEksisterer verdi={props.stillingstype} formatertVerdi={stillingstype[props.stillingstype!]} />
    </Stegoppsummering>
);

export default StillingsOppsummeringLonnstilskudd;
