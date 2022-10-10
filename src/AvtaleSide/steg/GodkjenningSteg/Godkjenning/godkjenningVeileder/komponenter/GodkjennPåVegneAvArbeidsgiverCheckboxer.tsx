import { GodkjentPaVegneAvArbeidsgiverGrunner } from '@/types/avtale';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface Props {
    godkjentPåVegneAvGrunner: GodkjentPaVegneAvArbeidsgiverGrunner;
    setGodkjentPåVegneAvGrunner: Dispatch<SetStateAction<GodkjentPaVegneAvArbeidsgiverGrunner>>;
    feilmeldingGrunn: string | undefined;
    setFeilmeldingGrunn: Dispatch<SetStateAction<string | undefined>>;
}

const GodkjennPåVegneAvArbeidsgiverCheckboxer: FunctionComponent<Props> = (props) => {
    return (
        <SkjemaGruppe feil={props.feilmeldingGrunn}>
            <Checkbox
                label="klarer ikke få eller gi tilgang"
                checked={props.godkjentPåVegneAvGrunner.klarerIkkeGiFaTilgang}
                onChange={(event) =>
                    props.setGodkjentPåVegneAvGrunner({
                        ...props.godkjentPåVegneAvGrunner,
                        klarerIkkeGiFaTilgang: event.currentTarget.checked,
                    })
                }
            />
            <Checkbox
                label="vet ikke hvem som kan gi tilgang"
                checked={props.godkjentPåVegneAvGrunner.vetIkkeHvemSomKanGiTilgang}
                onChange={(event) =>
                    props.setGodkjentPåVegneAvGrunner({
                        ...props.godkjentPåVegneAvGrunner,
                        vetIkkeHvemSomKanGiTilgang: event.currentTarget.checked,
                    })
                }
            />
            <Checkbox
                label="får ikke tilgang på grunn av personvern"
                checked={props.godkjentPåVegneAvGrunner.farIkkeTilgangPersonvern}
                onChange={(event) =>
                    props.setGodkjentPåVegneAvGrunner({
                        ...props.godkjentPåVegneAvGrunner,
                        farIkkeTilgangPersonvern: event.currentTarget.checked,
                    })
                }
            />
        </SkjemaGruppe>
    );
};

export default GodkjennPåVegneAvArbeidsgiverCheckboxer;
