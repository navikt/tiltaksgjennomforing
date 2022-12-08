import React, { FunctionComponent } from 'react';
import { Label, BodyShort } from '@navikt/ds-react';

interface Props {
    klasseNavn: string;
    radInfo: string;
    radVerdi: string;
}

const InfoRad: FunctionComponent<Props> = (props) => (
    <div className={props.klasseNavn}>
        <Label size="small">{props.radInfo}</Label>
        <BodyShort size="small">{props.radVerdi}</BodyShort>
    </div>
);
export default InfoRad;
