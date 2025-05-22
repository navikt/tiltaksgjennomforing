import React from 'react';
import { TilskuddsPeriode } from '@/types/avtale';
import { Table } from '@navikt/ds-react';
import { formaterPeriode } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formaterPenger, IKKE_NOE_BELOP_TEGN } from '@/utils/PengeUtils';

const TilskuddsperiodeTabellRad: React.FC<{
    index: number;
    periode: TilskuddsPeriode;
    erNavAnsatt: boolean;
    tiltakstype: string;
    nyProsent?: boolean;
}> = ({ index, periode, erNavAnsatt, tiltakstype, nyProsent }) => {
    return (
        <Table.Row
            key={index}
            style={{
                borderTop: nyProsent ? '2px solid gray' : 'undefined',
            }}
        >
            <Table.DataCell textSize="small">{formaterPeriode(periode.startDato, periode.sluttDato)}</Table.DataCell>
            {erNavAnsatt && (
                <Table.DataCell textSize="small">
                    <EtikettStatus tilskuddsperiodestatus={periode.status} size="small" />
                </Table.DataCell>
            )}
            <Table.DataCell textSize="small">
                {tiltakstype === 'VARIG_LONNSTILSKUDD' && periode.status !== 'BEHANDLET_I_ARENA'
                    ? `${periode.lonnstilskuddProsent}%`
                    : tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || tiltakstype === 'SOMMERJOBB'
                      ? `${periode.lonnstilskuddProsent}%`
                      : null}
            </Table.DataCell>
            <Table.DataCell textSize="small">{formaterPenger(periode.beløp, IKKE_NOE_BELOP_TEGN)}</Table.DataCell>
        </Table.Row>
    );
};

export default TilskuddsperiodeTabellRad;
