import React from 'react';
import { Table } from '@navikt/ds-react';
import './AvtaleTabellRadHeader.less';
import BEMHelper from '@/utils/bem';
import SortingValg from '@/AvtaleOversikt/Filtrering/SortingValg';
import { AvtaleMinimalForBeslutter } from '@/types/avtale';

interface Props {
    erBeslutter: boolean;
    erNavAnsatt: boolean;
}

const cls = BEMHelper('avtaletabellradheader');

const AvtaleTabellRadHeader: React.FC<Props> = ({ erBeslutter, erNavAnsatt }: Props) => {
    return (
        <Table.Header className={cls.className}>
            <Table.Row>
                <Table.ColumnHeader>
                    <SortingValg label={'Tiltakstype'} sorteringsverdi={'tiltakstype'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                    <SortingValg label={'Bedrift'} sorteringsverdi={'bedriftNavn'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                    <SortingValg label={'Deltaker'} sorteringsverdi={'deltakerFornavn'} />
                </Table.ColumnHeader>
                {(erNavAnsatt || erBeslutter) && <Table.ColumnHeader>Veileder</Table.ColumnHeader>}
                {erBeslutter ? (
                    <Table.ColumnHeader>
                        <SortingValg label={'Startdato'} sorteringsverdi={'startDato'} />
                    </Table.ColumnHeader>
                ) : (
                    <>
                        <Table.ColumnHeader>
                            <SortingValg label={'Startdato'} sorteringsverdi={'startDato'} />
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>
                            <SortingValg label={'Sluttdato'} sorteringsverdi={'sluttDato'} />
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>&nbsp;</Table.ColumnHeader>
                    </>
                )}
                <Table.ColumnHeader>
                    <SortingValg label={'Status'} sorteringsverdi={'status'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
        </Table.Header>
    );
};
export default AvtaleTabellRadHeader;
