import React, { useReducer, Dispatch, SetStateAction } from 'react';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import './GodkjennPaVegneAv.less';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { GodkjentPaVegneGrunner } from '../../../avtale';

type Grunner = GodkjentPaVegneGrunner;

type Props = {
    godkjentPaVegneGrunn: GodkjentPaVegneGrunner;
    moderState: {
        godkjentPaVegneAv: boolean;
        setGodkjentPaVegneAv: Dispatch<SetStateAction<boolean>>;
        setGodkjentPaVegneGrunn: Dispatch<
            SetStateAction<GodkjentPaVegneGrunner>
        >;
        feilIngenGrunn: SkjemaelementFeil | undefined;
        setFeilIngenGrunn: Dispatch<
            SetStateAction<SkjemaelementFeil | undefined>
        >;
        feilDeltakerInformert: SkjemaelementFeil | undefined;
        setfeilDeltakerInformert: Dispatch<
            SetStateAction<SkjemaelementFeil | undefined>
        >;
        paVegneDeltakerInformert: boolean;
        setPaVegneDeltakerInformert: Dispatch<SetStateAction<boolean>>;
    };
};

const initialState: GodkjentPaVegneGrunner = {
    ikkeMinId: false,
    reservert: false,
    digitalKompetanse: false,
};

const GodkjennPaVegneAv = (props: Props) => {
    const settFeilmeldingIngenGrunn = () => {
        if (
            props.godkjentPaVegneGrunn &&
            (props.godkjentPaVegneGrunn.ikkeMinId ||
                props.godkjentPaVegneGrunn.reservert ||
                props.godkjentPaVegneGrunn.digitalKompetanse)
        ) {
            props.moderState.setFeilIngenGrunn(undefined);
        } else {
            props.moderState.setFeilIngenGrunn({
                feilmelding:
                    'Oppgi minst én grunn for godkjenning på vegne av deltaker',
            });
        }
    };

    const reducer = (state: Grunner, newState: Grunner) => {
        props.moderState.setGodkjentPaVegneGrunn(newState);
        settFeilmeldingIngenGrunn();
        console.log(newState);
        return newState;
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const godkjennPaVegneLabel = props.moderState.godkjentPaVegneAv
        ? 'Jeg skal godkjenne på vegne av deltaker, fordi deltaker'
        : 'Jeg skal godkjenne på vegne av deltaker';

    const deltakerInformertChanged = (checked: boolean) => {
        props.moderState.setPaVegneDeltakerInformert(checked);
        if (!checked) {
            props.moderState.setfeilDeltakerInformert({
                feilmelding:
                    'Deltaker må være informert om kravene og godkjenne innholdet i avtalen.',
            });
        } else {
            props.moderState.setfeilDeltakerInformert(undefined);
        }
    };

    return (
        <div className="godkjennPaVegneAv">
            <Checkbox
                label={godkjennPaVegneLabel}
                onChange={event =>
                    props.moderState.setGodkjentPaVegneAv(
                        event.currentTarget.checked
                    )
                }
            />
            {props.moderState.godkjentPaVegneAv && (
                <>
                    <SkjemaGruppe
                        className="godkjennPaVegneAv__grunn"
                        feil={props.moderState.feilIngenGrunn}
                    >
                        <Checkbox
                            label={'ikke har MinID'}
                            onChange={event =>
                                dispatch({
                                    ...state,
                                    ...{
                                        ikkeMinId: event.currentTarget.checked,
                                    },
                                })
                            }
                        />
                        <Checkbox
                            label={'har reservert seg mot digitale tjenester'}
                            onChange={event =>
                                dispatch({
                                    ...state,
                                    ...{
                                        reservert: event.currentTarget.checked,
                                    },
                                })
                            }
                        />
                        <Checkbox
                            label={'ikke har digital kompetanse'}
                            onChange={event =>
                                dispatch({
                                    ...state,
                                    ...{
                                        digitalKompetanse:
                                            event.currentTarget.checked,
                                    },
                                })
                            }
                        />
                    </SkjemaGruppe>
                    <SkjemaGruppe feil={props.moderState.feilDeltakerInformert}>
                        <Checkbox
                            className="godkjennPaVegneAv__deltakerInformert"
                            label={
                                'Ja, deltaker er informert om kravene og godkjenner innholdet i avtalen.'
                            }
                            onChange={event =>
                                deltakerInformertChanged(
                                    event.currentTarget.checked
                                )
                            }
                        />
                    </SkjemaGruppe>
                </>
            )}
        </div>
    );
};

export default GodkjennPaVegneAv;
