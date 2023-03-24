import { GodkjentPaVegneAvDeltakerGrunner } from '@/types/avtale';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import React, { Dispatch, SetStateAction, useReducer } from 'react';
import './GodkjennPaVegneAv.less';

type Grunner = GodkjentPaVegneAvDeltakerGrunner;

type GodkjennPaVegneAvProps = {
    godkjentPaVegneGrunn: GodkjentPaVegneAvDeltakerGrunner;
    moderState: {
        godkjentPaVegneAv: boolean;
        setGodkjentPaVegneAv: Dispatch<SetStateAction<boolean>>;
        setGodkjentPaVegneGrunn: Dispatch<SetStateAction<GodkjentPaVegneAvDeltakerGrunner>>;
        feilIngenGrunn: string | undefined;
        setFeilIngenGrunn: Dispatch<SetStateAction<string | undefined>>;
        feilDeltakerInformert: string | undefined;
        setfeilDeltakerInformert: Dispatch<SetStateAction<string | undefined>>;
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
                checked={props.moderState.godkjentPaVegneAv}
                onChange={(event) => {
                    nullstillValg(event.currentTarget.checked);
                }}
            >
                {godkjennPaVegneLabel}
            </Checkbox>
            {props.moderState.godkjentPaVegneAv && (
                <>
                    <CheckboxGroup
                        legend="Godkjenn på vegne av valg"
                        className="godkjennPaVegneAv__grunn"
                        error={props.moderState.feilIngenGrunn}
                    >
                        <Checkbox
                            checked={props.godkjentPaVegneGrunn.ikkeBankId}
                            onChange={(event) =>
                                dispatch({
                                    ...state,
                                    ikkeBankId: event.currentTarget.checked,
                                })
                            }
                        >
                            ikke har BankID
                        </Checkbox>
                        <Checkbox
                            checked={props.godkjentPaVegneGrunn.reservert}
                            onChange={(event) =>
                                dispatch({
                                    ...state,
                                    reservert: event.currentTarget.checked,
                                })
                            }
                        >
                            har reservert seg mot digitale tjenester
                        </Checkbox>
                        <Checkbox
                            checked={props.godkjentPaVegneGrunn.digitalKompetanse}
                            onChange={(event) =>
                                dispatch({
                                    ...state,
                                    digitalKompetanse: event.currentTarget.checked,
                                })
                            }
                        >
                            mangler digital kompetanse
                        </Checkbox>
                    </CheckboxGroup>
                    <CheckboxGroup
                        legend="Deltaker er informert bekreftelse"
                        error={props.moderState.feilDeltakerInformert}
                    >
                        <Checkbox
                            className="godkjennPaVegneAv__deltakerInformert"
                            onChange={(event) => deltakerInformertChanged(event.currentTarget.checked)}
                        >
                            Deltakeren er informert om kravene og godkjenner innholdet i avtalen.
                        </Checkbox>
                    </CheckboxGroup>
                </>
            )}
        </div>
    );
};

export default GodkjennPaVegneAv;
