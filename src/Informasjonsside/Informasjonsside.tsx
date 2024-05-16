import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import Altinn from '@/assets/ikoner/altinn.svg?react';
import DigitalAvtale from '@/assets/ikoner/digitalAvtale.svg?react';
import DynamiskAvtale from '@/assets/ikoner/dynamiskAvtale.svg?react';
import Historikk from '@/assets/ikoner/historikk.svg?react';
import Keyboard from '@/assets/ikoner/keyboard.svg?react';
import Banner from '@/komponenter/Banner/Banner';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import AltinnVideoModal from '@/komponenter/modal/AltinnVideoModal';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { pathTilInformasjonssideInnlogget } from '@/paths';
import BEMHelper from '@/utils/bem';
import { BodyShort, Heading, Label, Link } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    const { pathname } = useLocation();

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

    return (
        <div>
            <Banner tekst="Avtale om tiltak" />
            <div className={cls.className}>
                <div className={cls.element('container')}>
                    <div className="tilbaketiloversikt">{tilbakeTilOversikt(pathname)}</div>

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
                                tekst: 'Varslinger',
                                headingType: 'small',
                            }}
                        >
                            Vi sender varslinger til deltakere, arbeidsgivere og veileder på ulike plattformer.
                            <VerticalSpacer rem={1} />
                            <Heading size="xsmall">Deltaker:</Heading>
                            Når arbeidsgiver har godkjent avtalen vil det automatisk sendes varsling til deltaker i form
                            av en oppgave på min side på nav.no, i tillegg til en sms. I tillegg sendes det beskjeder om
                            ulike hendelser. Deltaker får varslinger på min side og sms ved følgende hendelser:
                            <ul>
                                <li>Når arbeidsgiver godkjenner (oppgave)</li>
                                <li>Når avtalen er inngått (beskjed)</li>
                                <li>Hvis avtalen blir forlenget (beskjed)</li>
                                <li>Hvis avtalen blir forkortet (beskjed)</li>
                                <li>Hvis avtalen blir annullert (beskjed)</li>
                            </ul>
                            <Heading size="xsmall">Arbeidsgiver:</Heading>
                            Arbeidsgiver vil automatisk få varsling om at det er opprettet en avtale på min side
                            arbeidsgiver. På dette tidspunktet går det ikke ut noen sms. Arbeidsgiver får varslinger på
                            min side arbeidsgiver og sms ved følgende hendelser:
                            <ul>
                                <li>Når avtalen er opprettet (oppgave om å godkjenne på min side arbeidsgiver)</li>
                                <li>Arbeidsgivers godkjenning blir opphevet av veileder (oppgave + sms)</li>
                                <li>Når avtalen er inngått (beskjed på min side arbeidsgiver + sms)</li>
                                <li>
                                    Alle endringer fra en veileder på en inngått avtale (kun oppgave på min side
                                    arbeidsgiver)
                                </li>
                            </ul>
                            <Heading size="xsmall">Veileder:</Heading>
                            Veileder får automatisk sms ved følgende hendelser:
                            <ul>
                                <li>Deltaker godkjenner avtale</li>
                                <li>Arbeidsgiver godkjenner avtalen</li>
                                <li>Arbeidsgiver har opphevet deltakers godkjenning</li>
                            </ul>
                        </IkonTekstRad>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Informasjonsside;
