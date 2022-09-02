import { AvtaleContext } from '@/AvtaleProvider';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import BEMHelper from '@/utils/bem';
import { Bandage, Calender, Law, Passport, SocialAid } from '@navikt/ds-icons/cjs';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { FunctionComponent, useContext } from 'react';

const ArbeidsgiverSommerjobbInstruks: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const erLåst = avtaleContext.avtale.godkjentAvVeileder !== null;
    const cls = BEMHelper('instruks');

    return (
        <>
            {!erLåst && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('subheader')}>
                    <Element>Som arbeidsgiver må du</Element>
                </div>
                <VerticalSpacer rem={2} />
                <IkonTekstRad
                    svgIkon={<Calender width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Oppfølging og varighet', typografiType: 'undertittel' }}
                >
                    <p>
                        Du som arbeidsgiver og NAV skal følge opp deltaker. Din oppgave er å følge opp i det daglige
                        arbeidet og se at arbeidet er i tråd med avtalen som er inngått. Varigheten på tilskuddet skal
                        vurderes ut fra deltakers behov. Tilskuddet reguleres av{' '}
                        <EksternLenke href="https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_8">
                            forskrift for arbeidsmarkedstiltak
                        </EksternLenke>
                    </p>
                </IkonTekstRad>

                <IkonTekstRad
                    svgIkon={<Law width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Arbeidsmiljøloven', typografiType: 'undertittel' }}
                >
                    <p>Deltakeren er ansatt og dere skal følge arbeidsmiljølovens bestemmelser.</p>

                    <p>
                        <EksternLenke href="https://lovdata.no/dokument/NL/lov/2005-06-17-62">
                            Les mer om arbeidsmiljøloven her
                        </EksternLenke>
                    </p>
                </IkonTekstRad>

                <IkonTekstRad
                    svgIkon={<SocialAid width="2.25rem" height="2.25rem" />}
                    headerTekst={{
                        tekst: 'Yrkesskadeforsikring og skadeerstatning',
                        typografiType: 'undertittel',
                    }}
                >
                    <p>
                        Dere er ansvarlig dersom deltakeren skader seg på jobb. Du kan søke om inkluderingstilskudd for
                        å dekke utgiftene dere har til forsikringen.{' '}
                        <EksternLenke href="https://lovdata.no/dokument/NL/lov/1989-06-16-65">
                            Les mer om yrkesskadeforsikring her
                        </EksternLenke>
                    </p>
                    <p>
                        Dere er etter{' '}
                        <EksternLenke href="https://lovdata.no/dokument/NL/lov/1969-06-13-26">
                            lov om skadeserstatning
                        </EksternLenke>{' '}
                        ansvarlig for skade som deltakeren gjør forsettlig eller uaktsomt.{' '}
                    </p>
                </IkonTekstRad>

                <IkonTekstRad
                    svgIkon={<Bandage width="2.25rem" height="2.25rem" />}
                    headerTekst={{
                        tekst: 'Folketrygdloven: egenmelding og sykmelding',
                        typografiType: 'undertittel',
                    }}
                >
                    <p>
                        Folketrygdlovens regler følges når det gjelder bruk av egenmelding og sykmelding for egen og
                        barns sykdom.
                    </p>
                </IkonTekstRad>

                <IkonTekstRad
                    svgIkon={<Passport width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Behandling av personopplysninger', typografiType: 'undertittel' }}
                >
                    <p>
                        Dere har ansvar for å følge{' '}
                        <EksternLenke href="https://lovdata.no/dokument/NL/lov/2018-06-15-38">
                            personopplysningsloven
                        </EksternLenke>
                    </p>

                    <p>
                        Dere kan ikke sende taushetsbelagte og sensitive personopplysninger til NAV på usikret epost.
                        Dere må slette alle personopplysningene som dere ikke har selvstendig behandlingsansvar for om
                        deltakeren, senest innen 12 uker etter at tiltaket er avsluttet.
                    </p>
                    <p>12 uker etter avsluttet tiltak vil du som arbeidsgiver ikke lenger har tilgang til avtalen</p>
                </IkonTekstRad>

                <IkonTekstRad
                    svgIkon={<Law width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Hva sier regelverket?', typografiType: 'undertittel' }}
                >
                    <div className={cls.element('kravomrefusjonlinker')}>
                        <EksternLenke href="https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_8">
                            Forskrift om arbeidsmarkedstiltak (tiltaksforskriften)
                        </EksternLenke>

                        <EksternLenke href={'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_10'}>
                            Utfyllende regler til forskriften
                        </EksternLenke>

                        <EksternLenke
                            href={
                                'https://www.nav.no/no/person/arbeid/tilskudd-til-sommerjobb#kort-om-tilskudd-til-sommerjobb'
                            }
                        >
                            Krav og vilkår til sommerjobb
                        </EksternLenke>
                    </div>
                </IkonTekstRad>
            </VeilederpanelMedUtklippstavle>
        </>
    );
};

export default ArbeidsgiverSommerjobbInstruks;
