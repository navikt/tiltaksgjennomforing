import React, { useContext, useState } from 'react';
import { Table } from '@navikt/ds-react';
import { TilskuddsPeriode } from '@/types/avtale';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import BEMHelper from '@/utils/bem';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import { addDays } from 'date-fns';
import {
    antallAktiveTilskuddsperioder,
    getIndexVisningForTilskuddsperiode,
} from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import TilskuddsperiodeRadVtao from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/TilskuddsperiodeTabellVtao';

interface Properties {
    className: string;
}

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
            <Table size="medium">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textSize="small">Tilskudd for perioder</Table.HeaderCell>
                        {innloggetBruker.erNavAnsatt && <Table.HeaderCell textSize="small">Status</Table.HeaderCell>}
                        <Table.HeaderCell textSize="small">Sats</Table.HeaderCell>
                        <Table.HeaderCell textSize="small">Utbetales</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <TilskuddsperiodeRadVtao
                        avtaleOpprettet={avtaleOpprettet}
                        periode={avtale.tilskuddPeriode.at(0) as TilskuddsPeriode}
                        erNavAnsatt={erNavAnsatt}
                        kreverOppfølgingDato={kreverOppfølgingDato}
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
                        .map((periode: TilskuddsPeriode) => (
                            <TilskuddsperiodeRadVtao
                                avtaleOpprettet={avtaleOpprettet}
                                erNavAnsatt={erNavAnsatt}
                                periode={periode}
                                key={periode.id}
                                kreverOppfølgingDato={kreverOppfølgingDato}
                            />
                        ))}
                    {!visAllePerioder && sistePeriode && (
                        <>
                            <Table.Row>
                                <Table.DataCell textSize="small" colSpan={100}>
                                    ...
                                </Table.DataCell>
                            </Table.Row>
                            <TilskuddsperiodeRadVtao
                                avtaleOpprettet={avtaleOpprettet}
                                periode={sistePeriode}
                                erNavAnsatt={erNavAnsatt}
                                kreverOppfølgingDato={kreverOppfølgingDato}
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
export default VisningTilskuddsperioderTabellVtao;
