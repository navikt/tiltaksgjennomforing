import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import Godkjenning from './Godkjenning';
import GodkjenningStatus from './GodkjenningStatus/GodkjenningStatus';
import Oppsummering from './Oppsummering/Oppsummering';

const GodkjenningSteg = (props: Context) => (
    <>
        <Oppsummering avtale={props.avtale} />
        <Godkjenning
            avtale={props.avtale}
            rolle={props.rolle}
            endreGodkjenning={props.godkjenn}
        />
        <GodkjenningStatus avtale={props.avtale} />
    </>
);

export default medContext<{}>(GodkjenningSteg);
