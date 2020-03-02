import { ReactComponent as Altinn } from '@/assets/ikoner/altinn.svg';
import { ReactComponent as DigitalAvtale } from '@/assets/ikoner/digitalAvtale.svg';
import { ReactComponent as DynamiskAvtale } from '@/assets/ikoner/dynamiskAvtale.svg';
import { ReactComponent as Historikk } from '@/assets/ikoner/historikk.svg';
import { ReactComponent as Keyboard } from '@/assets/ikoner/keyboard.svg';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import Banner from '@/komponenter/Banner/Banner';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import AltinnVideoModal from '@/komponenter/modal/AltinnVideoModal';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { pathTilInformasjonssideInnlogget, pathTilOversikt } from '@/paths';
import BEMHelper from '@/utils/bem';
import { VenstreChevron } from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './informasjonsside.less';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';

const cls = BEMHelper('informasjonsside');
const tilbakeTilOversikt = (pathName: string) => {
    if (pathName === pathTilInformasjonssideInnlogget) {
        return <TilbakeTilOversiktLenke />;
    } else {
        return (
            <div className="tilbaketiloversikt">
                <Link to={pathTilOversikt} className="lenke">
                    <VenstreChevron className="tilbaketiloversikt__chevron" />
                    Tilbake
                </Link>
            </div>
        );
    }
};
const Informasjonsside: FunctionComponent<RouteComponentProps> = props => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const lonnstilskuddToggle = featureToggleContext[Feature.Lonnstilskudd];
    const [isVideoModalOpen, setVideoModalOpen] = useState<boolean>(false);
    return (
        <div>
            <Banner tekst="Avtale om tiltak" />
            <div className={cls.className}>
                <div className={cls.element('container')}>
                    <div className="tilbaketiloversikt">{tilbakeTilOversikt(props.location.pathname)}</div>

                    <div className={cls.element('innhold')}>
                        <div className={cls.element('innholdstittel')}>
                            <Innholdstittel>Hvordan fungerer løsningen?</Innholdstittel>
                        </div>
                        <div className={cls.element('ingress')}>
                            <Normaltekst>
                                Vi innfører en digital avtale om tiltak. Her får du en rask introduksjon til hvordan den
                                nye løsningen fungerer:
                            </Normaltekst>
                        </div>

                        <EkspanderbartPanelRad
                            classname={cls.element('info')}
                            svgIkon={<DigitalAvtale className={cls.element('SubIkon')} />}
                            headerTekst={{
                                tekst: 'Flere parter i samme digitale løsning',
                                typografiType: 'undertittel',
                            }}
                        >
                            Deltaker, arbeidsgiver og NAV fyller ut, ser over og godkjenner avtalen i samme løsning i
                            sanntid. Når innholdet i avtalen er ferdig utfylt skal alle parter godkjenne avtalen. Hvem
                            som godkjenner avtalen først av arbeidsgiver eller deltaker har ikke noe å si. NAV skal
                            alltid godkjenne avtalen til slutt, og først da kan tiltaket starte.
                        </EkspanderbartPanelRad>

                        <EkspanderbartPanelRad
                            classname={cls.element('info')}
                            svgIkon={<Keyboard className={cls.element('SubIkon')} />}
                            headerTekst={{
                                tekst: 'NAV oppretter en avtale',
                                typografiType: 'undertittel',
                            }}
                        >
                            Når deltageren, arbeidsgiveren og NAV har blitt enige om å starte opp et tiltak, oppretter
                            NAV en digital avtale. Deltager og arbeidsgiver vil få tilsendt en lenke fra NAV når denne
                            er klar til innlogging.
                        </EkspanderbartPanelRad>

                        <EkspanderbartPanelRad
                            classname={cls.element('info')}
                            svgIkon={<Altinn className={cls.element('SubIkon')} />}
                            headerTekst={{
                                tekst: 'Tilgang og innlogging til avtalen',
                                typografiType: 'undertittel',
                            }}
                        >
                            Deltaker og arbeidsgiver logger seg inn i avtalen via ID-porten. Tilgang for arbeidsgiver
                            styres gjennom Altinn. For at en arbeidsgiver kan representere en bedrift må personen gis
                            følgende tilganger til enkeltrettigheter for de ulike avtalene:
                            <ul>
                                <li>Avtale om arbeidstrening</li>
                                {lonnstilskuddToggle && <li>Avtale om midlertidig lønnstilskudd</li>}
                                {lonnstilskuddToggle && <li>Avtale om varig lønnstilskudd</li>}
                            </ul>
                            <br />
                            <span className={cls.element('lenke')}>
                                <Lenke onClick={() => setVideoModalOpen(true)} href="#">
                                    Se video om hvordan tilgang i Altinn styres her.
                                </Lenke>
                            </span>
                            <span className={cls.element('lenke')}>
                                <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                    Finn mer informasjon om roller og rettigheter på Altinn.no
                                </EksternLenke>
                            </span>
                            <AltinnVideoModal isOpen={isVideoModalOpen} lukkModal={() => setVideoModalOpen(false)} />
                        </EkspanderbartPanelRad>

                        <EkspanderbartPanelRad
                            classname={cls.element('info')}
                            svgIkon={<DynamiskAvtale className={cls.element('SubIkon')} />}
                            headerTekst={{
                                tekst: 'En dynamisk avtale',
                                typografiType: 'undertittel',
                            }}
                        >
                            Innholdet i avtalen kan endres gjennom hele perioden for tiltaket. Hvis innholdet i avtalen
                            blir endret etter at tiltaket har startet, må alle parter godkjenne avtalen på nytt.
                        </EkspanderbartPanelRad>

                        <EkspanderbartPanelRad
                            classname={cls.element('info')}
                            svgIkon={<Historikk className={cls.element('SubIkon')} />}
                            headerTekst={{
                                tekst: 'Avtalens historikk',
                                typografiType: 'undertittel',
                            }}
                        >
                            Hvis det gjøres endringer i avtalen underveis i tiltaket lagrer NAV den forrige, godkjente
                            versjonen. Alle godkjente avtaler blir tilgjengelige i en liste. På den måten kan alle tre
                            parter se utviklingen og vurdere måloppnåelse i etterkant.
                        </EkspanderbartPanelRad>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default withRouter(Informasjonsside);
