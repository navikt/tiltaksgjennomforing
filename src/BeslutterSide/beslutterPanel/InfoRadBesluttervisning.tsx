import React, { CSSProperties, FunctionComponent } from 'react';
import { Label, BodyShort } from '@navikt/ds-react';
import styles from './beslutterPanel.module.less';

interface Props {
    feltnavn: string;
    verdi: string | number | React.ReactNode;
    className?: string;
}

const InfoRadBesluttervisning: FunctionComponent<Props> = ({ feltnavn, verdi, className }: Props) => {
    return (
        <div className={className ? className : styles.felt}>
            <Label>{feltnavn}</Label>
            {typeof verdi === 'string' || typeof verdi === 'number' ? (
                <BodyShort size="small">{verdi}</BodyShort>
            ) : (
                verdi
            )}
        </div>
    );
};
export default InfoRadBesluttervisning;
