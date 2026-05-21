import React, { FunctionComponent, isValidElement } from 'react';
import { Label, BodyShort } from '@navikt/ds-react';
import { labelVerdiRad } from './infoRadBesluttervisning.module.less';
import classNames from 'classnames';

interface Props {
    feltnavn: string;
    verdi: React.ReactNode;
    className?: string;
}

const InfoRadBesluttervisning: FunctionComponent<Props> = ({ feltnavn, verdi, className }: Props) => {
    return (
        <div className={classNames(labelVerdiRad, className)}>
            <Label>{feltnavn}</Label>
            {isValidElement(verdi) ? verdi : <BodyShort size="small">{verdi}</BodyShort>}
        </div>
    );
};
export default InfoRadBesluttervisning;
