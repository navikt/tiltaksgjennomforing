import * as React from 'react';
import KalkulatorIkon from '@/assets/ikoner/kalkulator.svg?react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { BodyShort, Label } from '@navikt/ds-react';
import './InfoBoks.less';
import { formaterNorskeTall } from '@/utils';

interface InfoBoksProps {
    timerIUka: number;
    dagerIUka: number;
    varighet: string | undefined;
}

const InfoBoks = (props: InfoBoksProps) => (
    <div className="infoboks">
        <KalkulatorIkon className="#" />
        <div className="infoboks__tekst">
            <Label className="infoboks__dette-tilsvarer">Dette tilsvarer ca:</Label>
            <VerticalSpacer rem={0.5} />
            <BodyShort size="small">
                <span className="infoboks__bold">{props.timerIUka ? formaterNorskeTall(props.timerIUka) : 0}</span>
                &nbsp; timer eller &nbsp;
                <span className="infoboks__bold">{props.dagerIUka ? formaterNorskeTall(props.dagerIUka) : 0}</span>
                &nbsp;
                {props.dagerIUka <= 1 ? 'arbeidsdag' : 'arbeidsdager'} per uke
            </BodyShort>
            {props.varighet && (
                <>
                    <VerticalSpacer rem={0.5} />
                    <BodyShort size="small">Avtalen varer i {props.varighet}</BodyShort>
                </>
            )}
        </div>
    </div>
);

export default InfoBoks;
