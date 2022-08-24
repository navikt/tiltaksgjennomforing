import { AvtaleContext } from '@/AvtaleProvider';
import GodkjennPaVegneAvBeggeParter from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/GodkjennPaVegneAvBeggeParter';
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
    const {avtale,godkjenn} = useContext(AvtaleContext);

    const [skalGodkjennesPaVegne, setSkalGodkjennesPaVegne] = useState(false);

    const kunGodkjentAvDeltaker =
        avtale.godkjentAvDeltaker && !avtale.godkjentAvArbeidsgiver;
    const kunGodkjentAvArbeidsgiver =
        avtale.godkjentAvArbeidsgiver && !avtale.godkjentAvDeltaker;
    const ikkeGodkjentAvNoen = !avtale.godkjentAvDeltaker && !avtale.godkjentAvArbeidsgiver;
    return (
        <Innholdsboks className="godkjenning" ariaLabel={'Godkjenn avtalen'}>
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            <GodkjenningInstruks />

            <VerticalSpacer rem={2} />
            {avtale.tiltakstype !== 'SOMMERJOBB' && !avtale.godkjentAvDeltaker && (
                <GodkjennPaVegneAvDeltaker
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}
            {avtale.tiltakstype === 'SOMMERJOBB' && kunGodkjentAvArbeidsgiver && (
                <GodkjennPaVegneAvDeltaker
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}
            {avtale.tiltakstype === 'SOMMERJOBB' && kunGodkjentAvDeltaker && (
                <GodkjennPaVegneAvArbeidsgiver
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}
            {avtale.tiltakstype === 'SOMMERJOBB' && ikkeGodkjentAvNoen && (
                <GodkjennPaVegneAvBeggeParter
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}

            {avtale.gjeldendeInnhold.harFamilietilknytning && (
                <>
                    <AlertStripeAdvarsel>
                        OBS! Det er oppgitt at deltaker har en relasjon med arbeidsgiver
                    </AlertStripeAdvarsel>
                    <VerticalSpacer rem={1} />
                </>
            )}

            {!skalGodkjennesPaVegne && <LagreKnapp lagre={godkjenn} label="Godkjenn avtalen" />}
        </Innholdsboks>
    );
};

export default GodkjenningVeileder;
