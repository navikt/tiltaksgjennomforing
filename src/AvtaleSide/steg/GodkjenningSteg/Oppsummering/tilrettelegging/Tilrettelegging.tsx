import React, { FunctionComponent } from 'react';
import { Tilrettelegging as TilretteleggingInfo } from '@/types/avtale';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import TilretteleggingIkon from './TilretteleggingIkon';
import TekstMedLinjeskift from '@/komponenter/TekstMedLinjeskift';

const Tilrettelegging: FunctionComponent<TilretteleggingInfo> = props => (
    <Stegoppsummering ikon={<TilretteleggingIkon />} tittel="Tilrettelegging">
        <SjekkOmVerdiEksisterer
            verdi={props.tilrettelegging}
            formatertVerdi={<TekstMedLinjeskift tekst={props.tilrettelegging} />}
        />
    </Stegoppsummering>
);

export default Tilrettelegging;
