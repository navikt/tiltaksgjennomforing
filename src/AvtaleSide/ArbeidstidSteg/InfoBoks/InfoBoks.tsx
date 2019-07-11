import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { ReactComponent as KalkulatorIkon } from '../../../assets/ikoner/kalkulator.svg';
import './InfoBoks.less';

interface Props {
    timerIUka: number;
    dagerIUka: number;
}

const InfoBoks = (props: Props) => (
    <div className="infoboks">
        <KalkulatorIkon className="#" />
        <div className="infoboks__tekst">
            <Element className="infoboks__dette-tilsvarer">
                Dette tilsvarer ca:
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
                {props.dagerIUka <= 1 ? 'arbeidsdag' : 'arbeidsdager'} per uke
            </Normaltekst>
        </div>
    </div>
);

export default InfoBoks;
