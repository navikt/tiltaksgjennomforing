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
                        Når du deltar på arbeidstrening regnes du som
                        arbeidstaker i forhold til de fleste av
                        arbeidsmiljølovens regler. Det vil blant annet si at du
                        er omfattet av arbeidsgivers forsikringsplikt og at
                        arbeidsgiver har et arbeidsgiveransvar ved yrkesskade.
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Du må melde fra til arbeidsgiver ved fravær. Ved egen
                        eller barns sykdom gjelder ordinære regler for bruk av
                        egenmelding også for deg som er på arbeidstrening.
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Hvis du sender meldekort, må du fortsatt sende meldekort
                        hver 14. dag mens du er i arbeidstrening
                    </Normaltekst>
                </li>
            </ul>
        </VeilederpanelMedUtklippstavleIkon>
    </>
);

export default DeltakerInstruks;
