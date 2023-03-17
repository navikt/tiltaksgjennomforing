import { GodkjentPaVegneAvDeltakerGrunner } from '@/types/avtale';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface Props {
    godkjentPåVegneAvGrunner: GodkjentPaVegneAvDeltakerGrunner;
    setGodkjentPåVegneAvGrunner: Dispatch<SetStateAction<GodkjentPaVegneAvDeltakerGrunner>>;
    feilmeldingGrunn: string | undefined;
    setFeilmeldingGrunn: Dispatch<SetStateAction<string | undefined>>;
    className?: string;
    tiltakstype: string;
}

const GodkjennPåVegneAvDeltakerCheckboxer: FunctionComponent<Props> = (props) => {
    return (
        <CheckboxGroup
            legend="Godkjenn på vegne av deltaker valg"
            error={props.feilmeldingGrunn}
            className={props.className}
        >
            <Checkbox
                checked={props.godkjentPåVegneAvGrunner.ikkeBankId}
                onChange={(event) =>
                    props.setGodkjentPåVegneAvGrunner({
                        ...props.godkjentPåVegneAvGrunner,
                        ikkeBankId: event.currentTarget.checked,
                    })
                }
            >
                har ikke BankID
            </Checkbox>
            <Checkbox
                checked={props.godkjentPåVegneAvGrunner.reservert}
                onChange={(event) =>
                    props.setGodkjentPåVegneAvGrunner({
                        ...props.godkjentPåVegneAvGrunner,
                        reservert: event.currentTarget.checked,
                    })
                }
            >
                har reservert seg mot digitale tjenester
            </Checkbox>
            <Checkbox
                checked={props.godkjentPåVegneAvGrunner.digitalKompetanse}
                onChange={(event) =>
                    props.setGodkjentPåVegneAvGrunner({
                        ...props.godkjentPåVegneAvGrunner,
                        digitalKompetanse: event.currentTarget.checked,
                    })
                }
            >
                mangler digital kompetanse
            </Checkbox>
        </CheckboxGroup>
    );
};

export default GodkjennPåVegneAvDeltakerCheckboxer;
