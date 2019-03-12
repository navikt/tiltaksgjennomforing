import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import VeilederpanelMedUtklippstavleIkon from '../../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import EkstbanderbartPanelRad from '../../komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad';
import { ReactComponent as RettighetsHammerIkon } from '../../assets/ikoner/law.svg';
import { ReactComponent as GiBeskjedOmBorteFraJobb } from '../../assets/ikoner/giBeskjedOmBorteFraJobb.svg';
import { ReactComponent as EmailSend } from '../../assets/ikoner/email-send-3.svg';

const DeltakerInstruks = () => (
    <>
        <Normaltekst>Når du godkjenner godtar du kravene fra NAV</Normaltekst>
        <VeilederpanelMedUtklippstavleIkon>
            <Normaltekst>Som deltaker må du:</Normaltekst>
            <ul>
                <li>
                    <Normaltekst>
                        Vite at arbeidsgiver må forsikre deg og har ansvar for
                        deg hvis du blir skadet på jobb. Dette er fordi
                        arbeidsgiver må følge arbeidsmiljølovens regler.
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Gi beskjed til arbeidsgiver hvis du er borte fra jobb.
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>Sende inn meldekort hver 14. dag.</Normaltekst>
                </li>
            </ul>
        </VeilederpanelMedUtklippstavleIkon>

        <Ekspanderbartpanel border={true} tittel="Les mer om kravene">
            <EkstbanderbartPanelRad
                svgPath={<RettighetsHammerIkon />}
                headerTekst="Ditt forhold til arbeidsmiljøloven"
            >
                Når du deltar på arbeidstrening regnes du som en vanlig ansatt,
                som vil si at din arbeidsgiver må følge de fleste av
                arbeidsmiljølovens regler. Arbeidsgiver må også forsikre deg og
                arbeidsgiver har et ansvar for deg hvis du blir skadet på jobb.
            </EkstbanderbartPanelRad>
            <EkstbanderbartPanelRad
                svgPath={<GiBeskjedOmBorteFraJobb />}
                headerTekst="Gi beskjed hvis du er borte fra jobb"
            >
                Du må melde fra til arbeidsgiver ved fravær. Ved egen eller
                barns sykdom gjelder ordinære regler for bruk av egenmelding
                også for deg som er på arbeidstrening.
            </EkstbanderbartPanelRad>
            <EkstbanderbartPanelRad
                svgPath={<EmailSend />}
                headerTekst="Meldekort"
            >
                Du må sende meldekort hver 14. dag når du er på arbeidstrening.
            </EkstbanderbartPanelRad>
        </Ekspanderbartpanel>
    </>
);

export default DeltakerInstruks;
