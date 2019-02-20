import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import VeilederpanelMedUtklippstavleIkon from '../../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';

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
    </>
);

export default DeltakerInstruks;
