import { ReactComponent as KalkulatorIkon } from '@/assets/ikoner/kalkulator.svg';
import { Stilling } from '@/types/avtale';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const InkluderingstilskuddOppsummering: FunctionComponent<Stilling> = props => (
    <Stegoppsummering tittel="Inkluderingstilskudd" ikon={<KalkulatorIkon />}>
    <Element>Hvorfor er det behov for inkluderingstilskudd?</Element>
    <Normaltekst>Det er behov for inkluderingstilskudd for å hjelpe deltaker tilbake i jobb og tilrettelegge på arbeidsplassen.</Normaltekst>
    <SjekkOmVerdiEksisterer verdi={props.stillingstittel} />
    </Stegoppsummering>
);

export default InkluderingstilskuddOppsummering;
