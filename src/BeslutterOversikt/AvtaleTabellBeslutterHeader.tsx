import React from 'react';
import { Table } from '@navikt/ds-react';
import './AvtaleTabellBeslutterHeader.less';
import BEMHelper from '@/utils/bem';
import SorteringOrderValgGammel from '@/AvtaleOversikt/Filtrering/GammelFiltrering/SorteringOrderValgGammel';

const cls = BEMHelper('avtaletabellbeslutterheader');

const AvtaleTabellBeslutterHeader: React.FC = () => {
    return (
        <Table.Header className={cls.className}>
            <Table.Row>
                <Table.ColumnHeader>
                    <SorteringOrderValgGammel label={'Tiltakstype'} sorteringsverdi={'tiltakstype'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                    <SorteringOrderValgGammel label={'Bedrift'} sorteringsverdi={'bedriftNavn'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                    <SorteringOrderValgGammel label={'Deltaker'} sorteringsverdi={'deltakerEtternavn'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader>Veileder</Table.ColumnHeader>
                <Table.ColumnHeader>
                    <SorteringOrderValgGammel label={'Startdato'} sorteringsverdi={'startDato'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                    <SorteringOrderValgGammel label={'Status'} sorteringsverdi={'status'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader />
            </Table.Row>
        </Table.Header>
    );
};
export default AvtaleTabellBeslutterHeader;
