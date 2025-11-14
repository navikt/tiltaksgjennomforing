import React, { useContext } from 'react';
import { ExpansionCard, Heading, Table } from '@navikt/ds-react';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import { addDays } from 'date-fns';
import { useTilskuddsperiodevisning } from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import TilskuddsperiodeRadVtao from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/TilskuddsperiodeRadVtao';
import { formaterPeriode } from '@/utils/datoUtils';

const VisningTilskuddsperioderTabellVtao: React.FC = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const avtaleOpprettet = new Date(avtale.opprettetTidspunkt);
    const erNavAnsatt = innloggetBruker.erNavAnsatt;
    const { tilskuddsperioder, visAllePerioder, toggleAllePerioder, antallAktivePerioder } =
        useTilskuddsperiodevisning(avtale);
    const { forste, mellom, siste } = tilskuddsperioder;

    const kreverOppfølgingDato =
        avtale.kreverOppfolgingFrist !== undefined || avtale.kreverOppfolgingFrist === ''
            ? addDays(avtale.kreverOppfolgingFrist, 1)
            : undefined;

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    return (
        <ExpansionCard defaultOpen aria-label="Oversikt over tilskuddsperioder" size="small">
            <ExpansionCard.Header>
                <Heading level="2" size="small">
                    Oversikt over tilskudd fra{' '}
                    {formaterPeriode(avtale.gjeldendeInnhold.startDato!, avtale.gjeldendeInnhold.sluttDato!)}
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Table size="medium">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textSize="small">Periode</Table.HeaderCell>
                            {innloggetBruker.erNavAnsatt && (
                                <Table.HeaderCell textSize="small">Status</Table.HeaderCell>
                            )}
                            <Table.HeaderCell textSize="small">Beløp</Table.HeaderCell>
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
                    gjeldendeInnholdStartdato={avtale.gjeldendeInnhold.startDato}
                    gjeldendeInnholdSluttdato={avtale.gjeldendeInnhold.sluttDato}
                    antallAktiveTilskuddsperioder={antallAktivePerioder}
                    setVisAllePerioder={toggleAllePerioder}
                    visAllePerioder={visAllePerioder}
                />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
export default VisningTilskuddsperioderTabellVtao;
