import * as React from 'react';
import { FunctionComponent } from 'react';
import BEMHelper from '../../../../utils/bem';
import { Oppfolging } from '../../../avtale';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './OppfolgingOppsummering.less';
import OppfølgingIkon from './OppfølgingIkon';

const cls = BEMHelper('oppfolging');

const OppfolgingOppsummering: FunctionComponent<Oppfolging> = ({
    oppfolging,
}) => (
    <Stegoppsummering ikon={<OppfølgingIkon />} tittel="Oppfølging">
        <div className={cls.className}>
            <SjekkOmVerdiEksisterer
                clsName={cls.className}
                verdi={oppfolging}
            />
        </div>
    </Stegoppsummering>
);

export default OppfolgingOppsummering;
