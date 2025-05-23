import { tilskuddsperiodeStatusTekst } from '@/messages';
import { TilskuddPeriodeRefusjonStatus, TilskuddPeriodeStatus } from '@/types/avtale';
import { Tag, TagProps } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

type Props = {
    tilskuddsperiodestatus: TilskuddPeriodeStatus;
    refusjonStatus?: TilskuddPeriodeRefusjonStatus;
    antallKlarTilgodkjenning?: number;
    godkjentAv?: string;
    size?: TagProps['size'];
};

const etikettStatus: { [key in TilskuddPeriodeStatus]: TagProps['variant'] } = {
    AVSLÅTT: 'error',
    ANNULLERT: 'warning',
    GODKJENT: 'success',
    UBEHANDLET: 'info',
    BEHANDLET_I_ARENA: 'info',
    OPPFØLGING_KREVES: 'warning',
};

const EtikettStatus: FunctionComponent<Props> = (props) => {
    if (props.refusjonStatus === 'UTBETALT') {
        return (
            <Tag className="etikett-status" variant={'success'}>
                Utbetalt
            </Tag>
        );
    } else {
        return (
            <Tag className="etikett-status" variant={etikettStatus[props.tilskuddsperiodestatus]} size={props.size}>
                {props.antallKlarTilgodkjenning && props.antallKlarTilgodkjenning + ' '}
                {tilskuddsperiodeStatusTekst[props.tilskuddsperiodestatus]}
                {props.tilskuddsperiodestatus === 'GODKJENT' && props.godkjentAv && <> av {props.godkjentAv}</>}
            </Tag>
        );
    }
};

export default EtikettStatus;
