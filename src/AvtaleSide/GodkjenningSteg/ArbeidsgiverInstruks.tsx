import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import VeilederpanelMedUtklippstavle from '../../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';

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
    </>
);

export default ArbeidsgiverInstruks;
