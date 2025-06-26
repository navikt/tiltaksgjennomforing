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
    returnertSomKanBehandles?: boolean;
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
    const {
        refusjonStatus,
        antallKlarTilgodkjenning = 0,
        tilskuddsperiodestatus,
        size,
        godkjentAv,
        returnertSomKanBehandles,
    } = props;

    if (refusjonStatus === 'UTBETALT') {
        return (
            <Tag className="etikett-status" variant="success">
                Utbetalt
            </Tag>
        );
    }

    if (['GODKJENT', 'AVSLÅTT'].includes(tilskuddsperiodestatus)) {
        return (
            <Tag className="etikett-status" variant={etikettStatus[tilskuddsperiodestatus]} size={size}>
                {tilskuddsperiodeStatusTekst[tilskuddsperiodestatus]}
                {godkjentAv && <> av {godkjentAv}</>}
            </Tag>
        );
    }

    if (returnertSomKanBehandles) {
        return (
            <Tag className="etikett-status" variant="warning" size={size}>
                Returnert
                {antallKlarTilgodkjenning > 0 && ' (' + antallKlarTilgodkjenning + ' ub.)'}
            </Tag>
        );
    }

    return (
        <Tag className="etikett-status" variant={etikettStatus[tilskuddsperiodestatus]} size={size}>
            {antallKlarTilgodkjenning > 0 && antallKlarTilgodkjenning + ' '}
            {tilskuddsperiodeStatusTekst[tilskuddsperiodestatus]}
        </Tag>
    );
};

export default EtikettStatus;
