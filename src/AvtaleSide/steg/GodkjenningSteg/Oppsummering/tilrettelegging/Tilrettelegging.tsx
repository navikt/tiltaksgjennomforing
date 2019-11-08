import React, { FunctionComponent } from 'react';
import BEMHelper from '@/utils/bem';
import { Tilrettelegging as TilretteleggingInfo } from '@/types/avtale';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './tilrettelegging.less';
import TilretteleggingIkon from './TilretteleggingIkon';

const cls = BEMHelper('tilrettelegging');

const Tilrettelegging: FunctionComponent<TilretteleggingInfo> = props => (
    <Stegoppsummering ikon={<TilretteleggingIkon />} tittel="Tilrettelegging">
        <div className={cls.className}>
            <SjekkOmVerdiEksisterer verdi={props.tilrettelegging} clsName="tilrettelegging" />
        </div>
    </Stegoppsummering>
);

export default Tilrettelegging;
