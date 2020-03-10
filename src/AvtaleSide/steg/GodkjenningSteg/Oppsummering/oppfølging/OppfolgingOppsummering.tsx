import * as React from 'react';
import { FunctionComponent } from 'react';
import { Oppfolging } from '@/types/avtale';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import OppfolgingIkon from './OppfolgingIkon';
import TekstMedLinjeskift from '@/komponenter/TekstMedLinjeskift';

const OppfolgingOppsummering: FunctionComponent<Oppfolging> = ({ oppfolging }) => (
    <Stegoppsummering ikon={<OppfolgingIkon />} tittel="Oppfølging">
        <SjekkOmVerdiEksisterer verdi={oppfolging} formatertVerdi={<TekstMedLinjeskift tekst={oppfolging} />} />
    </Stegoppsummering>
);

export default OppfolgingOppsummering;
