import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

interface Props {}

const StillingsOppsummering: FunctionComponent<Props> = () => (
    <Stegoppsummering tittel="Stilling">
        <div>
            <SjekkOmVerdiEksisterer verdi={''} clsName="stilling" />
        </div>
    </Stegoppsummering>
);

export default StillingsOppsummering;
