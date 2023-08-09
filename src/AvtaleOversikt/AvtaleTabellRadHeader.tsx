import React from 'react';
import BEMHelper from '@/utils/bem';
import { Table } from '@navikt/ds-react';

interface Props {
    className: string;
    erBeslutter: boolean;
    erNavAnsatt: boolean;
}

const AvtaleTabellRadHeader: React.FC<Props> = ({ className, erBeslutter, erNavAnsatt }: Props) => {
    const cls = BEMHelper(className);
    return erBeslutter ? (
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeader>Tiltakstype</Table.ColumnHeader>
                <Table.ColumnHeader>Bedrift</Table.ColumnHeader>
                <Table.ColumnHeader>Deltaker</Table.ColumnHeader>
                <Table.ColumnHeader>Veileder</Table.ColumnHeader>
                <Table.ColumnHeader>Startdato <br/> periode</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
        </Table.Header>
    ) : (
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeader>Bedrift</Table.ColumnHeader>
                <Table.ColumnHeader>Deltaker</Table.ColumnHeader>
                {erNavAnsatt && (
                    <Table.ColumnHeader>Veileder</Table.ColumnHeader>
                )}
                <Table.ColumnHeader>
                    Startdato
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                    Sluttdato
                </Table.ColumnHeader>
                <Table.ColumnHeader>&nbsp;</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
        </Table.Header>
    );
};
export default AvtaleTabellRadHeader;
