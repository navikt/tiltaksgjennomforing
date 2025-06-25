import React from 'react';
import { Table } from '@navikt/ds-react';
import './AvtaleTabellBeslutterHeader.less';
import BEMHelper from '@/utils/bem';
import SorteringOrderValgBeslutter from '@/AvtaleOversikt/Filtrering/GammelFiltrering/SorteringOrderValgBeslutter';

const cls = BEMHelper('avtaletabellbeslutterheader');

const AvtaleTabellBeslutterHeader: React.FC = () => {
    return (
        <Table.Header className={cls.className}>
            <Table.Row>
                <Table.ColumnHeader style={{ width: '15%' }}>
                    <SorteringOrderValgBeslutter label={'Tiltakstype'} sorteringsverdi={'tiltakstype'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader style={{ width: '20%' }}>
                    <SorteringOrderValgBeslutter label={'Bedrift'} sorteringsverdi={'bedriftNavn'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader style={{ width: '20%' }}>
                    <SorteringOrderValgBeslutter label={'Deltaker'} sorteringsverdi={'deltakerEtternavn'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader style={{ width: '10%' }}>Veileder</Table.ColumnHeader>
                <Table.ColumnHeader style={{ width: '15%' }}>
                    <SorteringOrderValgBeslutter label={'Startdato'} sorteringsverdi={'startDato'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader style={{ width: '20%' }}>
                    <SorteringOrderValgBeslutter label={'Status'} sorteringsverdi={'status'} />
                </Table.ColumnHeader>
                <Table.ColumnHeader />
            </Table.Row>
        </Table.Header>
    );
};
export default AvtaleTabellBeslutterHeader;
