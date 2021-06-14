import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { GodkjentPaVegneGrunner } from '@/types/avtale';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { FunctionComponent, useContext, useState } from 'react';
import GodkjennPaVegneAv from '../Oppsummering/GodkjennPaVegneAv/GodkjennPaVegneAv';
import GodkjenningInstruks from '../Oppsummering/instruks/GodkjenningInstruks';

const GodkjenningVeileder: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [godkjentPaVegneGrunn, setGodkjentPaVegneGrunn] = useState<GodkjentPaVegneGrunner>(initState);

    const godkjennAvtalen = () => {
        console.log('hehe');
    };

    return (
        <Innholdsboks className="godkjenning" ariaLabel={'Godkjenn avtalen'}>
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            <GodkjenningInstruks />

            {!avtaleContext.avtale.godkjentAvDeltaker && (
                <GodkjennPaVegneAv godkjentPaVegneGrunn={godkjentPaVegneGrunn} moderState={paVegneState} />
            )}

            {avtaleContext.avtale.harFamilietilknytning && (
                <>
                    <AlertStripeAdvarsel>
                        OBS! Det er oppgitt at deltaker har en relasjon med arbeidsgiver
                    </AlertStripeAdvarsel>
                    <VerticalSpacer rem={1} />
                </>
            )}

            <LagreKnapp lagre={godkjennAvtalen} label="Godkjenn avtalen" />
        </Innholdsboks>
    );
};

export default GodkjenningVeileder;
