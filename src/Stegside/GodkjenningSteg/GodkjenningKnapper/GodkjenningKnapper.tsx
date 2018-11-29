import * as React from 'react';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import PanelBase from 'nav-frontend-paneler';
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
        <PanelBase>
            <SkjemaGruppe
                className={'bekreft'}
                title={'Bekreft innhold i avtalen'}
            >
                <div>
                    <Knapp
                        disabled={props.avtale.bekreftetAvBruker}
                        onClick={props.bekreftBrukerOnClick}
                    >
                        Bekreft som bruker
                    </Knapp>
                    {props.avtale.bekreftetAvBruker &&
                        'Avtalen er bekreftet av bruker'}
                </div>
                <div>
                    <Knapp
                        disabled={props.avtale.bekreftetAvArbeidsgiver}
                        onClick={props.bekreftArbeidsgiverOnClick}
                    >
                        Bekreft som arbeidsgiver
                    </Knapp>
                    {props.avtale.bekreftetAvArbeidsgiver &&
                        'Avtalen er bekreftet av arbeidsgiver'}
                </div>
                <div>
                    <Knapp
                        disabled={props.avtale.bekreftetAvVeileder}
                        onClick={props.bekreftVeilederOnClick}
                    >
                        Bekreft som NAV-veileder
                    </Knapp>
                    {props.avtale.bekreftetAvVeileder &&
                        'Avtalen er bekreftet av NAV-veileder'}
                </div>
            </SkjemaGruppe>
        </PanelBase>
    </Innholdsboks>
);

export default GodkjenningKnapper;
