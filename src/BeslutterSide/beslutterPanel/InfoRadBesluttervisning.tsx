import React, {FunctionComponent} from 'react';
import {Element, Normaltekst} from "nav-frontend-typografi";
import BEMHelper from "@/utils/bem";

interface Props {
    metadata: string;
    info: string | number | React.ReactNode;
}

const InfoRadBesluttervisning: FunctionComponent<Props> = ({ metadata, info }: Props) => {
    const cls = BEMHelper('beslutter-side');
    return (
        <div className={cls.element('infovisning-rad2')}>
            <Element>{metadata}</Element>
            <Normaltekst>{info}</Normaltekst>
        </div>
    )
}
export default InfoRadBesluttervisning;