import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { GodkjentPaVegneAvArbeidsgiverGrunner } from '@/types/avtale';

interface Props {
    godkjentPåVegneAvGrunner: GodkjentPaVegneAvArbeidsgiverGrunner;
    setGodkjentPåVegneAvGrunner: Dispatch<SetStateAction<GodkjentPaVegneAvArbeidsgiverGrunner>>;
    feilmeldingGrunn: SkjemaelementFeil | undefined;
    setFeilmeldingGrunn: Dispatch<SetStateAction<SkjemaelementFeil | undefined>>;
}

const GodkjennPåVegneAvArbeidsgiverCheckboxer: FunctionComponent<Props> = props => {
    return (
        <SkjemaGruppe feil={props.feilmeldingGrunn}>
            <Checkbox
                label="klarer ikke få eller gi tilgang"
                checked={props.godkjentPåVegneAvGrunner.klarerIkkeGiFaTilgang}
                onChange={event =>
                    props.setGodkjentPåVegneAvGrunner({
                        ...props.godkjentPåVegneAvGrunner,
                        klarerIkkeGiFaTilgang: event.currentTarget.checked,
                    })
                }
            />
            <Checkbox
                label="vet ikke hvem som kan gi tilgang"
                checked={props.godkjentPåVegneAvGrunner.vetIkkeHvemSomKanGiTilgang}
                onChange={event =>
                    props.setGodkjentPåVegneAvGrunner({
                        ...props.godkjentPåVegneAvGrunner,
                        vetIkkeHvemSomKanGiTilgang: event.currentTarget.checked,
                    })
                }
            />
            <Checkbox
                label="får ikke tilgang på grunn av personvern"
                checked={props.godkjentPåVegneAvGrunner.farIkkeTilgangPersonvern}
                onChange={event =>
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
