import React, { useContext, useState } from 'react';
import { BodyShort, Table } from '@navikt/ds-react';
import { TilskuddsPeriode } from '@/types/avtale';
import { formaterDato, formaterPeriode } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formaterPenger } from '@/utils/PengeUtils';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import BEMHelper from '@/utils/bem';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import { getYear, addDays, isWithinInterval } from 'date-fns';
import {
    antallAktiveTilskuddsperioder,
    getIndexVisningForTilskuddsperiode,
} from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';

interface Properties {
    className: string;
}

const tilskuddsperiodeRad = ({
    key,
    avtaleOpprettet,
    erNavAnsatt,
    periode,
    kreverOppfølgingDato,
}: {
    key?: number;
    avtaleOpprettet: Date;
    erNavAnsatt: boolean;
    periode: TilskuddsPeriode;
    kreverOppfølgingDato?: Date;
}) => {
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
        <Table.Row key={key}>
            <Table.DataCell textSize={'small'}>
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

const VisningTilskuddsperioderTabellVtao: React.FC<Properties> = ({ className }: Properties) => {
    const [visAllePerioder, setVisAllePerioder] = useState(false);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const { startIndexVisning, sluttIndexVisning } = getIndexVisningForTilskuddsperiode(avtale, visAllePerioder);
    const cls = BEMHelper(className);
    const sistePeriode =
        antallAktiveTilskuddsperioder(avtale) - 1 > sluttIndexVisning
            ? avtale.tilskuddPeriode.at(antallAktiveTilskuddsperioder(avtale) - 1)
            : undefined;
    const avtaleOpprettet = new Date(avtale.opprettetTidspunkt);
    const erNavAnsatt = innloggetBruker.erNavAnsatt;

    const kreverOppfølgingDato =
        avtale.kreverOppfolgingFrist !== undefined || avtale.kreverOppfolgingFrist === ''
            ? addDays(avtale.kreverOppfolgingFrist, 1)
            : undefined;

    return (
        <>
            <Table size={'medium'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textSize={'small'}>Tilskudd for perioder</Table.HeaderCell>
                        {innloggetBruker.erNavAnsatt && <Table.HeaderCell textSize={'small'}>Status</Table.HeaderCell>}
                        <Table.HeaderCell textSize={'small'}>Inntil</Table.HeaderCell>
                        <Table.HeaderCell textSize={'small'}>Utbetales</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {avtale.tilskuddPeriode
                        .filter((p: TilskuddsPeriode) => p.aktiv)
                        .slice(startIndexVisning, sluttIndexVisning)
                        .map((periode: TilskuddsPeriode, key: number) => {
                            return tilskuddsperiodeRad({
                                key,
                                periode,
                                avtaleOpprettet,
                                erNavAnsatt,
                                kreverOppfølgingDato,
                            });
                        })}
                    {!visAllePerioder && sistePeriode && (
                        <>
                            <Table.Row key={1}>
                                <Table.DataCell textSize={'small'} colSpan={100}>
                                    ...
                                </Table.DataCell>
                            </Table.Row>
                            {tilskuddsperiodeRad({
                                erNavAnsatt,
                                avtaleOpprettet,
                                periode: sistePeriode,
                                kreverOppfølgingDato,
                            })}
                        </>
                    )}
                </Table.Body>
            </Table>
            <InfoRundtTilskuddsperioder
                className={cls.className}
                gjeldendeInnholdStartdato={avtale.gjeldendeInnhold.startDato}
                gjeldendeInnholdSluttdato={avtale.gjeldendeInnhold.sluttDato}
                antallAktiveTilskuddsperioder={antallAktiveTilskuddsperioder(avtale)}
                setVisAllePerioder={setVisAllePerioder}
                visAllePerioder={visAllePerioder}
            />
        </>
    );
};
export default VisningTilskuddsperioderTabellVtao;
