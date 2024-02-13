import SjekkOmVerdiEksisterer from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import TekstMedLinjeskift from '@/komponenter/TekstMedLinjeskift';
import { Stilling } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import OppgaverIkon from './OppgaverIkon';

const ArbeidsoppgaverOppsummering: FunctionComponent<Stilling> = (props) => (
    <Stegoppsummering ikon={<OppgaverIkon />} tittel="Arbeidsoppgaver">
        <SjekkOmVerdiEksisterer
            verdi={props.arbeidsoppgaver}
            formatertVerdi={<TekstMedLinjeskift tekst={props.arbeidsoppgaver} />}
        />
    </Stegoppsummering>
);

export default ArbeidsoppgaverOppsummering;
