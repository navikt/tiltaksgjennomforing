import { tilskuddsperiodeStatusTekst } from '@/messages';
import { Tag, TagProps } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { TilskuddPeriodeRefusjonStatus, TilskuddPeriodeStatus } from '@/types/avtale';

type Props = {
    tilskuddsperiodestatus: TilskuddPeriodeStatus;
    refusjonStatus?: TilskuddPeriodeRefusjonStatus;
    antallKlarTilgodkjenning?: number;
    godkjentAv?: string;
};

const etikettStatus: { [key in TilskuddPeriodeStatus]: TagProps['variant'] } = {
    AVSLÅTT: 'error',
    ANNULLERT: 'warning',
    GODKJENT: 'success',
    UBEHANDLET: 'info',
    BEHANDLET_I_ARENA: 'info'
};

const EtikettStatus: FunctionComponent<Props> = (props) => {
    if (props.refusjonStatus === 'UTBETALT') {
        return <Tag variant={'success'}>Utbetalt</Tag>;
    } else {
        return (
            <Tag variant={etikettStatus[props.tilskuddsperiodestatus]}>
                <>
                    {props.antallKlarTilgodkjenning && props.antallKlarTilgodkjenning + ' '}
                    {tilskuddsperiodeStatusTekst[props.tilskuddsperiodestatus]}
                    {props.godkjentAv && <> av {props.godkjentAv}</>}
                </>
            </Tag>
        );
    }
};

export default EtikettStatus;
