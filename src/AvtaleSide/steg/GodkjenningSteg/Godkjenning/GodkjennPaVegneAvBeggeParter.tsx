import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';
import GodkjennPåVegneAvDeltakerCheckboxer from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/GodkjennPåVegneAvDeltakerCheckboxer';
import { GodkjentPaVegneAvArbeidsgiverGrunner, GodkjentPaVegneAvDeltakerGrunner } from '@/types/avtale';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import GodkjennPåVegneAvArbeidsgiverCheckboxer from './GodkjennPåVegneAvArbeidsgiverCheckboxer';
import { Element } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { AvtaleContext } from '@/AvtaleProvider';

type Props = {
    skalGodkjennesPaVegne: boolean;
    setSkalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
};

const GodkjennPaVegneAvBeggeParter: FunctionComponent<Props> = props => {
    const avtaleContext = useContext(AvtaleContext);

    const godkjennPaVegneLabel = props.skalGodkjennesPaVegne
        ? 'Jeg skal godkjenne på vegne av deltakeren og arbeidsgiveren fordi:'
        : 'Jeg skal godkjenne på vegne av deltakeren og arbeidsgiveren';

    const [godkjentPåVegneAvGrunnerDeltaker, setGodkjentPåVegneAvGrunnerDeltaker] = useState<
        GodkjentPaVegneAvDeltakerGrunner
    >({
        digitalKompetanse: false,
        reservert: false,
        ikkeBankId: false,
    });
    const [godkjentPåVegneAvGrunnerArbeidsgiver, setGodkjentPåVegneAvGrunnerArbeidsgiver] = useState<
        GodkjentPaVegneAvArbeidsgiverGrunner
    >({
        farIkkeTilgangPersonvern: false,
        klarerIkkeGiFaTilgang: false,
        vetIkkeHvemSomKanGiTilgang: false,
    });

    const [feilmeldingGrunnDeltaker, setFeilmeldingGrunnDeltaker] = useState<SkjemaelementFeil>();
    const [feilmeldingGrunnArbeidsgiver, setFeilmeldingGrunnArbeidsgiver] = useState<SkjemaelementFeil>();

    const [erInformert, setErInformert] = useState(false);
    const [feilErInformert, setFeilErInformert] = useState<SkjemaelementFeil>();

    const godkjennAvtalen = () => {
        const valgtMinstEnGrunnDeltaker =
            godkjentPåVegneAvGrunnerDeltaker.ikkeBankId ||
            godkjentPåVegneAvGrunnerDeltaker.reservert ||
            godkjentPåVegneAvGrunnerDeltaker.digitalKompetanse;
        if (!valgtMinstEnGrunnDeltaker) {
            setFeilmeldingGrunnDeltaker({ feilmelding: 'Oppgi minst én grunn for godkjenning på vegne av deltaker' });
        } else {
            setFeilmeldingGrunnDeltaker(undefined);
        }
        const valgtMinstEnGrunnArbeidsgiver =
            godkjentPåVegneAvGrunnerArbeidsgiver.klarerIkkeGiFaTilgang ||
            godkjentPåVegneAvGrunnerArbeidsgiver.vetIkkeHvemSomKanGiTilgang ||
            godkjentPåVegneAvGrunnerArbeidsgiver.farIkkeTilgangPersonvern;
        if (!valgtMinstEnGrunnArbeidsgiver) {
            setFeilmeldingGrunnArbeidsgiver({
                feilmelding: 'Oppgi minst én grunn for godkjenning på vegne av arbeidsgiver',
            });
        } else {
            setFeilmeldingGrunnArbeidsgiver(undefined);
        }

        if (!erInformert) {
            setFeilErInformert({
                feilmelding: 'Deltaker og arbeidsgiver må være informert om kravene og godkjenne innholdet i avtalen.',
            });
        } else {
            setFeilErInformert(undefined);
        }

        if (feilmeldingGrunnDeltaker || feilmeldingGrunnArbeidsgiver || feilErInformert) {
            return;
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
                onChange={e => {
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
