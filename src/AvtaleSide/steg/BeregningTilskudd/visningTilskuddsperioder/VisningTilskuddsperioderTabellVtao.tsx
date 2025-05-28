import React, { useContext } from 'react';
import { Table } from '@navikt/ds-react';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import BEMHelper from '@/utils/bem';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import { addDays } from 'date-fns';
import { useTilskuddsperiodevisning } from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import TilskuddsperiodeRadVtao from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/TilskuddsperiodeRadVtao';

interface Properties {
    className: string;
}

const VisningTilskuddsperioderTabellVtao: React.FC<Properties> = ({ className }: Properties) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const cls = BEMHelper(className);
    const avtaleOpprettet = new Date(avtale.opprettetTidspunkt);
    const erNavAnsatt = innloggetBruker.erNavAnsatt;
    const { tilskuddsperioder, visAllePerioder, toggleAllePerioder, antallAktivePerioder } =
        useTilskuddsperiodevisning(avtale);
    const { forste, mellom, siste } = tilskuddsperioder;

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
                    {forste && (
                        <>
                            <TilskuddsperiodeRadVtao
                                avtaleOpprettet={avtaleOpprettet}
                                erNavAnsatt={erNavAnsatt}
                                periode={forste}
                                key={forste.id}
                                kreverOppfølgingDato={kreverOppfølgingDato}
                            />
                            <Table.Row>
                                <Table.DataCell textSize="small" colSpan={100}>
                                    ...
                                </Table.DataCell>
                            </Table.Row>
                        </>
                    )}
                    {mellom.map((periode) => (
                        <TilskuddsperiodeRadVtao
                            avtaleOpprettet={avtaleOpprettet}
                            erNavAnsatt={erNavAnsatt}
                            periode={periode}
                            key={periode.id}
                            kreverOppfølgingDato={kreverOppfølgingDato}
                        />
                    ))}
                    {siste && (
                        <>
                            <Table.Row>
                                <Table.DataCell textSize="small" colSpan={100}>
                                    ...
                                </Table.DataCell>
                            </Table.Row>
                            <TilskuddsperiodeRadVtao
                                avtaleOpprettet={avtaleOpprettet}
                                erNavAnsatt={erNavAnsatt}
                                periode={siste}
                                key={siste.id}
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
                antallAktiveTilskuddsperioder={antallAktivePerioder}
                setVisAllePerioder={toggleAllePerioder}
                visAllePerioder={visAllePerioder}
            />
        </>
    );
};
export default VisningTilskuddsperioderTabellVtao;
