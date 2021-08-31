import { AvtaleContext } from '@/AvtaleProvider';
import GodkjennPåVegneAvDeltakerCheckboxer from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/GodkjennPåVegneAvDeltakerCheckboxer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { GodkjentPaVegneAvArbeidsgiverGrunner, GodkjentPaVegneAvDeltakerGrunner } from '@/types/avtale';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';
import GodkjennPåVegneAvArbeidsgiverCheckboxer from './GodkjennPåVegneAvArbeidsgiverCheckboxer';

type Props = {
    skalGodkjennesPaVegne: boolean;
    setSkalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
};

const GodkjennPaVegneAvBeggeParter: FunctionComponent<Props> = (props) => {
    const avtaleContext = useContext(AvtaleContext);

    const godkjennPaVegneLabel = props.skalGodkjennesPaVegne
        ? 'Jeg skal godkjenne på vegne av deltakeren og arbeidsgiveren fordi:'
        : 'Jeg skal godkjenne på vegne av deltakeren og arbeidsgiveren';

    const [godkjentPåVegneAvGrunnerDeltaker, setGodkjentPåVegneAvGrunnerDeltaker] =
        useState<GodkjentPaVegneAvDeltakerGrunner>({
            digitalKompetanse: false,
            reservert: false,
            ikkeBankId: false,
        });
    const [godkjentPåVegneAvGrunnerArbeidsgiver, setGodkjentPåVegneAvGrunnerArbeidsgiver] =
        useState<GodkjentPaVegneAvArbeidsgiverGrunner>({
            farIkkeTilgangPersonvern: false,
            klarerIkkeGiFaTilgang: false,
            vetIkkeHvemSomKanGiTilgang: false,
        });

    const [feilmeldingGrunnDeltaker, setFeilmeldingGrunnDeltaker] = useState<string>();
    const [feilmeldingGrunnArbeidsgiver, setFeilmeldingGrunnArbeidsgiver] = useState<string>();

    const [erInformert, setErInformert] = useState(false);
    const [feilErInformert, setFeilErInformert] = useState<string>();

    const godkjennAvtalen = () => {
        const valgtMinstEnGrunnDeltaker =
            godkjentPåVegneAvGrunnerDeltaker.ikkeBankId ||
            godkjentPåVegneAvGrunnerDeltaker.reservert ||
            godkjentPåVegneAvGrunnerDeltaker.digitalKompetanse;
        if (!valgtMinstEnGrunnDeltaker) {
            setFeilmeldingGrunnDeltaker('Oppgi minst én grunn for godkjenning på vegne av deltaker');
            return;
        } else {
            setFeilmeldingGrunnDeltaker(undefined);
        }
        const valgtMinstEnGrunnArbeidsgiver =
            godkjentPåVegneAvGrunnerArbeidsgiver.klarerIkkeGiFaTilgang ||
            godkjentPåVegneAvGrunnerArbeidsgiver.vetIkkeHvemSomKanGiTilgang ||
            godkjentPåVegneAvGrunnerArbeidsgiver.farIkkeTilgangPersonvern;
        if (!valgtMinstEnGrunnArbeidsgiver) {
            setFeilmeldingGrunnArbeidsgiver('Oppgi minst én grunn for godkjenning på vegne av arbeidsgiver');
            return;
        } else {
            setFeilmeldingGrunnArbeidsgiver(undefined);
        }

        if (!erInformert) {
            setFeilErInformert(
                'Deltaker og arbeidsgiver må være informert om kravene og godkjenne innholdet i avtalen.'
            );
            return;
        } else {
            setFeilErInformert(undefined);
        }

        return avtaleContext.godkjennPaVegneAvDeltakerOgArbeidsgiver({
            godkjentPaVegneAvDeltakerGrunn: godkjentPåVegneAvGrunnerDeltaker,
            godkjentPaVegneAvArbeidsgiverGrunn: godkjentPåVegneAvGrunnerArbeidsgiver,
        });
    };

    return (
        <>
            <Checkbox
                label={godkjennPaVegneLabel}
                checked={props.skalGodkjennesPaVegne}
                onChange={(e) => {
                    props.setSkalGodkjennesPaVegne(e.currentTarget.checked);
                }}
            />
            {props.skalGodkjennesPaVegne && (
                <>
                    <div style={{ marginLeft: '2rem' }}>
                        <Element>Deltaker</Element>
                        <VerticalSpacer rem={0.5} />
                        <GodkjennPåVegneAvDeltakerCheckboxer
                            godkjentPåVegneAvGrunner={godkjentPåVegneAvGrunnerDeltaker}
                            setGodkjentPåVegneAvGrunner={setGodkjentPåVegneAvGrunnerDeltaker}
                            feilmeldingGrunn={feilmeldingGrunnDeltaker}
                            setFeilmeldingGrunn={setFeilmeldingGrunnDeltaker}
                        />
                        <VerticalSpacer rem={1} />
                        <Element>Arbeidsgiver</Element>
                        <VerticalSpacer rem={0.5} />
                        <GodkjennPåVegneAvArbeidsgiverCheckboxer
                            godkjentPåVegneAvGrunner={godkjentPåVegneAvGrunnerArbeidsgiver}
                            setGodkjentPåVegneAvGrunner={setGodkjentPåVegneAvGrunnerArbeidsgiver}
                            feilmeldingGrunn={feilmeldingGrunnArbeidsgiver}
                            setFeilmeldingGrunn={setFeilmeldingGrunnArbeidsgiver}
                        />
                    </div>
                    <VerticalSpacer rem={1} />
                    <SkjemaGruppe feil={feilErInformert}>
                        <Checkbox
                            label="Deltakeren og arbeidsgiveren er informert om kravene og godkjenner innholdet i avtalen."
                            checked={erInformert}
                            onChange={() => setErInformert(!erInformert)}
                        />
                    </SkjemaGruppe>
                    <VerticalSpacer rem={1} />
                    {props.skalGodkjennesPaVegne && <LagreKnapp lagre={godkjennAvtalen} label="Godkjenn avtalen" />}
                    <VerticalSpacer rem={1} />
                </>
            )}
        </>
    );
};

export default GodkjennPaVegneAvBeggeParter;
