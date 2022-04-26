
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent } from 'react';

interface Props {
    feilmeldingGrunn: string | undefined;
}

const GodkjennPåVegneAvDeltakerCheckboxer: FunctionComponent<Props> = (props) => {
    return (
        <SkjemaGruppe feil={props.feilmeldingGrunn}>
            <Checkbox
                label="nødvendig vurdering av personens funksjonsevne eller tilretteleggingsbehov på den konkrete arbeidsplassen"
            />
            <Checkbox
                label="opprettelse av ekstra tiltaksplass, for eksempel kontormøbler"
            />
            <Checkbox
                label="personlig utstyr som arbeidstøy, vernesko, databriller o.l. knyttet til arbeidet"
            />
            <Checkbox
                label="nødvendige gjenstander og arbeidshjelpemidler personen trenger for å utføre arbeidet og tilpasninger som ikke kan dekkes etter folketrygdlovens § 10-5"

            />
            <Checkbox
                label="merkostnader til å kjøpe og installere programvare som skal brukes av personen, herunder teknologisk utstyr eller teknologiske hjelpemidler"
            />
            <Checkbox
                label="nødvendige merutgifter til forsikring, lisenser, sertifisering o.l. knyttet til arbeidet, og ekstern opplæring for å kunne utføre arbeidet i virksomheten"
            />
        </SkjemaGruppe>
    );
};

export default GodkjennPåVegneAvDeltakerCheckboxer;
