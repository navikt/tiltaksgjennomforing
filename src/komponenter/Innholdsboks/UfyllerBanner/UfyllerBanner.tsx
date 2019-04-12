import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import utfyllingsIkon from './pencil-fill.svg';
import './UtfyllerBanner.less';
import classnames from 'classnames';
import BEMHelper from '../../../utils/bem';

type Utfyller =
    | 'arbeidsgiver'
    | 'veileder'
    | 'veileder_og_arbeidsgiver'
    | undefined;

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
        utfyllesAv = 'Fylles ut av arbeidsgiver';
    } else if (props.utfyller === 'veileder_og_arbeidsgiver') {
        wrapperClass = cls.element('begge');
        utfyllesAv = 'Fylles ut av NAV og arbeidsgiver';
    } else {
        return null;
    }

    return (
        <div className={classnames(cls.className, wrapperClass)}>
            <img
                className="utfyllerBanner__utfyllingsIkon"
                src={utfyllingsIkon}
            />
            <Normaltekst className="utfyllerBanner__fyllesUtAvTekst">
                {utfyllesAv}
            </Normaltekst>
        </div>
    );
};

export default UfyllerBanner;
