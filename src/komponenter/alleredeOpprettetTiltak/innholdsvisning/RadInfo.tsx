import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface Props {
    label: string;
    info: string | number;
    infoNotBold?: boolean;
}

const RadInfo: FunctionComponent<Props> = ({ label, info, infoNotBold }) => {
    return (
        <div className={'alleredeOpprettetAvtale__rad-element'}>
            <Normaltekst>{label}</Normaltekst>
            <Element className={infoNotBold ? 'alleredeOpprettetAvtale__info-not-bold' : ''}>{info}</Element>
        </div>
    );
};
export default RadInfo;
