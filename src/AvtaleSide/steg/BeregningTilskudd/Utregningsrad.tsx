import { Table } from '@navikt/ds-react';
import React from 'react';
import { formaterPenger } from '@/utils';

interface UtregningsradTabellProps {
    icon?: React.ReactNode;
    label: string;
    midtrekkeTekst?: string;
    operator?: React.ReactNode;
    verdi: string | number;
    className?: string;
    ikkePenger?: boolean;
    fetSkrift?: boolean;
}

const Utregningsrad: React.FC<UtregningsradTabellProps> = ({
    icon,
    label,
    midtrekkeTekst,
    operator,
    verdi,
    className,
    ikkePenger,
    fetSkrift,
}) => {
    const parseVerdi = (verdi: string | number) => {
        const verdiSomNumber = parseInt(verdi.toString(), 10);
        return !isNaN(verdiSomNumber) && !ikkePenger ? formaterPenger(verdiSomNumber) : verdi;
    };

    return (
        <Table.Row className={className}>
            <Table.DataCell>{icon}</Table.DataCell>
            <Table.DataCell>{fetSkrift ? <b>{label}</b> : label}</Table.DataCell>
            <Table.DataCell>{fetSkrift ? <b>{midtrekkeTekst}</b> : midtrekkeTekst}</Table.DataCell>
            <Table.DataCell className="utregningspanel__operator-cell">
                <div>{operator}</div>
            </Table.DataCell>
            <Table.DataCell align="right" className="utregningspanel__verdi-cell">
                {fetSkrift ? <b>{parseVerdi(verdi)}</b> : parseVerdi(verdi)}
            </Table.DataCell>
        </Table.Row>
    );
};

export default Utregningsrad;
