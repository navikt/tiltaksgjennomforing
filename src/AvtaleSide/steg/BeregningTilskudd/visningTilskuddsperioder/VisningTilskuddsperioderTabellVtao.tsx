import { AvtaleContext } from '@/AvtaleProvider';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { addDays } from 'date-fns';
import { erNil } from '@/utils/predicates';
import TilskuddsperiodeRadVtao from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/TilskuddsperiodeRadVtao';
import { useTilskuddsperiodevisning } from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Table } from '@navikt/ds-react';
import { useContext } from 'react';

const VisningTilskuddsperioderTabellVtao: React.FC = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const avtaleOpprettet = new Date(avtale.opprettetTidspunkt);
    const erNavAnsatt = innloggetBruker.erNavAnsatt;
    const { tilskuddsperioder, visAllePerioder, toggleAllePerioder, antallAktivePerioder } =
        useTilskuddsperiodevisning(avtale);
    const { forste, mellom, siste } = tilskuddsperioder;

    const dagenEtterOppfolgingsfrist = erNil(avtale.kommendeOppfolging)
        ? undefined
        : addDays(avtale.kommendeOppfolging.oppfolgingsfrist, 1);

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    return (
        <>
            <Table size="medium">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textSize="small">Periode</Table.HeaderCell>
                        {innloggetBruker.erNavAnsatt && <Table.HeaderCell textSize="small">Status</Table.HeaderCell>}
                        <Table.HeaderCell textSize="small">Beløp</Table.HeaderCell>
                        <Table.HeaderCell textSize="small">Utbetales</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {forste && (
                        <>
                            <TilskuddsperiodeRadVtao
                                skalViseSatsForTidligereAar={avtale.tiltakstype === 'VTAO'}
                                avtaleOpprettet={avtaleOpprettet}
                                erNavAnsatt={erNavAnsatt}
                                periode={forste}
                                key={forste.id}
                                kreverOppfølgingDato={dagenEtterOppfolgingsfrist}
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
                            kreverOppfølgingDato={dagenEtterOppfolgingsfrist}
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
                                kreverOppfølgingDato={dagenEtterOppfolgingsfrist}
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
        </>
    );
};
export default VisningTilskuddsperioderTabellVtao;
