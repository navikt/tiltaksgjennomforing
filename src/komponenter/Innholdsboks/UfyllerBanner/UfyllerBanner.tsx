import { ReactComponent as UtfyllingsIkon } from '@/assets/ikoner/pen.svg';
import BEMHelper from '@/utils/bem';
import classnames from 'classnames';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import './UtfyllerBanner.less';

type Utfyller = 'arbeidsgiver' | 'veileder' | 'veileder_og_arbeidsgiver' | undefined;

interface Props {
    utfyller: Utfyller;
}

const cls = BEMHelper('utfyllerBanner');

const UfyllerBanner: React.FunctionComponent<Props> = (props: Props) => {
    let wrapperClass: string;
    let utfyllesAv: string;

    if (props.utfyller === 'veileder') {
        wrapperClass = cls.element('veileder');
        utfyllesAv = 'Fylles ut av NAV';
    } else if (props.utfyller === 'arbeidsgiver') {
        wrapperClass = cls.element('arbeidsgiver');
        utfyllesAv = 'Fylles ut av arbeidsgiveren';
    } else if (props.utfyller === 'veileder_og_arbeidsgiver') {
        wrapperClass = cls.element('begge');
        utfyllesAv = 'Fylles ut av NAV og arbeidsgiveren';
    } else {
        return null;
    }

    return (
        <div className={classnames(cls.className, wrapperClass)}>
            <div className="utfyllerBanner">
                <UtfyllingsIkon className="utfyllerBanner__utfyllingsIkon" />
                <Normaltekst className="utfyllerBanner__fyllesUtAvTekst" aria-label={`Dette steget ${utfyllesAv}`}>
                    {utfyllesAv}
                </Normaltekst>
            </div>
        </div>
    );
};

export default UfyllerBanner;
