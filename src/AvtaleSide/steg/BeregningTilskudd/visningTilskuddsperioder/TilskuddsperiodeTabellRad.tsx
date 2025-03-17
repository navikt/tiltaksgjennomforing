import React from 'react';
import { TilskuddsPeriode } from '@/types/avtale';
import { addDays, getYear, isWithinInterval } from 'date-fns';
import { BodyShort, Table } from '@navikt/ds-react';
import { formaterDato, formaterPeriode } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formaterPenger } from '@/utils';

const TilskuddsperiodeRad: React.FC<{
    avtaleOpprettet: Date;
    erNavAnsatt: boolean;
    periode: TilskuddsPeriode;
    kreverOppfølgingDato?: Date | undefined;
}> = ({ avtaleOpprettet, erNavAnsatt, periode, kreverOppfølgingDato }) => {
    const periodeAar = getYear(new Date(periode.startDato));
    // Hvis tilskuddsperioden gjelder for et tidligere år enn når avtalen er opprettet,
    // så vil vi vise en liten notis om at VTAO-satsen er basert på et lavere beløp
    const erITidligereAar = periodeAar < getYear(avtaleOpprettet);

    const periodeStatus =
        kreverOppfølgingDato &&
        isWithinInterval(kreverOppfølgingDato, { start: periode.startDato, end: periode.sluttDato })
            ? 'OPPFØLGING_KREVES'
            : periode.status;

    return (
        <Table.Row>
            <Table.DataCell textSize="small">
                <BodyShort size="small">{formaterPeriode(periode.startDato, periode.sluttDato)}</BodyShort>
                {erITidligereAar && (
                    <BodyShort size="small" textColor="subtle">
                        Sats for {periodeAar}
                    </BodyShort>
                )}
            </Table.DataCell>
            {erNavAnsatt && (
                <Table.DataCell textSize={'small'}>
                    <EtikettStatus tilskuddsperiodestatus={periodeStatus} size="small" />
                </Table.DataCell>
            )}
            <Table.DataCell align={'right'} textSize={'small'}>
                {periode.beløp !== null ? formaterPenger(periode.beløp) : '—'}
            </Table.DataCell>
            <Table.DataCell textSize={'small'}>
                {formaterDato(addDays(new Date(periode.sluttDato), 3).toString(), 'dd MMM yyyy')}
            </Table.DataCell>
        </Table.Row>
    );
};

export default TilskuddsperiodeRad;
