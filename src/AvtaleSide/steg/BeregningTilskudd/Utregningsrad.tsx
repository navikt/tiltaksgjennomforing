import { Table } from '@navikt/ds-react';
import React from 'react';
import { formaterPenger } from '@/utils';
import BEMHelper from '@/utils/bem';

interface UtregningsradProps {
    icon?: React.ReactNode;
    label: string;
    midtrekkeTekst?: string;
    operator?: React.ReactNode;
    verdi: string | number;
    className: string;
    ikkePenger?: boolean;
}

const Utregningsrad: React.FC<UtregningsradProps> = ({
    icon,
    label,
    midtrekkeTekst,
    operator,
    verdi,
    className,
    ikkePenger,
}) => {
    const cls = BEMHelper(className);

    const parseVerdi = (verdi: string | number) => {
        const verdiSomNumber = parseInt(verdi.toString(), 10);
        return !isNaN(verdiSomNumber) && !ikkePenger ? formaterPenger(verdiSomNumber) : verdi;
    };

    return (
        <Table.Row className={className}>
            <Table.DataCell className={cls.element('col-icon')}>{icon}</Table.DataCell>
            <Table.DataCell>{label}</Table.DataCell>
            <Table.DataCell>{midtrekkeTekst}</Table.DataCell>
            <Table.DataCell className={cls.element('operator-cell')}>{operator}</Table.DataCell>
            <Table.DataCell align="right" className={cls.element('verdi-cell')}>
                {parseVerdi(verdi)}
            </Table.DataCell>
        </Table.Row>
    );
};

export default Utregningsrad;
