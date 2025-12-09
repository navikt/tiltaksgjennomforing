import React, { useContext } from 'react';
import { Table } from '@navikt/ds-react';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import { useTilskuddsperiodevisning } from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import TilskuddsperiodeTabellRad from './TilskuddsperiodeTabellRad';

const VisningTilskuddsperioderTabell: React.FC = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const { tilskuddsperioder, visAllePerioder, toggleAllePerioder, antallAktivePerioder } =
        useTilskuddsperiodevisning(avtale);
    const { forste, mellom, siste } = tilskuddsperioder;

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
                    {forste && (
                        <>
                            <TilskuddsperiodeTabellRad
                                key={forste.id}
                                periode={forste}
                                erNavAnsatt={innloggetBruker.erNavAnsatt}
                                tiltakstype={avtale.tiltakstype}
                                nyProsent={false}
                            />
                            <Table.Row>
                                <Table.DataCell textSize="small" colSpan={100}>
                                    ...
                                </Table.DataCell>
                            </Table.Row>
                        </>
                    )}
                    {mellom.map((periode, index) => (
                        <TilskuddsperiodeTabellRad
                            key={periode.id}
                            periode={periode}
                            erNavAnsatt={innloggetBruker.erNavAnsatt}
                            tiltakstype={avtale.tiltakstype}
                            nyProsent={
                                index > 0
                                    ? avtale.tilskuddPeriode[index - 1].lonnstilskuddProsent !==
                                      periode.lonnstilskuddProsent
                                    : false
                            }
                        />
                    ))}
                    {siste && (
                        <>
                            <Table.Row>
                                <Table.DataCell textSize="small" colSpan={100}>
                                    ...
                                </Table.DataCell>
                            </Table.Row>
                            <TilskuddsperiodeTabellRad
                                key={siste.id}
                                periode={siste}
                                erNavAnsatt={innloggetBruker.erNavAnsatt}
                                tiltakstype={avtale.tiltakstype}
                                nyProsent={false}
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
export default VisningTilskuddsperioderTabell;
