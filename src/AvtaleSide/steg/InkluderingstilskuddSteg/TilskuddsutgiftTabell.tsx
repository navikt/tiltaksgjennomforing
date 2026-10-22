import React, { FunctionComponent, PropsWithChildren } from 'react';

import { Table } from '@navikt/ds-react';

type Props = {
    redigerbar: boolean;
};

const TilskuddsutgiftTabell: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    return (
        <Table size="small">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Tilskudd</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Utgifter</Table.HeaderCell>
                    {props.redigerbar && <Table.HeaderCell scope="col">Handling</Table.HeaderCell>}
                </Table.Row>
            </Table.Header>
            <Table.Body>{props.children}</Table.Body>
        </Table>
    );
};

export default TilskuddsutgiftTabell;
