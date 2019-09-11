import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import Godkjenning from './Godkjenning';
import GodkjenningStatus from './GodkjenningStatus/GodkjenningStatus';
import Oppsummering from './Oppsummering/oppsummering/Oppsummering';

const GodkjenningSteg = (props: Context) => (
    <>
        <Oppsummering avtale={props.avtale} rolle={props.rolle} />
        <Godkjenning
            avtale={props.avtale}
            rolle={props.rolle}
            endreGodkjenning={props.godkjenn}
            godkjennPaVegne={props.godkjennPaVegne}
        />
        <GodkjenningStatus avtale={props.avtale} />
    </>
);

export default medContext(GodkjenningSteg);
