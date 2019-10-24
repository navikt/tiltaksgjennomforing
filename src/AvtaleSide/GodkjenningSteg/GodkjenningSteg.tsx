import { Context, medContext } from '@/AvtaleContext';
import * as React from 'react';
import Godkjenning from './Godkjenning';
import GodkjenningStatus from './GodkjenningStatus/GodkjenningStatus';
import Oppsummering from './Oppsummering/oppsummering/Oppsummering';
import AvtaleStatus from '../AvtaleStatus/AvtaleStatus';

type Props = {
    oppsummering: JSX.Element;
};

const GodkjenningSteg: React.FunctionComponent<Props & Context> = props => (
    <>
        <AvtaleStatus avtale={props.avtale} rolle={props.rolle} />
        <Oppsummering avtale={props.avtale} rolle={props.rolle} />
        {props.oppsummering}
        <Godkjenning
            avtale={props.avtale}
            rolle={props.rolle}
            endreGodkjenning={props.godkjenn}
            godkjennPaVegne={props.godkjennPaVegne}
        />
        {/* <GodkjenningStatus avtale={props.avtale} /> */}
    </>
);

export default medContext(GodkjenningSteg);
