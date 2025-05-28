import React from 'react';
import { TilskuddsPeriode } from '@/types/avtale';
import { addDays, getYear, isWithinInterval } from 'date-fns';
import { BodyShort, Table } from '@navikt/ds-react';
import { formaterDato, formaterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formaterPenger, IKKE_NOE_BELOP_TEGN } from '@/utils';

interface Props {
    avtaleOpprettet: Date;
    erNavAnsatt: boolean;
    periode: TilskuddsPeriode;
    kreverOppfølgingDato?: Date | undefined;
}

const TilskuddsperiodeRadVtao = (props: Props) => {
    const { avtaleOpprettet, erNavAnsatt, periode, kreverOppfølgingDato } = props;
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
                <Table.DataCell textSize="small">
                    <EtikettStatus tilskuddsperiodestatus={periodeStatus} size="small" />
                </Table.DataCell>
            )}
            <Table.DataCell align="right" textSize="small">
                {formaterPenger(periode.beløp, IKKE_NOE_BELOP_TEGN)}
            </Table.DataCell>
            <Table.DataCell textSize="small">
                {formaterDato(addDays(new Date(periode.sluttDato), 3), NORSK_DATO_FORMAT)}
            </Table.DataCell>
        </Table.Row>
    );
};

export default TilskuddsperiodeRadVtao;
