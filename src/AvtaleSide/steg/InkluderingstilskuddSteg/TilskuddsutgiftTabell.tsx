import KnappMedIkon from '@/komponenter/KnappMedIkon/KnappMedIkon';
import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift } from '@/types/avtale';
import { formaterPenger } from '@/utils';
import { HStack, Table } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { useFeatureToggles } from '@/FeatureToggles';

type Props = {
    utgifter: Inkluderingstilskuddsutgift[];
    redigerbar: boolean;
    skalKunneSlette?: boolean;
    slett?: (utgift: Inkluderingstilskuddsutgift) => void;
};

const TilskuddsutgiftTabell: FunctionComponent<Props> = (props) => {
    if (props.utgifter.length === 0) {
        return null;
    }

    const { inkluderingstilskuddAvtale } = useFeatureToggles();

    const kanUtgiftSlettes = (utgift: Inkluderingstilskuddsutgift) =>
        props.redigerbar && (props.skalKunneSlette || utgift.id === undefined);

    return (
        <Table size="small">
            <Table.Header>
                <Table.Row>
                    {inkluderingstilskuddAvtale && (
                        <>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        </>
                    )}
                    <Table.HeaderCell align="right" scope="col">
                        Pris inntil
                    </Table.HeaderCell>
                    <Table.HeaderCell align="center" scope="col">
                        Type kostnad
                    </Table.HeaderCell>
                    {props.redigerbar && (
                        <Table.HeaderCell align="center" scope="col">
                            Handling
                        </Table.HeaderCell>
                    )}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.utgifter.map((utgift) =>
                    inkluderingstilskuddAvtale ? (
                        <Table.ExpandableRow
                            key={utgift.id ?? utgift.navn + ' ' + utgift.beløp + ' ' + utgift.type}
                            content={utgift.beskrivelse}
                        >
                            <Table.DataCell>{utgift.navn}</Table.DataCell>
                            <Table.DataCell align="right">{formaterPenger(utgift.beløp)}</Table.DataCell>
                            <Table.DataCell align="center">{inkluderingstilskuddtypeTekst[utgift.type]}</Table.DataCell>
                            {props.redigerbar && (
                                <Table.DataCell align="center">
                                    {kanUtgiftSlettes(utgift) && (
                                        <HStack justify="center">
                                            <KnappMedIkon
                                                onClick={() => props.slett?.(utgift)}
                                                label="Slett"
                                                ikonType="soppelkasse"
                                            />
                                        </HStack>
                                    )}
                                </Table.DataCell>
                            )}
                        </Table.ExpandableRow>
                    ) : (
                        <Table.Row key={utgift.id ?? +utgift.beløp + ' ' + utgift.type}>
                            <Table.DataCell align="right">{formaterPenger(utgift.beløp)}</Table.DataCell>
                            <Table.DataCell align="center">{inkluderingstilskuddtypeTekst[utgift.type]}</Table.DataCell>
                            {props.redigerbar && (
                                <Table.DataCell align="center">
                                    {kanUtgiftSlettes(utgift) && (
                                        <HStack justify="center">
                                            <KnappMedIkon
                                                onClick={() => props.slett?.(utgift)}
                                                label="Slett"
                                                ikonType="soppelkasse"
                                            />
                                        </HStack>
                                    )}
                                </Table.DataCell>
                            )}
                        </Table.Row>
                    ),
                )}
            </Table.Body>
        </Table>
    );
};

export default TilskuddsutgiftTabell;
