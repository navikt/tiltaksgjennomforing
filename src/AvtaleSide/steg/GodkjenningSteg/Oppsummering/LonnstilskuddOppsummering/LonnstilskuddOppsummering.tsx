import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

interface Props {}

const LonnstilskuddOppsummering: FunctionComponent<Props> = () => (
    <Stegoppsummering tittel="Lønnstilskudd og varighet">
        <div>
            <SjekkOmVerdiEksisterer verdi={''} />
        </div>
    </Stegoppsummering>
);

export default LonnstilskuddOppsummering;
