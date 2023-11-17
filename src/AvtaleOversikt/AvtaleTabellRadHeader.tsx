import React from 'react';
import { Table } from '@navikt/ds-react';
import './AvtaleTabellRadHeader.less';
import BEMHelper from '@/utils/bem';
import SorteringOrderValg from '@/AvtaleOversikt/Filtrering/SorteringOrderValg';
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
                    <SorteringOrderValg label={'Tiltakstype'} sorteringsverdi={'tiltakstype'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                    <SorteringOrderValg label={'Bedrift'} sorteringsverdi={'bedriftNavn'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                    <SorteringOrderValg label={'Deltaker'} sorteringsverdi={'deltakerFornavn'} />
                </Table.ColumnHeader>
                {erNavAnsatt && (
                    <Table.ColumnHeader>
                        <SorteringOrderValg label={'Veileder'} sorteringsverdi={'veilederNavIdent'} />
                    </Table.ColumnHeader>
                )}
                {erBeslutter ? (
                    <>
                        <Table.ColumnHeader>Veileder</Table.ColumnHeader>
                        <Table.ColumnHeader>
                            <SorteringOrderValg label={'Startdato'} sorteringsverdi={'startDato'} />
                        </Table.ColumnHeader>
                    </>
                ) : (
                    <>
                        <Table.ColumnHeader>
                            <SorteringOrderValg label={'Startdato'} sorteringsverdi={'startDato'} />
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>
                            <SorteringOrderValg label={'Sluttdato'} sorteringsverdi={'sluttDato'} />
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>&nbsp;</Table.ColumnHeader>
                    </>
                )}
                <Table.ColumnHeader>
                    <SorteringOrderValg label={'Status'} sorteringsverdi={'status'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader />
            </Table.Row>
        </Table.Header>
    );
};
export default AvtaleTabellRadHeader;
