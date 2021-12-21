import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface Props {
    klasseNavn: string;
    radInfo: string;
    radVerdi: string
}

const InfoRad: FunctionComponent<Props> = (props) => (
    <div className={props.klasseNavn}>
        <Element>{props.radInfo}</Element>
        <Normaltekst>{props.radVerdi}</Normaltekst>
    </div>
)
export default InfoRad;