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

// Ulagrede utgifter har ingen id, så de får en stabil klientnøkkel knyttet til objektet.
const klientnøkler = new WeakMap<Inkluderingstilskuddsutgift, string>();
let nesteKlientnøkkel = 0;

const radnøkkel = (utgift: Inkluderingstilskuddsutgift): string => {
    if (utgift.id) {
        return utgift.id;
    }
    let nøkkel = klientnøkler.get(utgift);
    if (!nøkkel) {
        nøkkel = `ny-${nesteKlientnøkkel++}`;
        klientnøkler.set(utgift, nøkkel);
    }
    return nøkkel;
};

const TilskuddsutgiftTabell: FunctionComponent<Props> = (props) => {
    const { inkluderingstilskuddAvtale } = useFeatureToggles();

    if (props.utgifter.length === 0) {
        return null;
    }

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
                {props.utgifter.map((utgift) => {
                    const sletteCelle = props.redigerbar && (
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
                    );
                    return inkluderingstilskuddAvtale ? (
                        <Table.ExpandableRow key={radnøkkel(utgift)} content={utgift.beskrivelse}>
                            <Table.DataCell>{utgift.navn || inkluderingstilskuddtypeTekst[utgift.type]}</Table.DataCell>
                            <Table.DataCell align="right">{formaterPenger(utgift.beløp)}</Table.DataCell>
                            <Table.DataCell align="center">{inkluderingstilskuddtypeTekst[utgift.type]}</Table.DataCell>
                            {sletteCelle}
                        </Table.ExpandableRow>
                    ) : (
                        <Table.Row key={radnøkkel(utgift)}>
                            <Table.DataCell align="right">{formaterPenger(utgift.beløp)}</Table.DataCell>
                            <Table.DataCell align="center">{inkluderingstilskuddtypeTekst[utgift.type]}</Table.DataCell>
                            {sletteCelle}
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default TilskuddsutgiftTabell;
