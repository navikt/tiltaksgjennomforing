import React, { FunctionComponent } from 'react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Accordion, BodyShort, Label } from '@navikt/ds-react';

type Props = {
    åpen: boolean;
};

const Tilskuddsbeskrivelse: FunctionComponent<Props> = (props) => {
    return (
        <Accordion className="accordion">
            <Accordion.Item defaultOpen>
                <Accordion.Header>
                    Beskrivelse av hva tilskuddet kan dekke tilleggsutgifter knyttet til
                </Accordion.Header>
                <Accordion.Content>
                    <div style={{ borderLeft: '2px solid #2626265C' }}>
                        <div style={{ marginLeft: '0.5rem' }}>
                            <Label>a. Vurdering av funksjonsevne / tilretteleggingsbehov</Label>
                            <BodyShort size="small">
                                Nødvendig vurdering av personens funksjonsevne eller tilretteleggingsbehov på den
                                konkrete arbeidsplassen.
                            </BodyShort>
                            <VerticalSpacer rem={1} />
                            <Label>b. Ekstra tiltaksplass</Label>
                            <BodyShort size="small">
                                Opprettelse av ekstra tiltaksplass, for eksempel kontormøbler
                            </BodyShort>
                            <VerticalSpacer rem={1} />
                            <Label>c. Personlig utstyr</Label>
                            <BodyShort size="small">
                                Personlig utstyr som arbeidstøy, vernesko, databriller o.l. knyttet til arbeidet.
                            </BodyShort>
                            <VerticalSpacer rem={1} />
                            <Label>d. Arbeidshjelpemidler</Label>
                            <BodyShort size="small">
                                Nødvendige gjenstander og arbeidshjelpemidler personen trenger for å utføre arbeidet og
                                tilpasninger som ikke kan dekkes etter folketrygdlovens § 10-5.
                            </BodyShort>
                            <VerticalSpacer rem={1} />
                            <Label>e. Programvare</Label>
                            <BodyShort size="small">
                                Merkostnader til å kjøpe og installere programvare som skal brukes av personen, herunder
                                teknologisk utstyr eller teknologiske hjelpemidler
                            </BodyShort>
                            <VerticalSpacer rem={1} />
                            <Label>f. Forsikring, lisenser og sertifisering</Label>
                            <BodyShort size="small">
                                Nødvendige merutgifter til forsikring, lisenser, sertifisering o.l. knyttet til arbeidet
                            </BodyShort>
                            <VerticalSpacer rem={1} />
                            <Label>g. Ekstern opplæring</Label>
                            <BodyShort size="small">
                                Ekstern opplæring for å kunne utføre arbeidet i virksomheten
                            </BodyShort>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Tilskuddsbeskrivelse;
