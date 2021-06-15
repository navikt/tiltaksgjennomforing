import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React, { FunctionComponent, useContext, useState } from 'react';
import GodkjenningInstruks from '../Oppsummering/instruks/GodkjenningInstruks';
import GodkjennPaVegneAvArbeidsgiver from './GodkjennPaVegneAvArbeidsgiver';
import GodkjennPaVegneAvDeltaker from './GodkjennPaVegneAvDeltaker';

const GodkjenningVeileder: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const [skalGodkjennesPaVegne, setskalGodkjennesPaVegne] = useState(false);

    const godkjennAvtalen = () => {
        return avtaleContext.godkjenn();
    };

    const [godkjenningFunksjon, setGodkjenningFunksjon] = useState(godkjennAvtalen);

    const kunGodkjentAvDeltaker =
        avtaleContext.avtale.godkjentAvDeltaker && !avtaleContext.avtale.godkjentAvArbeidsgiver;
    const kunGodkjentAvArbeidsgiver =
        avtaleContext.avtale.godkjentAvArbeidsgiver && !avtaleContext.avtale.godkjentAvDeltaker;
    const ikkeGodkjentAvNoen = !avtaleContext.avtale.godkjentAvDeltaker && !avtaleContext.avtale.godkjentAvArbeidsgiver;

    return (
        <Innholdsboks className="godkjenning" ariaLabel={'Godkjenn avtalen'}>
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            <GodkjenningInstruks />

            {kunGodkjentAvArbeidsgiver && (
                <GodkjennPaVegneAvDeltaker
                    setGodkjenningFunksjon={setGodkjenningFunksjon}
                    setskalGodkjennesPaVegne={setskalGodkjennesPaVegne}
                />
            )}
            {kunGodkjentAvDeltaker && (
                <GodkjennPaVegneAvArbeidsgiver setskalGodkjennesPaVegne={setskalGodkjennesPaVegne} />
            )}
            {ikkeGodkjentAvNoen && (
                <>
                    <GodkjennPaVegneAvDeltaker setskalGodkjennesPaVegne={setskalGodkjennesPaVegne} />
                    <GodkjennPaVegneAvArbeidsgiver setskalGodkjennesPaVegne={setskalGodkjennesPaVegne} />
                </>
            )}

            {avtaleContext.avtale.harFamilietilknytning && (
                <>
                    <AlertStripeAdvarsel>
                        OBS! Det er oppgitt at deltaker har en relasjon med arbeidsgiver
                    </AlertStripeAdvarsel>
                    <VerticalSpacer rem={1} />
                </>
            )}

            {<LagreKnapp lagre={godkjennAvtalen} label="Godkjenn avtalen" />}
        </Innholdsboks>
    );
};

export default GodkjenningVeileder;
