import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import VeilederpanelMedUtklippstavle from '../../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import EkstbanderbartPanelRad from "../../komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad";
import { ReactComponent as RettighetsHammerIkon } from '../../assets/ikoner/law.svg';


const ArbeidsgiverInstruks = () => (
    <>
        <Normaltekst>Når du godkjenner godtar du kravene fra NAV</Normaltekst>
        <VeilederpanelMedUtklippstavle>
            <Normaltekst>Som arbeidsgiver må du:</Normaltekst>
            <ul>
                <li>
                    <Normaltekst>Følge arbeidsmiljøloven</Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Ha forsikring for deltaker på arbeidstrening
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Sørge for at tiltaksplassen ikke erstatter en vanlig
                        stilling i bedriften
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Behandle personopplysninger til kandidaten på en
                        forsvarlig måte og slette opplysningene etter at
                        arbeidstreningen er ferdig
                    </Normaltekst>
                </li>
            </ul>
        </VeilederpanelMedUtklippstavle>
        <Ekspanderbartpanel border={true} tittel="Les mer om kravene">
            <EkstbanderbartPanelRad svgPath={<RettighetsHammerIkon/>}>
                Arbeidsmiljøloven:
                En arbeidssøker som deltar på arbeidstrening blir i de fleste situasjoner regnet som en ordinær arbeidstaker etter arbeidsmiljøloven.

                Det betyr at arbeidsgivers og deltaker plikter til arbeidsmiljø og krav til kontrolltiltak også gjelder når arbeidssøkeren er på arbeidstrening.  Det inkluderer blant annet arbeidstid, vern mot diskriminering og straff ved overtredelse av lovens bestemmelser.
            </EkstbanderbartPanelRad>
        </Ekspanderbartpanel>
    </>
);

export default ArbeidsgiverInstruks;
