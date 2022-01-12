import {AvtaleContext} from '@/AvtaleProvider';
import GodkjennPaVegneAvBeggeParter from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/GodkjennPaVegneAvBeggeParter';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import React, {FunctionComponent, useContext, useState} from 'react';
import GodkjenningInstruks from '../Oppsummering/instruks/GodkjenningInstruks';
import GodkjennPaVegneAvArbeidsgiver from './GodkjennPaVegneAvArbeidsgiver';
import GodkjennPaVegneAvDeltaker from './GodkjennPaVegneAvDeltaker';

const GodkjenningVeileder: FunctionComponent = () => {
  const avtaleContext = useContext(AvtaleContext);

  const [skalGodkjennesPaVegne, setSkalGodkjennesPaVegne] = useState(false);

  const kunGodkjentAvDeltaker =
        avtaleContext.avtale.godkjentAvDeltaker && !avtaleContext.avtale.godkjentAvArbeidsgiver;
    const kunGodkjentAvArbeidsgiver =
        avtaleContext.avtale.godkjentAvArbeidsgiver && !avtaleContext.avtale.godkjentAvDeltaker;
    const ikkeGodkjentAvNoen = !avtaleContext.avtale.godkjentAvDeltaker && !avtaleContext.avtale.godkjentAvArbeidsgiver;

    return (
        <Innholdsboks className="godkjenning" ariaLabel={'Godkjenn avtalen'}>
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            <GodkjenningInstruks />

            {avtaleContext.avtale.tiltakstype !== 'SOMMERJOBB' && !avtaleContext.avtale.godkjentAvDeltaker && (
                <GodkjennPaVegneAvDeltaker
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}
            {avtaleContext.avtale.tiltakstype === 'SOMMERJOBB' && kunGodkjentAvArbeidsgiver && (
                <GodkjennPaVegneAvDeltaker
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}
            {avtaleContext.avtale.tiltakstype === 'SOMMERJOBB' && kunGodkjentAvDeltaker && (
                <GodkjennPaVegneAvArbeidsgiver
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}
            {avtaleContext.avtale.tiltakstype === 'SOMMERJOBB' && ikkeGodkjentAvNoen && (
                <GodkjennPaVegneAvBeggeParter
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}

          {avtaleContext.avtale.gjeldendeInnhold.harFamilietilknytning && (
              <>
                <AlertStripeAdvarsel>
                  OBS! Det er oppgitt at deltaker har en relasjon med arbeidsgiver
                </AlertStripeAdvarsel>
                <VerticalSpacer rem={1}/>
              </>
          )}

            {!skalGodkjennesPaVegne && <LagreKnapp lagre={avtaleContext.godkjenn} label="Godkjenn avtalen" />}
        </Innholdsboks>
    );
};

export default GodkjenningVeileder;
