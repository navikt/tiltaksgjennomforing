import React, { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

interface Props {}

const BeregningTilskuddOppsummering: FunctionComponent<Props> = () => (
    <Stegoppsummering tittel="Beregning av tilskudd">
        <div>
            <SjekkOmVerdiEksisterer verdi={''} clsName="beregningTilskudd" />
        </div>
    </Stegoppsummering>
);

export default BeregningTilskuddOppsummering;
