import { AvtaleContext } from '@/AvtaleProvider';
import GodkjennPåVegneAvDeltakerCheckboxer from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/godkjenningVeileder/komponenter/GodkjennPåVegneAvDeltakerCheckboxer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { GodkjentPaVegneAvArbeidsgiverGrunner, GodkjentPaVegneAvDeltakerGrunner } from '@/types/avtale';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { Label } from '@navikt/ds-react';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';
import GodkjennPåVegneAvArbeidsgiverCheckboxer from './komponenter/GodkjennPåVegneAvArbeidsgiverCheckboxer';
import GodkjennPaVegneAvMedAlleredeOpprettetTiltak from '@/komponenter/alleredeOpprettetTiltak/GodkjennPaVegneAvMedAlleredeOpprettetTiltak';
import { AlleredeOpprettetAvtaleContext } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import { fetchdata } from '@/komponenter/alleredeOpprettetTiltak/api/alleredeUtils';
import BEMHelper from '@/utils/bem';

interface Props {
    skalGodkjennesPaVegne: boolean;
    setSkalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
}

const GodkjennPaVegneAvBeggeParter: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('godkjenning');
    const { avtale, godkjennPaVegneAvDeltakerOgArbeidsgiver } = useContext(AvtaleContext);
    const { deltakerFnr, tiltakstype, id, gjeldendeInnhold } = avtale;
    const { startDato, sluttDato } = gjeldendeInnhold;
    const { alleredeRegistrertAvtale, setAlleredeRegistrertAvtale } = useContext(AlleredeOpprettetAvtaleContext);
    const [godkjenningsModalIsOpen, setGodkjenningsModalIsOpen] = useState<boolean>(false);

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

    const godkjenn = (): void | Promise<void> => {
        const valgtMinstEnGrunnDeltaker =
            godkjentPåVegneAvGrunnerDeltaker.ikkeBankId ||
            godkjentPåVegneAvGrunnerDeltaker.reservert ||
            godkjentPåVegneAvGrunnerDeltaker.digitalKompetanse;
        if (!valgtMinstEnGrunnDeltaker) {
            return setFeilmeldingGrunnDeltaker('Oppgi minst én grunn for godkjenning på vegne av deltaker');
        } else {
            setFeilmeldingGrunnDeltaker(undefined);
        }
        const valgtMinstEnGrunnArbeidsgiver =
            godkjentPåVegneAvGrunnerArbeidsgiver.klarerIkkeGiFaTilgang ||
            godkjentPåVegneAvGrunnerArbeidsgiver.vetIkkeHvemSomKanGiTilgang ||
            godkjentPåVegneAvGrunnerArbeidsgiver.farIkkeTilgangPersonvern;
        if (!valgtMinstEnGrunnArbeidsgiver) {
            return setFeilmeldingGrunnArbeidsgiver('Oppgi minst én grunn for godkjenning på vegne av arbeidsgiver');
        } else {
            setFeilmeldingGrunnArbeidsgiver(undefined);
        }

        if (!erInformert) {
            return setFeilErInformert(
                'Deltaker og arbeidsgiver må være informert om kravene og godkjenne innholdet i avtalen.'
            );
        } else {
            setFeilErInformert(undefined);
        }

        return godkjennPaVegneAvDeltakerOgArbeidsgiver({
            godkjentPaVegneAvDeltakerGrunn: godkjentPåVegneAvGrunnerDeltaker,
            godkjentPaVegneAvArbeidsgiverGrunn: godkjentPåVegneAvGrunnerArbeidsgiver,
        });
    };

    return (
        <div className={cls.element('godkjenn-pa-vegne-av')}>
            <Checkbox
                label={godkjennPaVegneLabel}
                checked={props.skalGodkjennesPaVegne}
                onChange={(e) => {
                    props.setSkalGodkjennesPaVegne(e.currentTarget.checked);
                }}
            />
            {props.skalGodkjennesPaVegne && (
                <React.Fragment>
                    <div className={cls.element('checkbox-wrapper')}>
                        <Label>Deltaker</Label>
                        <GodkjennPåVegneAvDeltakerCheckboxer
                            godkjentPåVegneAvGrunner={godkjentPåVegneAvGrunnerDeltaker}
                            setGodkjentPåVegneAvGrunner={setGodkjentPåVegneAvGrunnerDeltaker}
                            feilmeldingGrunn={feilmeldingGrunnDeltaker}
                            setFeilmeldingGrunn={setFeilmeldingGrunnDeltaker}
                            className={cls.element('checkboxer')}
                        />
                        <Label className={cls.element('checkbox-sub-title')}>Arbeidsgiver</Label>
                        <GodkjennPåVegneAvArbeidsgiverCheckboxer
                            godkjentPåVegneAvGrunner={godkjentPåVegneAvGrunnerArbeidsgiver}
                            setGodkjentPåVegneAvGrunner={setGodkjentPåVegneAvGrunnerArbeidsgiver}
                            feilmeldingGrunn={feilmeldingGrunnArbeidsgiver}
                            setFeilmeldingGrunn={setFeilmeldingGrunnArbeidsgiver}
                        />
                    </div>
                    <SkjemaGruppe feil={feilErInformert} className={cls.element('skjema-gruppe')}>
                        <Checkbox
                            label="Deltakeren og arbeidsgiveren er informert om kravene og godkjenner innholdet i avtalen."
                            checked={erInformert}
                            onChange={() => setErInformert(!erInformert)}
                        />
                    </SkjemaGruppe>
                    {props.skalGodkjennesPaVegne && (
                        <LagreKnapp
                            className={cls.element('lagre-knapper')}
                            lagre={() =>
                                fetchdata({
                                    deltakerFnr,
                                    tiltakstype,
                                    id,
                                    startDato,
                                    sluttDato,
                                    alleredeRegistrertAvtale,
                                    setAlleredeRegistrertAvtale,
                                    setGodkjenningsModalIsOpen,
                                    godkjenn,
                                })
                            }
                            label="Godkjenn avtalen"
                        />
                    )}
                    <GodkjennPaVegneAvMedAlleredeOpprettetTiltak
                        godkjennPaVegneAv={() => godkjenn()}
                        modalIsOpen={godkjenningsModalIsOpen}
                        setModalIsOpen={setGodkjenningsModalIsOpen}
                    />
                </React.Fragment>
            )}
        </div>
    );
};

export default GodkjennPaVegneAvBeggeParter;
