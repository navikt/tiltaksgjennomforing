import React, {CSSProperties, FunctionComponent} from 'react';
import {Element, Normaltekst} from "nav-frontend-typografi";
import BEMHelper from "@/utils/bem";

interface Props {
    metadata: string;
    info: string | number | React.ReactNode;
    style?: CSSProperties
}

const InfoRadBesluttervisning: FunctionComponent<Props> = ({ metadata, info, style }: Props) => {
    const cls = BEMHelper('beslutter-side');
    return (
        <div className={cls.element('infovisning-rad')} style={style}>
            <Element>{metadata}</Element>
            <Normaltekst>{info}</Normaltekst>
        </div>
    )
}
export default InfoRadBesluttervisning;