import React, { CSSProperties, FunctionComponent } from 'react';
import { Label, BodyShort } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';

interface Props {
    metadata: string;
    info: string | number | React.ReactNode;
    style?: CSSProperties;
}

const InfoRadBesluttervisning: FunctionComponent<Props> = ({ metadata, info, style }: Props) => {
    const cls = BEMHelper('beslutter-panel');
    return (
        <div className={cls.element('infovisning-rad')} style={style}>
            <Label>{metadata}</Label>
            <BodyShort size="small">{info}</BodyShort>
        </div>
    );
};
export default InfoRadBesluttervisning;
