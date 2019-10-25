import { Context, medContext } from '@/AvtaleContext';
import * as React from 'react';
import Godkjenning from './Godkjenning';
import Oppsummering from './Oppsummering/oppsummering/Oppsummering';
import AvtaleStatus from '../AvtaleStatus/AvtaleStatus';
import RestService from '@/services/rest-service';
import { useEffect, useState } from 'react';
import AvtaleStatusDetaljer from '@/types/avtale-status-detaljer';

type Props = {
    oppsummering: JSX.Element;
};

const GodkjenningSteg: React.FunctionComponent<Props & Context> = props => {
    const [avtaleStatusDetaljer, setAvtaleStatusDetaljer] = useState<
        AvtaleStatusDetaljer | undefined
    >(undefined);
    useEffect(() => {
        RestService.hentAvtaleStatusDetaljer(props.avtale.id).then(
            setAvtaleStatusDetaljer
        );
    }, []);
    if (!avtaleStatusDetaljer) {
        return null;
    }
    return (
        <>
            <AvtaleStatus
                avtale={props.avtale}
                rolle={props.rolle}
                avtaleStatusDetaljer={avtaleStatusDetaljer}
            />
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
};
export default medContext(GodkjenningSteg);
