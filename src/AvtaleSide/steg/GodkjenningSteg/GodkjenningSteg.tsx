import { Context, medContext } from '@/AvtaleContext';
import * as React from 'react';
import Godkjenning from './Godkjenning';
import AvtaleStatus from '../../AvtaleStatus/AvtaleStatus';

type Props = {
    oppsummering: JSX.Element;
};

const GodkjenningSteg: React.FunctionComponent<Props & Context> = props => {
    return (
        <>
            <AvtaleStatus avtale={props.avtale} rolle={props.rolle} />
            {props.oppsummering}
            <Godkjenning
                avtale={props.avtale}
                rolle={props.rolle}
                endreGodkjenning={props.godkjenn}
                godkjennPaVegne={props.godkjennPaVegne}
            />
        </>
    );
};
export default medContext(GodkjenningSteg);
