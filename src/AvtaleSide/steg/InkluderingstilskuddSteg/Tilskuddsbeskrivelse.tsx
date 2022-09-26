import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Accordion } from '@navikt/ds-react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

type Props = {
    åpen: boolean;
};

const Tilskuddsbeskrivelse: FunctionComponent<Props> = (props) => {
    return (
        <Accordion style={{ border: '1px solid #c6c2bf' }}>
            <Accordion.Item defaultOpen>
                <Accordion.Header>
                    Beskrivelse av hva tilskuddet kan dekke tilleggsutgifter knyttet til
                </Accordion.Header>
                <Accordion.Content>
                    <div style={{ borderLeft: '2px solid #2626265C' }}>
                        <div style={{ marginLeft: '0.5rem' }}>
                            <Element>a. Vurdering av funksjonsevne / tilretteleggingsbehov</Element>
                            <Normaltekst>
                                Nødvendig vurdering av personens funksjonsevne eller tilretteleggingsbehov på den
                                konkrete arbeidsplassen.
                            </Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Element>b. Ekstra tiltaksplass</Element>
                            <Normaltekst>Opprettelse av ekstra tiltaksplass, for eksempel kontormøbler</Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Element>c. Personlig utstyr</Element>
                            <Normaltekst>
                                Personlig utstyr som arbeidstøy, vernesko, databriller o.l. knyttet til arbeidet.
                            </Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Element>d. Arbeidshjelpemidler</Element>
                            <Normaltekst>
                                Nødvendige gjenstander og arbeidshjelpemidler personen trenger for å utføre arbeidet og
                                tilpasninger som ikke kan dekkes etter folketrygdlovens § 10-5.
                            </Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Element>e. Programvare</Element>
                            <Normaltekst>
                                Merkostnader til å kjøpe og installere programvare som skal brukes av personen, herunder
                                teknologisk utstyr eller teknologiske hjelpemidler
                            </Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Element>f. Forsikring, lisenser og sertifisering</Element>
                            <Normaltekst>
                                Nødvendige merutgifter til forsikring, lisenser, sertifisering o.l. knyttet til arbeidet
                            </Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Element>g. Ekstern opplæring</Element>
                            <Normaltekst>Ekstern opplæring for å kunne utføre arbeidet i virksomheten</Normaltekst>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Tilskuddsbeskrivelse;
