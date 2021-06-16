import React, { Dispatch, SetStateAction, useReducer } from 'react';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import './GodkjennPaVegneAv.less';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { GodkjentPaVegneAvDeltakerGrunner } from '@/types/avtale';

type Grunner = GodkjentPaVegneAvDeltakerGrunner;

type GodkjennPaVegneAvProps = {
    godkjentPaVegneGrunn: GodkjentPaVegneAvDeltakerGrunner;
    moderState: {
        godkjentPaVegneAv: boolean;
        setGodkjentPaVegneAv: Dispatch<SetStateAction<boolean>>;
        setGodkjentPaVegneGrunn: Dispatch<SetStateAction<GodkjentPaVegneAvDeltakerGrunner>>;
        feilIngenGrunn: SkjemaelementFeil | undefined;
        setFeilIngenGrunn: Dispatch<SetStateAction<SkjemaelementFeil | undefined>>;
        feilDeltakerInformert: SkjemaelementFeil | undefined;
        setfeilDeltakerInformert: Dispatch<SetStateAction<SkjemaelementFeil | undefined>>;
        paVegneDeltakerInformert: boolean;
        setPaVegneDeltakerInformert: Dispatch<SetStateAction<boolean>>;
    };
};

const initialState: GodkjentPaVegneAvDeltakerGrunner = {
    ikkeBankId: false,
    reservert: false,
    digitalKompetanse: false,
};

const GodkjennPaVegneAv = (props: GodkjennPaVegneAvProps) => {
    const reducer = (grunner: Grunner, nyGrunner: Grunner) => {
        props.moderState.setGodkjentPaVegneGrunn(nyGrunner);
        props.moderState.setFeilIngenGrunn(undefined);
        props.moderState.setfeilDeltakerInformert(undefined);
        return nyGrunner;
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const godkjennPaVegneLabel = props.moderState.godkjentPaVegneAv
        ? 'Jeg skal godkjenne på vegne av deltakeren, fordi deltakeren'
        : 'Jeg skal godkjenne på vegne av deltakeren';

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
                    <SkjemaGruppe className="godkjennPaVegneAv__grunn" feil={props.moderState.feilIngenGrunn}>
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
                            checked={props.godkjentPaVegneGrunn.digitalKompetanse}
                            onChange={event =>
                                dispatch({
                                    ...state,
                                    digitalKompetanse: event.currentTarget.checked,
                                })
                            }
                        />
                    </SkjemaGruppe>
                    <SkjemaGruppe feil={props.moderState.feilDeltakerInformert}>
                        <Checkbox
                            className="godkjennPaVegneAv__deltakerInformert"
                            label={'Deltakeren er informert om kravene og godkjenner innholdet i avtalen.'}
                            onChange={event => deltakerInformertChanged(event.currentTarget.checked)}
                        />
                    </SkjemaGruppe>
                </>
            )}
        </div>
    );
};

export default GodkjennPaVegneAv;
