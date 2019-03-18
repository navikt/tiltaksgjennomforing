import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useState } from 'react';
import ApiError from '../../api-error';
import { Rolle } from '../../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import { Avtale } from '../avtale';
import ArbeidsgiverInstruks from './Oppsummering/instruks/ArbeidsgiverInstruks';
import DeltakerInstruks from './Oppsummering/instruks/DeltakerInstruks';
import './Godkjenning.less';
import VeilederInstruks from "./Oppsummering/instruks/VeilederInstruks";

interface Props {
    avtale: Avtale;
    rolle: Rolle;
    endreGodkjenning: (godkjent: boolean) => Promise<any>;
}

const harGodkjentSelv = (avtale: Avtale, rolle: Rolle) => {
    switch (rolle) {
        case 'DELTAKER':
            return avtale.godkjentAvDeltaker;
        case 'ARBEIDSGIVER':
            return avtale.godkjentAvArbeidsgiver;
        case 'VEILEDER':
            return avtale.godkjentAvVeileder;
        default:
            return false;
    }
};

const instruks = (rolle: Rolle) => {
    switch (rolle) {
        case 'DELTAKER':
            return <DeltakerInstruks />;
        case 'ARBEIDSGIVER':
            return <ArbeidsgiverInstruks />;
        case 'VEILEDER':
            return <VeilederInstruks/>;
    }
};

const Godkjenning = (props: Props) => {
    const [bekreftet, setBekreftet] = useState(false);

    if (harGodkjentSelv(props.avtale, props.rolle)) {
        return null;
    }
    return (
        <Innholdsboks className="godkjenning">
            <Systemtittel className="godkjenning__tittel">
                Godkjenn avtalen
            </Systemtittel>
            {instruks(props.rolle)}
            {props.rolle !== 'VEILEDER' && (
                <BekreftCheckboksPanel
                    label="Ja, jeg forstår kravene og godkjenner innholdet i avtalen"
                    checked={bekreftet}
                    onChange={() => setBekreftet(!bekreftet)}
                />
            )}
            <div>
                <LagreKnapp
                    lagre={() => {
                        if (bekreftet || props.rolle === 'VEILEDER') {
                            return props.endreGodkjenning(true);
                        } else {
                            throw new ApiError(
                                'Må bekrefte innholdet i avtalen'
                            );
                        }
                    }}
                    label="Godkjenn avtalen"
                />
            </div>
        </Innholdsboks>
    );
};

export default Godkjenning;
