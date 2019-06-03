import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useState } from 'react';
import ApiError from '../../api-error';
import { Rolle } from '../../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import { Avtale, GodkjentPaVegneGrunner } from '../avtale';
import ArbeidsgiverInstruks from './Oppsummering/instruks/ArbeidsgiverInstruks';
import DeltakerInstruks from './Oppsummering/instruks/DeltakerInstruks';
import './Godkjenning.less';
import VeilederInstruks from './Oppsummering/instruks/VeilederInstruks';
import GodkjennPaVegneAv from './Oppsummering/GodkjennPaVegneAv/GodkjennPaVegneAv';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import UfullstendigError from '../../ufullstendig-error';

interface Props {
    avtale: Avtale;
    rolle: Rolle;
    endreGodkjenning: (godkjent: boolean) => Promise<any>;
    godkjennPaVegne: (paVegneGrunn: GodkjentPaVegneGrunner) => Promise<any>;
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
            return <VeilederInstruks />;
    }
};

const initState: GodkjentPaVegneGrunner = {
    digitalKompetanse: false,
    ikkeMinId: false,
    reservert: false,
};

const Godkjenning = (props: Props) => {
    const [bekreftet, setBekreftet] = useState(false);
    const [godkjentPaVegneAv, setGodkjentPaVegneAv] = useState(false);
    const [godkjentPaVegneGrunn, setGodkjentPaVegneGrunn] = useState(initState);
    const [paVegneDeltakerInformert, setPaVegneDeltakerInformert] = useState(
        false
    );

    const [feilIngenGrunn, setFeilIngenGrunn] = useState<
        SkjemaelementFeil | undefined
    >(undefined);
    const [feilDeltakerInformert, setfeilDeltakerInformert] = useState<
        SkjemaelementFeil | undefined
    >(undefined);

    const paVegneState = {
        godkjentPaVegneAv: godkjentPaVegneAv,
        setGodkjentPaVegneAv: setGodkjentPaVegneAv,
        setGodkjentPaVegneGrunn: setGodkjentPaVegneGrunn,
        feilIngenGrunn: feilIngenGrunn,
        setFeilIngenGrunn: setFeilIngenGrunn,
        feilDeltakerInformert: feilDeltakerInformert,
        setfeilDeltakerInformert: setfeilDeltakerInformert,
        paVegneDeltakerInformert: paVegneDeltakerInformert,
        setPaVegneDeltakerInformert: setPaVegneDeltakerInformert,
    };

    if (harGodkjentSelv(props.avtale, props.rolle)) {
        return null;
    }
    const valgtEnGrunn = () => {
        if (!godkjentPaVegneGrunn) {
            return false;
        }
        return (
            godkjentPaVegneGrunn.ikkeMinId ||
            godkjentPaVegneGrunn.reservert ||
            godkjentPaVegneGrunn.digitalKompetanse
        );
    };

    const validerGodkjentPaVegne = () => {
        let kanLagres = true;
        if (!valgtEnGrunn()) {
            setFeilIngenGrunn({
                feilmelding:
                    'Oppgi minst én grunn for godkjenning på vegne av deltaker',
            });
            kanLagres = false;
        }
        if (!paVegneDeltakerInformert) {
            setfeilDeltakerInformert({
                feilmelding:
                    'Deltaker må være informert om kravene og godkjenne innholdet i avtalen.',
            });
            kanLagres = false;
        }
        return kanLagres;
    };
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
            {props.rolle == 'VEILEDER' && (
                <GodkjennPaVegneAv
                    godkjentPaVegneGrunn={godkjentPaVegneGrunn}
                    moderState={paVegneState}
                />
            )}
            <div>
                <LagreKnapp
                    className={
                        godkjentPaVegneAv
                            ? 'godkjenning__lagreKnapp'
                            : undefined
                    }
                    lagre={() => {
                        if (bekreftet || props.rolle === 'VEILEDER') {
                            if (godkjentPaVegneAv) {
                                if (!validerGodkjentPaVegne()) {
                                    throw new UfullstendigError('');
                                }
                                return props.godkjennPaVegne(
                                    godkjentPaVegneGrunn
                                );
                            }
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
