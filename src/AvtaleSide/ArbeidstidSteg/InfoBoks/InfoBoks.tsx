import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './InfoBoks.less';

interface Props {
    timerIUka: number;
    dagerIUka: number;
}

const InfoBoks = (props: Props) => (
    <div className="infoboks">
        <Element className="infoboks__dette-tilsvarer">
            Dette tilsvarer:
        </Element>
        <Normaltekst>
            <span className="infoboks__bold">
                {props.timerIUka ? props.timerIUka : 0}
            </span>
            &nbsp; timer eller &nbsp;
            <span className="infoboks__bold">
                {props.dagerIUka ? props.dagerIUka : 0}
            </span>
            &nbsp;
            {props.dagerIUka <= 1 ? 'dag' : 'dager'} i uka
        </Normaltekst>
    </div>
);

export default InfoBoks;
