import React, { useContext, useState } from 'react';
import { Table } from '@navikt/ds-react';
import { TilskuddsPeriode } from '@/types/avtale';
import { formaterPeriode } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formaterPenger } from '@/utils/PengeUtils';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import BEMHelper from '@/utils/bem';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import {
    antallAktiveTilskuddsperioder,
    getIndexVisningForTilskuddsperiode,
} from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';

interface Properties {
    className: string;
}

const VisningTilskuddsperioderTabell: React.FC<Properties> = ({ className }: Properties) => {
    const [visAllePerioder, setVisAllePerioder] = useState(false);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const { startIndexVisning, sluttIndexVisning } = getIndexVisningForTilskuddsperiode(avtale, visAllePerioder);
    const cls = BEMHelper(className);
    return (
        <>
            <Table size={'medium'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textSize={'small'}>Tilskudd for perioder</Table.HeaderCell>
                        {innloggetBruker.erNavAnsatt && <Table.HeaderCell textSize={'small'}>Status</Table.HeaderCell>}
                        <Table.HeaderCell textSize={'small'}>Tilskuddsprosent</Table.HeaderCell>
                        <Table.HeaderCell textSize={'small'}>Inntil</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {avtale.tilskuddPeriode
                        .filter((p: TilskuddsPeriode) => p.aktiv)
                        .map((periode: TilskuddsPeriode, index: number) => {
                            const nyProsent: boolean =
                                index > 0
                                    ? avtale.tilskuddPeriode[index - 1].lonnstilskuddProsent !==
                                      periode.lonnstilskuddProsent
                                    : false;
                            if (index < startIndexVisning || index > sluttIndexVisning) {
                                return null;
                            } else if (index !== 0 && (index === startIndexVisning || index === sluttIndexVisning)) {
                                return (
                                    <Table.Row key={index}>
                                        <Table.DataCell textSize={'small'} colSpan={100}>
                                            ...
                                        </Table.DataCell>
                                    </Table.Row>
                                );
                            }
                            return (
                                <Table.Row
                                    key={index}
                                    style={{
                                        borderTop: nyProsent ? '2px solid gray' : 'undefined',
                                    }}
                                >
                                    <Table.DataCell textSize="small">
                                        {formaterPeriode(periode.startDato, periode.sluttDato)}
                                    </Table.DataCell>
                                    {innloggetBruker.erNavAnsatt && (
                                        <Table.DataCell textSize={'small'}>
                                            <EtikettStatus tilskuddsperiodestatus={periode.status} size="small" />
                                        </Table.DataCell>
                                    )}
                                    <Table.DataCell align={'right'} textSize={'small'}>
                                        {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' &&
                                            periode.status !== 'BEHANDLET_I_ARENA' && (
                                                <>{periode.lonnstilskuddProsent}%</>
                                            )}
                                        {(avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                                            avtale.tiltakstype === 'SOMMERJOBB') && (
                                            <>{periode.lonnstilskuddProsent}%</>
                                        )}
                                    </Table.DataCell>
                                    <Table.DataCell textSize={'small'}>{formaterPenger(periode.beløp)}</Table.DataCell>
                                </Table.Row>
                            );
                        })}
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
export default VisningTilskuddsperioderTabell;
