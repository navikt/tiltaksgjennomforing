import { tilskuddsperiodeStatusTekst } from '@/messages';
import EtikettBase, { EtikettBaseProps } from 'nav-frontend-etiketter';
import React, { FunctionComponent } from 'react';
import { TilskuddPeriodeRefusjonStatus, TilskuddPeriodeStatus } from '@/types/avtale';
import Refusjon from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/Refusjon';

type Props = {
    tilskuddsperiodestatus: TilskuddPeriodeStatus;
    refusjonStatus?: TilskuddPeriodeRefusjonStatus;
    antallKlarTilgodkjenning?: number;
    godkjentAv?: string
};

const etikettStatus: { [key in TilskuddPeriodeStatus]: EtikettBaseProps['type'] } = {
    AVSLÅTT: 'advarsel',
    ANNULLERT: 'fokus',
    GODKJENT: 'suksess',
    UBEHANDLET: 'info',
};

const EtikettStatus: FunctionComponent<Props> = (props) => {
    if(props.refusjonStatus === 'UTBETALT') {
        return (
            <EtikettBase type='suksess'>
                Utbetalt
            </EtikettBase>
        )
    } else {
        return (
            <EtikettBase type={etikettStatus[props.tilskuddsperiodestatus]}>
                <>
                    {props.antallKlarTilgodkjenning && props.antallKlarTilgodkjenning + ' '}
                    {tilskuddsperiodeStatusTekst[props.tilskuddsperiodestatus]}
                    {props.godkjentAv && (
                        <>{' '}av {props.godkjentAv}</>
                    )}
                </>
            </EtikettBase>
        );
    }


};

export default EtikettStatus;
