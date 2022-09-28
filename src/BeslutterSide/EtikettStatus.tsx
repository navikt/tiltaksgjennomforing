import { tilskuddsperiodeStatusTekst } from '@/messages';
import { Tag, TagProps } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { TilskuddPeriodeStatus } from '@/types/avtale';

type Props = {
    tilskuddsperiodestatus: TilskuddPeriodeStatus;
    antallKlarTilgodkjenning?: number;
    godkjentAv?: string;
};

const etikettStatus: { [key in TilskuddPeriodeStatus]: TagProps['variant'] } = {
    AVSLÅTT: 'error',
    ANNULLERT: 'warning',
    GODKJENT: 'success',
    UBEHANDLET: 'info',
    UTBETALT: 'success',
};

const EtikettStatus: FunctionComponent<Props> = (props) => {
    return (
        <Tag variant={etikettStatus[props.tilskuddsperiodestatus]}>
            <>
                {props.antallKlarTilgodkjenning && props.antallKlarTilgodkjenning + ' '}
                {tilskuddsperiodeStatusTekst[props.tilskuddsperiodestatus]}
                {props.godkjentAv && <> av {props.godkjentAv}</>}
            </>
        </Tag>
    );
};

export default EtikettStatus;
