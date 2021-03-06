import { tilskuddsperiodeStatusTekst } from '@/messages';
import EtikettBase, { EtikettBaseProps } from 'nav-frontend-etiketter';
import React, { FunctionComponent } from 'react';
import { TilskuddPeriodeStatus } from '../types/avtale';

type Props = {
    tilskuddsperiodestatus: TilskuddPeriodeStatus;
};

const etikettStatus: { [key in TilskuddPeriodeStatus]: EtikettBaseProps['type'] } = {
    AVSLÅTT: 'advarsel',
    ANNULLERT: 'fokus',
    GODKJENT: 'suksess',
    UBEHANDLET: 'info',
    UTBETALT: 'suksess',
};

const EtikettStatus: FunctionComponent<Props> = props => {
    return (
        <EtikettBase type={etikettStatus[props.tilskuddsperiodestatus]}>
            {tilskuddsperiodeStatusTekst[props.tilskuddsperiodestatus]}
        </EtikettBase>
    );
};

export default EtikettStatus;
