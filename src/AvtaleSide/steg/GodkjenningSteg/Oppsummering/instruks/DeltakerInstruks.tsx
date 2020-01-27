import { ReactComponent as GiBeskjedOmBorteFraJobb } from '@/assets/ikoner/giBeskjedOmBorteFraJobb.svg';
import { ReactComponent as RettighetsHammerIkon } from '@/assets/ikoner/lov.svg';
import { ReactComponent as EmailSend } from '@/assets/ikoner/sende-epost.svg';
import EkstbanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad';
import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
<<<<<<< HEAD
=======
import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import { ReactComponent as RettighetsHammerIkon } from '@/assets/ikoner/law.svg';
import { ReactComponent as Syk } from '@/assets/ikoner/syk.svg';
import { ReactComponent as SendEmail } from '@/assets/ikoner/sende-email.svg';
import BEMHelper from '@/utils/bem';
>>>>>>> refs/remotes/origin/master
import './instruks.less';

const cls = BEMHelper('instruks');
interface Props {
    erLaast: boolean;
}
const DeltakerInstruks: FunctionComponent<Props> = props => (
    <>
        {!props.erLaast && <Normaltekst>Når du godkjenner godtar du kravene fra NAV</Normaltekst>}
        <VeilederpanelMedUtklippstavleIkon>
            <div className={cls.element('subheader')}>
                <Element>Som deltaker må du</Element>
            </div>
            <ul>
                <li>
                    <Normaltekst>
                        vite at arbeidsgiver må forsikre deg og har ansvar for deg hvis du blir skadet på jobb, dette er
                        fordi arbeidsgiver må følge arbeidsmiljølovens regler
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>gi beskjed til arbeidsgiver hvis du er borte fra jobb</Normaltekst>
                </li>
                <li>
                    <Normaltekst>sende inn meldekort hver 14. dag</Normaltekst>
                </li>
            </ul>
        </VeilederpanelMedUtklippstavleIkon>

        <Ekspanderbartpanel border={true} tittel="Les mer om kravene">
            <EkspanderbartPanelRad
                svgIkon={<RettighetsHammerIkon />}
                headerTekst={{
                    tekst: 'Ditt forhold til arbeidsmiljøloven',
                }}
            >
                Når du deltar på arbeidstrening regnes du som en vanlig ansatt, som vil si at din arbeidsgiver må følge
                de fleste av arbeidsmiljølovens regler. Arbeidsgiver må også forsikre deg og arbeidsgiver har et ansvar
                for deg hvis du blir skadet på jobb.
            </EkspanderbartPanelRad>
            <EkspanderbartPanelRad
                svgIkon={<Syk />}
                headerTekst={{
                    tekst: 'Gi beskjed hvis du er borte fra jobb',
                }}
            >
                Du må melde fra til arbeidsgiver ved fravær. Ved egen eller barns sykdom gjelder ordinære regler for
                bruk av egenmelding også for deg som er på arbeidstrening.
            </EkspanderbartPanelRad>
            <EkspanderbartPanelRad svgIkon={<SendEmail />} headerTekst={{ tekst: 'Meldekort' }}>
                Du må sende meldekort hver 14. dag når du er på arbeidstrening.
            </EkspanderbartPanelRad>
        </Ekspanderbartpanel>
    </>
);

export default DeltakerInstruks;
