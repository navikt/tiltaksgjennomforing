import React, { useContext, useState } from 'react';
import { Table } from '@navikt/ds-react';
import { TilskuddsPeriode } from '@/types/avtale';
import { formaterPeriode } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formaterPenger, IKKE_NOE_BELOP_TEGN } from '@/utils/PengeUtils';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import BEMHelper from '@/utils/bem';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import {
    antallAktiveTilskuddsperioder,
    getIndexVisningForTilskuddsperiode,
} from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import TilskuddsperiodeTabellRad from './TilskuddsperiodeTabellRad';
import bannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';

interface Properties {
    className: string;
}

const VisningTilskuddsperioderTabell: React.FC<Properties> = ({ className }: Properties) => {
    const [visAllePerioder, setVisAllePerioder] = useState(false);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const { startIndexVisning, sluttIndexVisning } = getIndexVisningForTilskuddsperiode(avtale, visAllePerioder);
    const sistePeriode =
        antallAktiveTilskuddsperioder(avtale) - 1 > sluttIndexVisning
            ? avtale.tilskuddPeriode.at(antallAktiveTilskuddsperioder(avtale) - 1)
            : undefined;
    const cls = BEMHelper(className);
    return (
        <>
            <Table size="medium">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textSize="small">Tilskudd for perioder</Table.HeaderCell>
                        {innloggetBruker.erNavAnsatt && <Table.HeaderCell textSize="small">Status</Table.HeaderCell>}
                        <Table.HeaderCell textSize="small">Tilskuddsprosent</Table.HeaderCell>
                        <Table.HeaderCell textSize="small">Inntil</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <TilskuddsperiodeTabellRad
                        index={0}
                        periode={avtale.tilskuddPeriode.at(0) as TilskuddsPeriode}
                        erNavAnsatt={innloggetBruker.erNavAnsatt}
                        tiltakstype={avtale.tiltakstype}
                    />
                    {startIndexVisning > 1 && (
                        <Table.Row>
                            <Table.DataCell textSize="small" colSpan={100}>
                                ...
                            </Table.DataCell>
                        </Table.Row>
                    )}
                    {avtale.tilskuddPeriode
                        .filter((p: TilskuddsPeriode) => p.aktiv)
                        .slice(startIndexVisning, sluttIndexVisning)
                        .map((periode: TilskuddsPeriode, index: number) => {
                            const nyProsent: boolean =
                                index > 0
                                    ? avtale.tilskuddPeriode[index - 1].lonnstilskuddProsent !==
                                      periode.lonnstilskuddProsent
                                    : false;
                            return (
                                <TilskuddsperiodeTabellRad
                                    index={index}
                                    periode={periode}
                                    erNavAnsatt={innloggetBruker.erNavAnsatt}
                                    tiltakstype={avtale.tiltakstype}
                                    nyProsent={nyProsent}
                                />
                            );
                        })}
                    {!visAllePerioder && sistePeriode && (
                        <>
                            <Table.Row>
                                <Table.DataCell textSize="small" colSpan={100}>
                                    ...
                                </Table.DataCell>
                            </Table.Row>
                            <TilskuddsperiodeTabellRad
                                index={antallAktiveTilskuddsperioder(avtale) - 1}
                                periode={sistePeriode}
                                erNavAnsatt={innloggetBruker.erNavAnsatt}
                                tiltakstype={avtale.tiltakstype}
                            />
                        </>
                    )}
                </Table.Body>
            </Table>
            <VerticalSpacer rem={1} />
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
