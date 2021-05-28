import TekstMedLinjeskift from '@/komponenter/TekstMedLinjeskift';
import { Oppfolging } from '@/types/avtale';
import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import OppfolgingIkon from './OppfolgingIkon';

const OppfolgingOppsummering: FunctionComponent<Oppfolging> = ({ oppfolging }) => (
    <Stegoppsummering ikon={<OppfolgingIkon />} tittel="Oppfølging">
        <SjekkOmVerdiEksisterer verdi={oppfolging} formatertVerdi={<TekstMedLinjeskift tekst={oppfolging} />} />
    </Stegoppsummering>
);

export default OppfolgingOppsummering;
