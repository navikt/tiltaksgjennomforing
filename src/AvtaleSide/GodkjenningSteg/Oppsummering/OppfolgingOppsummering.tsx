import * as React from 'react';
import { Avtale } from '../../avtale';
import Stegoppsummering from './Stegoppsummering/Stegoppsummering';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    avtale: Avtale;
}

const OppfolgingOppsummering = (props: Props) => (
    <Stegoppsummering tittel="Oppfølging">
        <Normaltekst className="oppsummering__label">Oppfolging</Normaltekst>
        <Normaltekst className="oppsummering__beskrivelse">
            {props.avtale.oppfolging || ''}
        </Normaltekst>
        <Normaltekst className="oppsummering__label">
            Tilrettelegging
        </Normaltekst>
        <Normaltekst className="oppsummering__beskrivelse">
            {props.avtale.tilrettelegging || ''}
        </Normaltekst>
    </Stegoppsummering>
);

export default OppfolgingOppsummering;
