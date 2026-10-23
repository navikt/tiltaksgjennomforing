import KnappMedIkon from '@/komponenter/KnappMedIkon/KnappMedIkon';
import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift } from '@/types/avtale';
import { formaterPenger } from '@/utils';
import { Table } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

type Props = {
    utgifter: Inkluderingstilskuddsutgift[];
    redigerbar: boolean;
    skalKunneSlette?: boolean;
    slett?: (index: number) => void;
};

const TilskuddsutgiftTabell: FunctionComponent<Props> = (props) => {
    if (props.utgifter.length === 0) {
        return null;
    }

    const kanUtgiftSlettes = (utgift: Inkluderingstilskuddsutgift) =>
        props.redigerbar && (props.skalKunneSlette || utgift.id === undefined);

    return (
        <Table size="small">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Tilskudd</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Utgifter</Table.HeaderCell>
                    {props.redigerbar && <Table.HeaderCell scope="col">Handling</Table.HeaderCell>}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.utgifter.map((utgift, index) => (
                    <Table.Row key={utgift.id ?? index}>
                        <Table.DataCell>{inkluderingstilskuddtypeTekst[utgift.type]}</Table.DataCell>
                        <Table.DataCell>{formaterPenger(utgift.beløp)}</Table.DataCell>
                        {props.redigerbar && (
                            <Table.DataCell>
                                {kanUtgiftSlettes(utgift) && (
                                    <KnappMedIkon
                                        onClick={() => props.slett?.(index)}
                                        label="Slett"
                                        ikonType="soppelkasse"
                                    />
                                )}
                            </Table.DataCell>
                        )}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default TilskuddsutgiftTabell;
