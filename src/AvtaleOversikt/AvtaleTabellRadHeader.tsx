import React from 'react';
import { Table } from '@navikt/ds-react';
import './AvtaleTabellRadHeader.less';
import BEMHelper from '@/utils/bem';

interface Props {
    erBeslutter: boolean;
    erNavAnsatt: boolean;
}

const cls = BEMHelper('avtaletabellradheader');

const AvtaleTabellRadHeader: React.FC<Props> = ({erBeslutter, erNavAnsatt}: Props) => {
    return (
        <Table.Header className={cls.className}>
            <Table.Row>
                <Table.ColumnHeader>Tiltakstype</Table.ColumnHeader>
                <Table.ColumnHeader>Bedrift</Table.ColumnHeader>
                <Table.ColumnHeader>Deltaker</Table.ColumnHeader>
                {(erNavAnsatt || erBeslutter) && (
                    <Table.ColumnHeader>Veileder</Table.ColumnHeader>
                )}
                {erBeslutter ? (
                    <Table.ColumnHeader>Startdato<br/> periode</Table.ColumnHeader>
                ) : (
                    <>
                        <Table.ColumnHeader>Startdato</Table.ColumnHeader>
                        <Table.ColumnHeader>Sluttdato</Table.ColumnHeader>
                        <Table.ColumnHeader>&nbsp;</Table.ColumnHeader> 
                    </>
                )}
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              
            </Table.Row>
        </Table.Header>
    )
};
export default AvtaleTabellRadHeader;
