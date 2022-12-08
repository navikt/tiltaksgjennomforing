import React, { FunctionComponent } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';

interface Props {
    label: string;
    info: string | number;
    infoNotBold?: boolean;
}

const RadInfo: FunctionComponent<Props> = ({ label, info, infoNotBold }) => {
    return (
        <div className={'alleredeOpprettetAvtale__rad-element'}>
            <BodyShort size="small">{label}</BodyShort>
            <Label className={infoNotBold ? 'alleredeOpprettetAvtale__info-not-bold' : ''}>{info}</Label>
        </div>
    );
};
export default RadInfo;
