import { AvtaleContext } from '@/AvtaleProvider';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import BEMHelper from '@/utils/bem';
import { Calender, Law, Money, Passport } from '@navikt/ds-icons/cjs';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { FunctionComponent, useContext } from 'react';

const ArbeidsgiverMentorInstruks: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const erLåst = avtaleContext.avtale.godkjentAvVeileder !== null;
    const cls = BEMHelper('instruks');

    return (
        <>
            {erLåst && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
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
                        <EksternLenke href="'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap5'">
                            forskrift for arbeidsmarkedstiltak
                        </EksternLenke>
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
                    svgIkon={<Money width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Refusjon', typografiType: 'undertittel' }}
                >
                    <p>
                        For å få utbetalt pengene må dere sende inn refusjonskrav til NAV etter at tilskuddsperioden er
                        over. Refusjonskravet sendes inn på papir. I tillegg til å fylle ut refusjonsskjemaet legger
                        dere ved dokumentasjon på de faktiske utgiftene. Refusjonskravet må sendes inn senest to måneder
                        etter at tilskuddsperioden er over.
                    </p>
                    <p>
                        <EksternLenke href={'https://www.nav.no/soknader/nb/bedrift/tilskudd-og-tiltak/mentor'}>
                            Refusjonsskjema for mentortilskudd
                        </EksternLenke>
                    </p>
                </IkonTekstRad>

                <IkonTekstRad
                    svgIkon={<Law width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Hva sier regelverket?', typografiType: 'undertittel' }}
                >
                    <div className={cls.element('kravomrefusjonlinker')}>
                        <EksternLenke
                            href={
                                'https://www.nav.no/nav.no-ressurser/filer/person/arbeid/diverse/krav-vilkar-og-informasjon-mentor.pdf'
                            }
                        >
                            Krav, vilkår og informasjon
                        </EksternLenke>

                        <EksternLenke href="'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap5'">
                            Forskrift om arbeidsmarkedstiltak (tiltaksforskriften)
                        </EksternLenke>

                        <EksternLenke href={'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_6'}>
                            Utfyllende regler til Arbeids- og velferdsetatens anvendelse av forskrift om
                            arbeidsmarkedstiltak
                        </EksternLenke>
                    </div>
                </IkonTekstRad>
            </VeilederpanelMedUtklippstavle>
        </>
    );
};

export default ArbeidsgiverMentorInstruks;
