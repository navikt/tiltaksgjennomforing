import { ReactComponent as RettighetsHammerIkon } from '@/assets/ikoner/lov.svg';
import { ReactComponent as SendEmail } from '@/assets/ikoner/sende-email.svg';
import { ReactComponent as Syk } from '@/assets/ikoner/syk.svg';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './instruks.less';
import { TiltaksType } from '@/types/avtale';

const cls = BEMHelper('instruks');
interface Props {
    erLaast: boolean;
    tiltakstype: TiltaksType;
}
const DeltakerInstruks: FunctionComponent<Props> = props => {
    return (
        <>
            {!props.erLaast && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
            <VeilederpanelMedUtklippstavleIkon>
                <div className={cls.element('subheader')}>
                    <Element>Som deltaker må du</Element>
                </div>
                <ul>
                    {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                        props.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                        <li>
                            <Normaltekst>vite at du er en vanlig ansatt</Normaltekst>
                        </li>
                    )}
                    <li>
                        <Normaltekst>
                            vite at arbeidsgiveren må forsikre deg og har ansvar for deg hvis du blir skadet på jobb,
                            dette er fordi arbeidsgiveren må følge arbeidsmiljølovens regler
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>gi beskjed til arbeidsgiveren din hvis du er borte fra jobben</Normaltekst>
                    </li>
                    {props.tiltakstype === 'ARBEIDSTRENING' && (
                        <li>
                            <Normaltekst>sende inn meldekort hver 14. dag</Normaltekst>
                        </li>
                    )}
                </ul>
            </VeilederpanelMedUtklippstavleIkon>

            <Ekspanderbartpanel border={true} tittel="Les mer om kravene">
                <EkspanderbartPanelRad
                    svgIkon={<RettighetsHammerIkon />}
                    headerTekst={{
                        tekst: 'Ditt forhold til arbeidsmiljøloven',
                    }}
                >
                    {props.tiltakstype === 'ARBEIDSTRENING' && (
                        <>
                            Når du deltar på arbeidstrening regnes du som en vanlig ansatt, som vil si at din
                            arbeidsgiver må følge de fleste av arbeidsmiljølovens regler. Arbeidsgiver må også forsikre
                            deg og arbeidsgiver har et ansvar for deg hvis du blir skadet på jobb.
                        </>
                    )}
                    {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                        props.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                        <>
                            Når du deltar på tiltak med lønnstilskudd er du en vanlig ansatt, som vil si at din
                            arbeidsgiver må følge arbeidsmiljølovens regler. Arbeidsgiver må også forsikre deg og
                            arbeidsgiver har et ansvar for deg hvis du blir skadet på jobb.
                        </>
                    )}
                </EkspanderbartPanelRad>
                <EkspanderbartPanelRad
                    svgIkon={<Syk />}
                    headerTekst={{
                        tekst: 'Gi beskjed hvis du er borte fra jobb',
                    }}
                >
                    Du må melde fra til arbeidsgiver ved fravær. Ved egen eller barns sykdom gjelder ordinære regler for
                    bruk av egenmelding også for deg som er på{' '}
                    {props.tiltakstype === 'ARBEIDSTRENING' && 'arbeidstrening'}
                    {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                        props.tiltakstype === 'VARIG_LONNSTILSKUDD') &&
                        'tiltak med lønnstilskudd'}
                    .
                </EkspanderbartPanelRad>
                {props.tiltakstype === 'ARBEIDSTRENING' && (
                    <EkspanderbartPanelRad svgIkon={<SendEmail />} headerTekst={{ tekst: 'Meldekort' }}>
                        Du må sende meldekort hver 14. dag når du er på arbeidstrening.
                    </EkspanderbartPanelRad>
                )}
            </Ekspanderbartpanel>
        </>
    );
};

export default DeltakerInstruks;
