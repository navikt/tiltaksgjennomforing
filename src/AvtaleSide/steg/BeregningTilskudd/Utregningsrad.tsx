import { Detail, Hide, Show, Table } from '@navikt/ds-react';
import React from 'react';
import { formaterPenger } from '@/utils';
import styles from './UtregningPanel.module.less';

interface UtregningsradProps {
    icon?: React.ReactNode;
    label: string;
    midtrekkeTekst?: string;
    operator?: React.ReactNode;
    verdi: string | number;
    className?: string;
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
    const parseVerdi = (verdi: string | number) => {
        const verdiSomNumber = parseInt(verdi.toString(), 10);
        return !isNaN(verdiSomNumber) && !ikkePenger ? formaterPenger(verdiSomNumber) : verdi;
    };

    return (
        <Table.Row className={className}>
            <Hide below="sm" asChild>
                <Table.DataCell textSize="small" className={styles.colIcon}>
                    {icon}
                </Table.DataCell>
            </Hide>
            <Table.DataCell textSize="small" className={styles.labelCell}>
                {label}
                {midtrekkeTekst && (
                    <Show below="sm" asChild>
                        <Detail>{midtrekkeTekst}</Detail>
                    </Show>
                )}
            </Table.DataCell>
            <Hide below="sm" asChild>
                <Table.DataCell textSize="small" className={styles.satsCell}>
                    {midtrekkeTekst}
                </Table.DataCell>
            </Hide>
            <Table.DataCell textSize="small" className={styles.operatorCell}>
                {operator}
            </Table.DataCell>
            <Table.DataCell textSize="small" align="right" className={styles.verdiCell}>
                {parseVerdi(verdi)}
            </Table.DataCell>
        </Table.Row>
    );
};

export default Utregningsrad;
