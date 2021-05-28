import { ReactComponent as RettighetsHammerIkon } from '@/assets/ikoner/lov.svg';
import { ReactComponent as Passport } from '@/assets/ikoner/passport.svg';
import { ReactComponent as SendEmail } from '@/assets/ikoner/sende-email.svg';
import { ReactComponent as Syk } from '@/assets/ikoner/syk.svg';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VeilederpanelMedUtklippstavleIkon from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './instruks.less';

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
                    <Element>Som deltaker</Element>
                </div>
                <ul>
                    {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                        props.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                        <li>
                            <Normaltekst>må du vite at du er en vanlig ansatt</Normaltekst>
                            <VerticalSpacer rem={0.5} />
                        </li>
                    )}
                    <li>
                        <Normaltekst>
                            må du vite at arbeidsgiveren må forsikre deg og har ansvar for deg hvis du blir skadet på
                            jobb, dette er fordi arbeidsgiveren må følge arbeidsmiljølovens regler
                        </Normaltekst>
                        <VerticalSpacer rem={0.5} />
                    </li>

                    <li>
                        <Normaltekst>må du gi beskjed til arbeidsgiveren din hvis du er borte fra jobben</Normaltekst>
                        <VerticalSpacer rem={0.5} />
                    </li>
                    {props.tiltakstype === 'ARBEIDSTRENING' && (
                        <li>
                            <Normaltekst>må du sende inn meldekort hver 14. dag</Normaltekst>
                            <VerticalSpacer rem={0.5} />
                        </li>
                    )}
                    {props.tiltakstype === 'SOMMERJOBB' && (
                        <li>
                            <Normaltekst>
                                kan du være trygg på at vi behandler personopplysningene dine på en trygg og forsvarlig
                                måte. Du kan ikke sende taushetsbelagte og sensititive personopplysninger til NAV på
                                usikret epost.
                            </Normaltekst>
                        </li>
                    )}
                </ul>
            </VeilederpanelMedUtklippstavleIkon>

            <Ekspanderbartpanel border={true} tittel="Les mer om kravene">
                <div className={cls.element('subheader')}>
                    <Element>Når du godkjenner avtalen godtar du kravene fra NAV</Element>
                </div>
                <VerticalSpacer rem={1} />
                <EkspanderbartPanelRad
                    svgIkon={<RettighetsHammerIkon />}
                    headerTekst={{
                        tekst: 'Ditt forhold til arbeidsmiljøloven',
                    }}
                >
                    <VerticalSpacer rem={0.5} />
                    {props.tiltakstype === 'ARBEIDSTRENING' && (
                        <>
                            Når du deltar på arbeidstrening regnes du som en vanlig ansatt, som vil si at din
                            arbeidsgiver må følge de fleste av arbeidsmiljølovens regler. Arbeidsgiver må også forsikre
                            deg og arbeidsgiver har et ansvar for deg hvis du blir skadet på jobb.
                        </>
                    )}
                    {props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                        props.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
                        (props.tiltakstype === 'SOMMERJOBB' && (
                            <>
                                Når du deltar på tiltak med lønnstilskudd er du en vanlig ansatt, som vil si at din
                                arbeidsgiver må følge arbeidsmiljølovens regler. Arbeidsgiver må også forsikre deg og
                                arbeidsgiver har et ansvar for deg hvis du blir skadet på jobb.
                            </>
                        ))}
                </EkspanderbartPanelRad>
                <EkspanderbartPanelRad
                    svgIkon={<Syk />}
                    headerTekst={{
                        tekst: 'Gi beskjed hvis du er borte fra jobb',
                    }}
                >
                    <VerticalSpacer rem={0.5} />
                    Du må melde fra til arbeidsgiver ved fravær. Ved egen eller barns sykdom gjelder ordinære regler for
                    bruk av egenmelding også for deg som er på{' '}
                    {props.tiltakstype === 'ARBEIDSTRENING' && 'arbeidstrening'}
                    {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                        props.tiltakstype === 'VARIG_LONNSTILSKUDD') &&
                        'tiltak med lønnstilskudd'}
                    {props.tiltakstype === 'SOMMERJOBB' && 'tiltak med tilskudd til sommerjobb'}.
                </EkspanderbartPanelRad>
                {props.tiltakstype === 'ARBEIDSTRENING' && (
                    <EkspanderbartPanelRad svgIkon={<SendEmail />} headerTekst={{ tekst: 'Meldekort' }}>
                        <VerticalSpacer rem={0.5} />
                        Du må sende meldekort hver 14. dag når du er på arbeidstrening.
                    </EkspanderbartPanelRad>
                )}
                {props.tiltakstype === 'SOMMERJOBB' && (
                    <EkspanderbartPanelRad
                        svgIkon={<Passport width="2.25rem" height="2.25rem" />}
                        headerTekst={{ tekst: 'Behandling av personopplysninger' }}
                    >
                        <p>
                            Du kan ikke sende taushetsbelagte og sensitive personopplysninger til NAV på usikret epost.
                            Skal du gi beskjed om endringer som har betydning for saken og oppfølgingen din fra NAV, kan
                            du bruke
                            <Lenke href={'www.nav.no/person/dittnav/'}>Ditt NAV</Lenke> eller{' '}
                            <Lenke href={'www.naav.no/person/kontakt-oss/nb/skriv-til-oss'}>Skriv til oss</Lenke>.
                        </p>
                        <p>Personopplysninger om deg i avtalen lagres i henhold til arkivloven.</p>
                        <p>
                            <Lenke
                                href={
                                    'www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten/personvernerklaering-for-arbeids-og-velferdsetaten'
                                }
                            >
                                NAVs personvernerklæring
                            </Lenke>{' '}
                            forteller mer om hvordan NAV behandler personopplysninger og hvilke rettigheter du har.
                        </p>
                        <p>12 uker etter avsluttet tiltak vil arbeidsgiver ikke lenger har tilgang til avtalen.</p>
                    </EkspanderbartPanelRad>
                )}
            </Ekspanderbartpanel>
        </>
    );
};

export default DeltakerInstruks;
