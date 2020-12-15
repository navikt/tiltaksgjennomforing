import { ReactComponent as KalkulatorIkon } from '@/assets/ikoner/kalkulator.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import './InfoBoks.less';

interface InfoBoksProps {
    timerIUka: number;
    dagerIUka: number;
    varighet: string | undefined;
}

const InfoBoks = (props: InfoBoksProps) => (
    <div className="infoboks">
        <KalkulatorIkon className="#" />
        <div className="infoboks__tekst">
            <Element className="infoboks__dette-tilsvarer">Dette tilsvarer ca:</Element>
            <VerticalSpacer eightPx={true} />
            <Normaltekst>
                <span className="infoboks__bold">{props.timerIUka ? props.timerIUka : 0}</span>
                &nbsp; timer eller &nbsp;
                <span className="infoboks__bold">{props.dagerIUka ? props.dagerIUka : 0}</span>
                &nbsp;
                {props.dagerIUka <= 1 ? 'arbeidsdag' : 'arbeidsdager'} per uke
            </Normaltekst>
            {props.varighet && (
                <>
                    <VerticalSpacer eightPx={true} />
                    <Normaltekst>Avtalen varer i {props.varighet}</Normaltekst>
                </>
            )}
        </div>
    </div>
);

export default InfoBoks;
