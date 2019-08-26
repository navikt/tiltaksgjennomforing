import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, Props } from 'react';
import TilbakeTilOversiktLenke from '../AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import Banner from '../komponenter/Banner/Banner';
import EkstbanderbartPanelRad from '../komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad';
import BEMHelper from '../utils/bem';
import { ReactComponent as Altinn } from './altinn.svg';
import { ReactComponent as DigitalAvtale } from './digitalAvtale.svg';
import { ReactComponent as DynamiskAvtale } from './dynamiskAvtale.svg';
import { ReactComponent as TilEkstern } from '../assets/ikoner/external-link.svg';
import { ReactComponent as Historikk } from './historikk.svg';
import { ReactComponent as Clipboard } from './informationIcon.svg';
import { ReactComponent as Keyboard } from './keyboard.svg';
import './informasjonsside.less';
import { Link, RouteComponentProps } from 'react-router-dom';
import { pathTilOversikt, pathTilInformasjonssideInnlogget } from '../paths';
import { VenstreChevron } from 'nav-frontend-chevron';

const cls = BEMHelper('informasjonsside');
const tilbakeTilOversikt = (pathName: string) => {
    if (pathName == pathTilInformasjonssideInnlogget) {
        return <TilbakeTilOversiktLenke />;
    } else {
        return (
            <Link to={pathTilOversikt} className="lenke">
                <VenstreChevron className="tilbaketiloversikt__chevron" />
                Tilbake
            </Link>
        );
    }
};

const Informasjonsside: FunctionComponent<RouteComponentProps> = props => (
    <div>
        <Banner tekst="Avtale om arbeidstrening" />
        <div className={cls.className}>
            <div className={cls.element('container')}>
                <div className="tilbaketiloversikt">
                    {tilbakeTilOversikt(props.location.pathname)}
                </div>
                <div className={cls.element('innhold')}>
                    <Clipboard className={cls.element('ClipboardIkon')} />
                    <div className={cls.element('innholdstittel')}>
                        <Innholdstittel>
                            Hvordan fungerer løsningen?
                        </Innholdstittel>
                    </div>
                    <div className={cls.element('ingress')}>
                        <Normaltekst>
                            Vi innfører en digital avtale om arbeidstrening. Her
                            får du en rask introduksjon til hvordan den nye
                            løsningen fungerer:
                        </Normaltekst>
                    </div>

                    <EkstbanderbartPanelRad
                        classname={cls.element('info')}
                        svgIkon={
                            <DigitalAvtale className={cls.element('SubIkon')} />
                        }
                        headerTekst={{
                            tekst: 'Flere parter i samme digitale løsning',
                            typografiType: 'undertittel',
                        }}
                    >
                        Deltaker, arbeidsgiver og NAV fyller ut, ser over og
                        godkjenner avtalen i samme løsning i sanntid, på hver
                        sin PC eller mobil. NAV skal alltid godkjenne avtalen
                        til slutt, og først da kan arbeidstreningen starte.
                    </EkstbanderbartPanelRad>

                    <EkstbanderbartPanelRad
                        classname={cls.element('info')}
                        svgIkon={
                            <Keyboard className={cls.element('SubIkon')} />
                        }
                        headerTekst={{
                            tekst: 'NAV oppretter en avtale',
                            typografiType: 'undertittel',
                        }}
                    >
                        Når deltageren, arbeidsgiveren og NAV har blitt enige om
                        å starte opp en arbeidstrening, oppretter NAV en digital
                        avtale. Deltager og arbeidsgiver vil få tilsendt en
                        lenke fra NAV når denne er klar til innlogging.
                    </EkstbanderbartPanelRad>

                    <EkstbanderbartPanelRad
                        classname={cls.element('info')}
                        svgIkon={<Altinn className={cls.element('SubIkon')} />}
                        headerTekst={{
                            tekst: 'Tilgang og innlogging til avtalen',
                            typografiType: 'undertittel',
                        }}
                    >
                        Deltaker og arbeidsgiver logger seg inn i avtalen via
                        ID-porten. Tilgang for arbeidsgiver styres gjennom
                        Altinn. For at en arbeidsgiver kan representere en
                        bedrift må personen ha rollen{'  '}
                        <u>Helse-, sosial- og velferdstjenester</u> eller gis
                        tilgang til enkelttjenesten{' '}
                        <u>Avtale om arbeidstrening</u>. <br /> <br />
                        <Lenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                            Les mer om roller og rettigheter på Altinn.no
                            <TilEkstern
                                className={cls.element('eksterntLenkeikon')}
                            />
                        </Lenke>
                    </EkstbanderbartPanelRad>

                    <EkstbanderbartPanelRad
                        classname={cls.element('info')}
                        svgIkon={
                            <DynamiskAvtale
                                className={cls.element('SubIkon')}
                            />
                        }
                        headerTekst={{
                            tekst: 'En dynamisk avtale',
                            typografiType: 'undertittel',
                        }}
                    >
                        Innholdet i avtalen kan endres gjennom hele perioden for
                        arbeidstrening. Hvis innholdet i avtalen blir endret
                        etter at arbeidstreningen har startet, må alle parter
                        godkjenne avtalen på nytt.
                    </EkstbanderbartPanelRad>

                    <EkstbanderbartPanelRad
                        classname={cls.element('info')}
                        svgIkon={
                            <Historikk className={cls.element('SubIkon')} />
                        }
                        headerTekst={{
                            tekst: 'Avtalens historikk',
                            typografiType: 'undertittel',
                        }}
                    >
                        Hvis det gjøres endringer i avtalen underveis i
                        arbeidstreningen lagrer NAV den forrige, godkjente
                        versjonen. Alle godkjente avtaler blir tilgjengelige i
                        en liste. På den måten kan alle tre parter se
                        utviklingen og vurdere måloppnåelse i etterkant.
                    </EkstbanderbartPanelRad>
                </div>
            </div>
        </div>
    </div>
);
export default Informasjonsside;
