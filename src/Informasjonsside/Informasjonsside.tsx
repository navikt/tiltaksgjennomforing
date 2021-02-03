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
import { pathTilInformasjonssideInnlogget } from '@/paths';
import BEMHelper from '@/utils/bem';
import Lenke from 'nav-frontend-lenker';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './informasjonsside.less';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const cls = BEMHelper('informasjonsside');
const tilbakeTilOversikt = (pathName: string) => {
    if (pathName === pathTilInformasjonssideInnlogget) {
        return <TilbakeTilOversiktLenke />;
    } else {
        return <TilbakeTilOversiktLenke tekst={'Tilbake'} />;
    }
};
const Informasjonsside: FunctionComponent<RouteComponentProps> = props => {
    const [isVideoModalOpen, setVideoModalOpen] = useState<boolean>(false);

    const veilederOppretter = (
        <EkspanderbartPanelRad
            classname={cls.element('info')}
            svgIkon={<Keyboard className={cls.element('SubIkon')} />}
            headerTekst={{
                tekst: 'NAV oppretter en avtale',
                typografiType: 'undertittel',
            }}
        >
            Når deltageren, arbeidsgiveren og NAV har blitt enige om å starte et tiltak, oppretter NAV en digital
            avtale. Deltakeren og arbeidsgiveren vil få tilsendt en lenke fra NAV når avtalen er klar og de kan logge
            inn.
        </EkspanderbartPanelRad>
    );

    const veilederOgArbeidsgiverOppretter = (
        <EkspanderbartPanelRad
            classname={cls.element('info')}
            svgIkon={<Keyboard className={cls.element('SubIkon')} />}
            headerTekst={{
                tekst: 'NAV eller arbeidsgiver oppretter en avtale',
                typografiType: 'undertittel',
            }}
        >
            <VerticalSpacer rem={1} />
            <Element>NAV oppretter en avtale</Element>
            <Normaltekst>
                {' '}
                Når deltageren, arbeidsgiveren og NAV har blitt enige om å starte et tiltak, oppretter NAV en digital
                avtale. Deltageren og arbeidsgiveren vil få tilsendt en lenke fra NAV når avtalen er klar og de kan
                logge inn.
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <Element>Arbeidsgiveren oppretter en avtale</Element>
            <Normaltekst>
                Arbeidsgiveren kan også opprette en avtale selv. Når avtalen er opprettet kan arbeidsgiveren begynne å
                fylle ut avtalen.
            </Normaltekst>
        </EkspanderbartPanelRad>
    );

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
                            Deltakeren, arbeidsgiveren og NAV fyller ut, ser over og godkjenner avtalen i samme løsning
                            i sanntid. Når innholdet i avtalen er ferdig utfylt skal alle parter godkjenne avtalen. Hvem
                            som godkjenner avtalen først av arbeidsgiveren eller deltakeren har ikke noe å si. NAV skal
                            alltid godkjenne avtalen til slutt, og først da kan tiltaket starte.
                        </EkspanderbartPanelRad>

                        {veilederOgArbeidsgiverOppretter}

                        <EkspanderbartPanelRad
                            classname={cls.element('info')}
                            svgIkon={<Altinn className={cls.element('SubIkon')} />}
                            headerTekst={{
                                tekst: 'Tilgang og innlogging til avtalen',
                                typografiType: 'undertittel',
                            }}
                        >
                            Deltakeren og arbeidsgiveren logger seg inn i avtalen via ID-porten. Tilgangen for
                            arbeidsgiveren styres gjennom Altinn. For at en arbeidsgiver kan representere en bedrift, må
                            personen gis følgende tilganger til enkeltrettigheter for de ulike avtalene:
                            <ul>
                                <li>Avtale om arbeidstrening</li>
                                <li>Avtale om midlertidig lønnstilskudd</li>
                                <li>Avtale om varig lønnstilskudd</li>
                            </ul>
                            <br />
                            <span className={cls.element('lenke')}>
                                <Lenke onClick={() => setVideoModalOpen(true)} href="#">
                                    Se video om hvordan tilgang i Altinn styres.
                                </Lenke>
                            </span>
                            <span className={cls.element('lenke')}>
                                <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                    Finn informasjon om roller og rettigheter på Altinn.no
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
                            Hvis det gjøres endringer i avtalen underveis i tiltaket, lagrer NAV den forrige, godkjente
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
