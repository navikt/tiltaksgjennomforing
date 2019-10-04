import React, { Dispatch, SetStateAction, useReducer } from 'react';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import './GodkjennPaVegneAv.less';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { GodkjentPaVegneGrunner } from '@/types/avtale';

type Grunner  = GodkjentPaVegneGrunner;

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
    ikkeBankId: false,
    reservert: false,
    digitalKompetanse: false,
};

const GodkjennPaVegneAv = (props: Props) => {
    const reducer = (state: Grunner, newState: Grunner) => {
        props.moderState.setGodkjentPaVegneGrunn(newState);
        props.moderState.setFeilIngenGrunn(undefined);
        props.moderState.setfeilDeltakerInformert(undefined);
        return newState;
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const godkjennPaVegneLabel = props.moderState.godkjentPaVegneAv
        ? 'Jeg skal godkjenne på vegne av deltaker, fordi deltaker'
        : 'Jeg skal godkjenne på vegne av deltaker';

    const deltakerInformertChanged = (checked: boolean) => {
        props.moderState.setPaVegneDeltakerInformert(checked);
        props.moderState.setfeilDeltakerInformert(undefined);
    };

    const nullstillValg = (event: boolean) => {
        props.moderState.setGodkjentPaVegneAv(event);
        if (!event) {
            dispatch(initialState);
            props.moderState.setPaVegneDeltakerInformert(false);
        }
    };

    return (
        <div className="godkjennPaVegneAv">
            <Checkbox
                label={godkjennPaVegneLabel}
                checked={props.moderState.godkjentPaVegneAv}
                onChange={event => {
                    nullstillValg(event.currentTarget.checked);
                }}
            />
            {props.moderState.godkjentPaVegneAv && (
                <>
                    <SkjemaGruppe
                        className="godkjennPaVegneAv__grunn"
                        feil={props.moderState.feilIngenGrunn}
                    >
                        <Checkbox
                            label={'ikke har BankID'}
                            checked={props.godkjentPaVegneGrunn.ikkeBankId}
                            onChange={event =>
                                dispatch({
                                    ...state,
                                    ikkeBankId: event.currentTarget.checked,
                                })
                            }
                        />
                        <Checkbox
                            label={'har reservert seg mot digitale tjenester'}
                            checked={props.godkjentPaVegneGrunn.reservert}
                            onChange={event =>
                                dispatch({
                                    ...state,
                                    reservert: event.currentTarget.checked,
                                })
                            }
                        />
                        <Checkbox
                            label={'mangler digital kompetanse'}
                            checked={
                                props.godkjentPaVegneGrunn.digitalKompetanse
                            }
                            onChange={event =>
                                dispatch({
                                    ...state,
                                    digitalKompetanse:
                                        event.currentTarget.checked,
                                })
                            }
                        />
                    </SkjemaGruppe>
                    <SkjemaGruppe feil={props.moderState.feilDeltakerInformert}>
                        <Checkbox
                            className="godkjennPaVegneAv__deltakerInformert"
                            label={
                                'Deltaker er informert om kravene og godkjenner innholdet i avtalen.'
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
