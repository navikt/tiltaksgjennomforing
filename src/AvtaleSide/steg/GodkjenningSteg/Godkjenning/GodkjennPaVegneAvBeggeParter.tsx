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
    setskalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
};

const GodkjennPaVegneAvBeggeParter: FunctionComponent<Props> = props => {
    const avtaleContext = useContext(AvtaleContext);

    const [godkjennPaVegneAvBegge, setGodkjennPaVegneAvBegge] = useState(false);
    const godkjennPaVegneLabel = godkjennPaVegneAvBegge
        ? 'Jeg skal godkjenne på vegne av deltaker og arbeidsgiver, fordi deltakeren og arbeidsgiveren'
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

    const [deltakerInformert, setDeltakerInformert] = useState(false);
    const [feilDeltakerInformert, setFeilDeltakerInformert] = useState<SkjemaelementFeil>();
    const [arbeidsgiverInformert, setArbeidsgiverInformert] = useState(false);
    const [feilArbeidsgiverInformert, setFeilArbeidsgiverInformert] = useState<SkjemaelementFeil>();

    const godkjennAvtalen = () => {
        const valgtMinstEnGrunnDeltaker =
            godkjentPåVegneAvGrunnerDeltaker.ikkeBankId ||
            godkjentPåVegneAvGrunnerDeltaker.reservert ||
            godkjentPåVegneAvGrunnerDeltaker.digitalKompetanse;
        if (!valgtMinstEnGrunnDeltaker) {
            setFeilmeldingGrunnDeltaker({ feilmelding: 'Oppgi minst én grunn for godkjenning på vegne av deltaker' });
            return;
        } else {
            setFeilmeldingGrunnDeltaker(undefined);
        }
        if (!deltakerInformert) {
            setFeilDeltakerInformert({
                feilmelding: 'Deltaker må være informert om kravene og godkjenne innholdet i avtalen.',
            });
            return;
        } else {
            setFeilDeltakerInformert(undefined);
        }

        const valgtMinstEnGrunnArbeidsgiver =
            godkjentPåVegneAvGrunnerArbeidsgiver.klarerIkkeGiFaTilgang ||
            godkjentPåVegneAvGrunnerArbeidsgiver.vetIkkeHvemSomKanGiTilgang ||
            godkjentPåVegneAvGrunnerArbeidsgiver.farIkkeTilgangPersonvern;
        if (!valgtMinstEnGrunnArbeidsgiver) {
            setFeilmeldingGrunnArbeidsgiver({
                feilmelding: 'Oppgi minst én grunn for godkjenning på vegne av arbeidsgiver',
            });
            return;
        } else {
            setFeilmeldingGrunnArbeidsgiver(undefined);
        }
        if (!arbeidsgiverInformert) {
            setFeilArbeidsgiverInformert({
                feilmelding: 'Arbeidsgiver må være informert om kravene og godkjenne innholdet i avtalen.',
            });
            return;
        } else {
            setFeilArbeidsgiverInformert(undefined);
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
                checked={godkjennPaVegneAvBegge}
                onChange={e => {
                    props.setskalGodkjennesPaVegne(e.currentTarget.checked);
                    setGodkjennPaVegneAvBegge(e.currentTarget.checked);
                }}
            />
            {godkjennPaVegneAvBegge && (
                <>
                    <div style={{ marginLeft: '1rem' }}>
                        <Element>Deltaker:</Element>
                        <VerticalSpacer rem={0.5} />
                        <GodkjennPåVegneAvDeltakerCheckboxer
                            godkjentPåVegneAvGrunner={godkjentPåVegneAvGrunnerDeltaker}
                            setGodkjentPåVegneAvGrunner={setGodkjentPåVegneAvGrunnerDeltaker}
                            feilmeldingGrunn={feilmeldingGrunnDeltaker}
                            setFeilmeldingGrunn={setFeilmeldingGrunnDeltaker}
                        />
                        <VerticalSpacer rem={1} />
                        <Element>Arbeidsgiver:</Element>
                        <VerticalSpacer rem={0.5} />
                        <GodkjennPåVegneAvArbeidsgiverCheckboxer
                            godkjentPåVegneAvGrunner={godkjentPåVegneAvGrunnerArbeidsgiver}
                            setGodkjentPåVegneAvGrunner={setGodkjentPåVegneAvGrunnerArbeidsgiver}
                            feilmeldingGrunn={feilmeldingGrunnArbeidsgiver}
                            setFeilmeldingGrunn={setFeilmeldingGrunnArbeidsgiver}
                        />
                    </div>
                    <VerticalSpacer rem={1} />
                    <SkjemaGruppe feil={feilDeltakerInformert}>
                        <Checkbox
                            label="Deltakeren er informert om kravene og godkjenner innholdet i avtalen."
                            checked={deltakerInformert}
                            onChange={() => setDeltakerInformert(!deltakerInformert)}
                        />
                    </SkjemaGruppe>
                    <VerticalSpacer rem={1} />
                    <SkjemaGruppe feil={feilArbeidsgiverInformert}>
                        <Checkbox
                            label="Arbeidsgiveren er informert om kravene og godkjenner innholdet i avtalen."
                            checked={arbeidsgiverInformert}
                            onChange={() => setArbeidsgiverInformert(!arbeidsgiverInformert)}
                        />
                    </SkjemaGruppe>
                    {godkjennPaVegneAvBegge && <LagreKnapp lagre={godkjennAvtalen} label="Godkjenn avtalen" />}
                </>
            )}
        </>
    );
};

export default GodkjennPaVegneAvBeggeParter;
