import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import utfyllingsIkon from './pencil-fill.svg';
import './UtfyllerBanner.less';

type Utfyller = 'arbeidsgiver' | 'veileder' | undefined;

interface Props {
    utfyller: Utfyller;
}

const UfyllerBanner: React.FunctionComponent<Props> = (props: Props) => {
    let wrapperClass: string;
    let utfyllesAv: string;

    if (props.utfyller === 'veileder') {
        wrapperClass = 'utfyllerBanner__veileder';
        utfyllesAv = 'Fylles ut av NAV';
    } else if (props.utfyller === 'arbeidsgiver') {
        wrapperClass = 'utfyllerBanner__arbeidsgiver';
        utfyllesAv = 'Fylles ut av arbeidsgiver';
    } else {
        return null;
    }

    return (
        <div className={wrapperClass}>
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
