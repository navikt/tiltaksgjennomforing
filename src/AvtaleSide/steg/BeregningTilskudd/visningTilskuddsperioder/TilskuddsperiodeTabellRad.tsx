import React from 'react';
import { TilskuddsPeriode } from '@/types/avtale';
import { Table } from '@navikt/ds-react';
import { formaterPeriode } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formaterPenger, IKKE_NOE_BELOP_TEGN } from '@/utils/PengeUtils';
import './TilskuddsperiodeTabellRad.less';
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';

const cls = BEMHelper('tilskuddsperioder-tabell-rad');

interface Props {
    periode: TilskuddsPeriode;
    erNavAnsatt: boolean;
    tiltakstype: string;
    nyProsent?: boolean;
}

const TilskuddsperiodeTabellRad = (props: Props) => {
    const { periode, erNavAnsatt, tiltakstype, nyProsent } = props;
    const prosentStrek = classNames({
        [cls.element('ny-prosentsats')]: nyProsent,
    });

    const getProsentText = (): string | null => {
        if (tiltakstype === 'VARIG_LONNSTILSKUDD' && periode.status !== 'BEHANDLET_I_ARENA') {
            return `${periode.lonnstilskuddProsent}%`;
        }
        if (tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || tiltakstype === 'SOMMERJOBB') {
            return `${periode.lonnstilskuddProsent}%`;
        }
        return null;
    };

    return (
        <Table.Row className={prosentStrek}>
            <Table.DataCell textSize="small">{formaterPeriode(periode.startDato, periode.sluttDato)}</Table.DataCell>
            {erNavAnsatt && (
                <Table.DataCell textSize="small">
                    <EtikettStatus tilskuddsperiodestatus={periode.status} size="small" />
                </Table.DataCell>
            )}
            <Table.DataCell textSize="small">{getProsentText()}</Table.DataCell>
            <Table.DataCell textSize="small">{formaterPenger(periode.beløp, IKKE_NOE_BELOP_TEGN)}</Table.DataCell>
        </Table.Row>
    );
};

export default TilskuddsperiodeTabellRad;
