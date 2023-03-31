import { ReactComponent as Altinn } from '@/assets/ikoner/altinn.svg';
import { ReactComponent as DigitalAvtale } from '@/assets/ikoner/digitalAvtale.svg';
import { ReactComponent as DynamiskAvtale } from '@/assets/ikoner/dynamiskAvtale.svg';
import { ReactComponent as Historikk } from '@/assets/ikoner/historikk.svg';
import { ReactComponent as Keyboard } from '@/assets/ikoner/keyboard.svg';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import Banner from '@/komponenter/Banner/Banner';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import AltinnVideoModal from '@/komponenter/modal/AltinnVideoModal';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { pathTilInformasjonssideInnlogget } from '@/paths';
import BEMHelper from '@/utils/bem';
import { BodyShort, Heading, Label, Link } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useLocation } from 'react-router';
import './informasjonsside.less';

const cls = BEMHelper('informasjonsside');
const tilbakeTilOversikt = (pathName: string) => {
    if (pathName === pathTilInformasjonssideInnlogget) {
        return <TilbakeTilOversiktLenke />;
    } else {
        return <TilbakeTilOversiktLenke tekst={'Tilbake'} />;
    }
};

const Informasjonsside: FunctionComponent = () => {
    const [isVideoModalOpen, setVideoModalOpen] = useState<boolean>(false);

    const veilederOgArbeidsgiverOppretter = (
        <IkonTekstRad
            classname={cls.element('info')}
            svgIkon={<Keyboard role="presentation" focusable="false" className={cls.element('SubIkon')} />}
            headerTekst={{
                tekst: 'NAV eller arbeidsgiver oppretter en avtale',
                headingType: 'small',
            }}
        >
            <VerticalSpacer rem={1} />
            <Label>NAV oppretter en avtale</Label>
            <BodyShort size="small">
                {' '}
                Når deltakeren, arbeidsgiveren og NAV har blitt enige om å starte et tiltak, oppretter NAV en digital
                avtale. Deltakeren og arbeidsgiveren vil få tilsendt en lenke fra NAV når avtalen er klar og de kan
                logge inn.
            </BodyShort>
            <VerticalSpacer rem={1} />
            <Label>Arbeidsgiveren oppretter en avtale</Label>
            <BodyShort size="small">
                Arbeidsgiveren kan også opprette en avtale selv. Når avtalen er opprettet kan arbeidsgiveren begynne å
                fylle ut avtalen.
            </BodyShort>
        </IkonTekstRad>
    );

    const location = useLocation();

    return (
        <div>
            <Banner tekst="Avtale om tiltak" />
            <div className={cls.className}>
                <div className={cls.element('container')}>
                    <div className="tilbaketiloversikt">{tilbakeTilOversikt(location.pathname)}</div>

                    <div className={cls.element('innhold')}>
                        <div className={cls.element('innholdstittel')}>
                            <Heading size="large">Hvordan fungerer løsningen?</Heading>
                        </div>
                        <div className={cls.element('ingress')}>
                            <BodyShort size="small">
                                Vi innfører en digital avtale om tiltak. Her får du en rask introduksjon til hvordan den
                                nye løsningen fungerer:
                            </BodyShort>
                        </div>

                        <IkonTekstRad
                            classname={cls.element('info')}
                            svgIkon={
                                <DigitalAvtale
                                    role="presentation"
                                    focusable="false"
                                    className={cls.element('SubIkon')}
                                />
                            }
                            headerTekst={{
                                tekst: 'Flere parter i samme digitale løsning',
                                headingType: 'small',
                            }}
                        >
                            Deltakeren, arbeidsgiveren og NAV fyller ut, ser over og godkjenner avtalen i samme løsning
                            i sanntid. Når innholdet i avtalen er ferdig utfylt skal alle parter godkjenne avtalen. Hvem
                            som godkjenner avtalen først av arbeidsgiveren eller deltakeren har ikke noe å si. NAV skal
                            alltid godkjenne avtalen til slutt, og først da kan tiltaket starte.
                        </IkonTekstRad>

                        {veilederOgArbeidsgiverOppretter}

                        <IkonTekstRad
                            classname={cls.element('info')}
                            svgIkon={
                                <Altinn role="presentation" focusable="false" className={cls.element('SubIkon')} />
                            }
                            headerTekst={{
                                tekst: 'Tilgang og innlogging til avtalen',
                                headingType: 'small',
                            }}
                        >
                            Deltakeren og arbeidsgiveren logger seg inn i avtalen via ID-porten. Tilgangen for
                            arbeidsgiveren styres gjennom Altinn. For at en arbeidsgiver kan representere en bedrift, må
                            personen gis følgende tilganger til enkeltrettigheter for de ulike avtalene:
                            <ul>
                                <li>Avtale om arbeidstrening</li>
                                <li>Avtale om midlertidig lønnstilskudd</li>
                                <li>Avtale om varig lønnstilskudd</li>
                                <li>Avtale om sommerjobb</li>
                                <li>Avtale om inkluderingstilskudd</li>
                                <li>Avtale om mentor</li>
                            </ul>
                            <br />
                            <span className={cls.element('lenke')}>
                                <Link onClick={() => setVideoModalOpen(true)} href="#">
                                    Se video om hvordan tilgang i Altinn styres.
                                </Link>
                            </span>
                            <span className={cls.element('lenke')}>
                                <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                    Finn informasjon om roller og rettigheter på Altinn.no
                                </EksternLenke>
                            </span>
                            <AltinnVideoModal isOpen={isVideoModalOpen} lukkModal={() => setVideoModalOpen(false)} />
                        </IkonTekstRad>

                        <IkonTekstRad
                            classname={cls.element('info')}
                            svgIkon={
                                <DynamiskAvtale
                                    role="presentation"
                                    focusable="false"
                                    className={cls.element('SubIkon')}
                                />
                            }
                            headerTekst={{
                                tekst: 'En dynamisk avtale',
                                headingType: 'small',
                            }}
                        >
                            Innholdet i avtalen kan endres gjennom hele perioden for tiltaket. Etter at avtalen er
                            godkjent av alle parter, må endringer gå gjennom veileder.
                        </IkonTekstRad>

                        <IkonTekstRad
                            classname={cls.element('info')}
                            svgIkon={
                                <Historikk role="presentation" focusable="false" className={cls.element('SubIkon')} />
                            }
                            headerTekst={{
                                tekst: 'Avtalens historikk',
                                headingType: 'small',
                            }}
                        >
                            Hvis det gjøres endringer i avtalen underveis i tiltaket, lagrer NAV den forrige, godkjente
                            versjonen. Alle godkjente avtaler blir tilgjengelige i en liste. På den måten kan alle tre
                            parter se utviklingen og vurdere måloppnåelse i etterkant.
                        </IkonTekstRad>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Informasjonsside;
