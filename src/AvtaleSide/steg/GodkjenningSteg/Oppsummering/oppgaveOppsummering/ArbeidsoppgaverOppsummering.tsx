import * as React from 'react';
import { FunctionComponent } from 'react';
import { Stilling } from '@/types/avtale';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import OppgaverIkon from './OppgaverIkon';
import SjekkOmVerdiEksisterer from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import TekstMedLinjeskift from '@/komponenter/TekstMedLinjeskift';

const ArbeidsoppgaverOppsummering: FunctionComponent<Stilling> = props => (
    <Stegoppsummering ikon={<OppgaverIkon />} tittel="Arbeidsoppgaver">
        <SjekkOmVerdiEksisterer
            verdi={props.arbeidsoppgaver}
            formatertVerdi={<TekstMedLinjeskift tekst={props.arbeidsoppgaver} />}
        />
    </Stegoppsummering>
);

export default ArbeidsoppgaverOppsummering;
