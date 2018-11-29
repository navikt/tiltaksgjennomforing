import * as React from 'react';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import { Knapp } from 'nav-frontend-knapper';
import { Avtale } from '../../avtale';

interface Props {
    avtale: Avtale;
    bekreftBrukerOnClick: () => void;
    bekreftArbeidsgiverOnClick: () => void;
    bekreftVeilederOnClick: () => void;
}

const GodkjenningKnapper = (props: Props) => (
    <Innholdsboks>
        <Knapp
            disabled={props.avtale.bekreftetAvBruker}
            onClick={props.bekreftBrukerOnClick}
        >
            Bekreft som bruker
        </Knapp>
        {props.avtale.bekreftetAvBruker && 'Avtalen er bekreftet av bruker'}
        <Knapp
            disabled={props.avtale.bekreftetAvArbeidsgiver}
            onClick={props.bekreftArbeidsgiverOnClick}
        >
            Bekreft som arbeidsgiver
        </Knapp>
        {props.avtale.bekreftetAvArbeidsgiver &&
            'Avtalen er bekreftet av arbeidsgiver'}
        <Knapp
            disabled={props.avtale.bekreftetAvVeileder}
            onClick={props.bekreftVeilederOnClick}
        >
            Bekreft som NAV-veileder
        </Knapp>
        {props.avtale.bekreftetAvVeileder &&
            'Avtalen er bekreftet av NAV-veileder'}
    </Innholdsboks>
);

export default GodkjenningKnapper;
