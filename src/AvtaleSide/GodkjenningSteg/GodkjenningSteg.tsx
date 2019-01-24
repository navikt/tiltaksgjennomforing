import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import GodkjenningKnapper from './GodkjenningKnapper/GodkjenningKnapper';
import Oppsummering from './Oppsummering/Oppsummering';

const GodkjenningSteg = (props: Context) => {
    const bekreftBrukerOnClick = () => {
        props.settAvtaleVerdi('godkjentAvDeltaker', true);
    };

    const bekreftArbeidsgiverOnClick = () => {
        props.settAvtaleVerdi('godkjentAvArbeidsgiver', true);
    };

    const bekreftVeilederOnClick = () => {
        props.settAvtaleVerdi('godkjentAvVeileder', true);
    };

    return (
        <>
            <Oppsummering avtale={props.avtale} />
            <GodkjenningKnapper
                avtale={props.avtale}
                bekreftBrukerOnClick={bekreftBrukerOnClick}
                bekreftArbeidsgiverOnClick={bekreftArbeidsgiverOnClick}
                bekreftVeilederOnClick={bekreftVeilederOnClick}
            />
        </>
    );
};

export default medContext<{}>(GodkjenningSteg);
