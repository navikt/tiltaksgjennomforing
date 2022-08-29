import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Bandage, Calender, Law, Money, Passport, SocialAid } from '@navikt/ds-icons/cjs';
import Lenke from "nav-frontend-lenker";
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './instruks.less';

const cls = BEMHelper('instruks');
interface Props {
    erLaast: boolean;
    tiltakstype: TiltaksType;
    erPilot : boolean
}
const ArbeidsgiverInstruks: FunctionComponent<Props> = (props) => {
    const oppfolgingLenker: { [key in TiltaksType]: string } = {
        MIDLERTIDIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_9',
        VARIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_10',
        SOMMERJOBB: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_8',
        INKLUDERINGSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_11',
        ARBEIDSTRENING: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap3',
        MENTOR: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap5',
    }
    // const rundskrivLenker: { [key in TiltaksType]: string } = {
    //     ARBEIDSTRENING: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_4',
    //     MENTOR: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_6',
    //     INKLUDERINGSTILSKUDD: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_12',
    //     SOMMERJOBB: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_9',
    //     MIDLERTIDIG_LONNSTILSKUDD: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_10',
    //     VARIG_LONNSTILSKUDD: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_11',
    // }

    return (
        <>
            {!props.erLaast && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('subheader')}>
                    <Element>Som arbeidsgiver må du</Element>
                </div>
                <VerticalSpacer rem={2} />
                {['MIDLERTIDIG_LONNSTILSKUDD', 'SOMMERJOBB', 'MENTOR', 'INKLUDERINGSTILSKUDD'].includes(
                    props.tiltakstype
                ) && (
                    <IkonTekstRad
                        svgIkon={<Calender width="2.25rem" height="2.25rem" />}
                        headerTekst={{ tekst: 'Oppfølging og varighet', typografiType: 'undertittel' }}
                    >
                        <p>
                            Du som arbeidsgiver og NAV skal følge opp deltaker. Din oppgave er å følge opp i det daglige
                            arbeidet og se at arbeidet er i tråd med avtalen som er inngått. Varigheten på tilskuddet
                            skal vurderes ut fra deltakers behov. Tilskuddet reguleres av{' '}
                            <EksternLenke href={oppfolgingLenker[props.tiltakstype]}>
                                forskrift for arbeidsmarkedstiltak
                            </EksternLenke>
                        </p>
                    </IkonTekstRad>
                )}
                {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD', 'ARBEIDSTRENING', 'SOMMERJOBB'].includes(
                    props.tiltakstype
                ) && (
                    <IkonTekstRad
                        svgIkon={<Law width="2.25rem" height="2.25rem" />}
                        headerTekst={{ tekst: 'Arbeidsmiljøloven', typografiType: 'undertittel' }}
                    >
                        {props.tiltakstype === 'ARBEIDSTRENING' && (
                            <p>
                                Selv om deltakeren ikke er ansatt, skal dere følge arbeidsmiljølovens bestemmelser om
                                arbeidsgivers og arbeidstakers plikter, krav til arbeidsmiljø og krav til
                                kontrolltiltak. Det inkluderer også arbeidstid, vern mot diskriminering og straff ved
                                overtredelse av lovens bestemmelser.
                            </p>
                        )}
                        {(props.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
                            props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                            props.tiltakstype === 'SOMMERJOBB') && (
                            <p>Deltakeren er ansatt og dere skal følge arbeidsmiljølovens bestemmelser.</p>
                        )}
                        <p>
                            <EksternLenke href="https://lovdata.no/dokument/NL/lov/2005-06-17-62">
                                Les mer om arbeidsmiljøloven her
                            </EksternLenke>
                        </p>
                    </IkonTekstRad>
                )}
                {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD', 'ARBEIDSTRENING', 'SOMMERJOBB'].includes(
                    props.tiltakstype
                ) && (
                    <IkonTekstRad
                        svgIkon={<SocialAid width="2.25rem" height="2.25rem" />}
                        headerTekst={{
                            tekst: 'Yrkesskadeforsikring og skadeerstatning',
                            typografiType: 'undertittel',
                        }}
                    >
                        <p>
                            Dere er ansvarlig dersom deltakeren skader seg på jobb. Du kan søke om inkluderingstilskudd
                            for å dekke utgiftene dere har til forsikringen.{' '}
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
                )}
                {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD', 'ARBEIDSTRENING', 'SOMMERJOBB'].includes(
                    props.tiltakstype
                ) && (
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
                )}
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
                {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || props.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                    <IkonTekstRad
                        svgIkon={<Money width="2.25rem" height="2.25rem" />}
                        headerTekst={{ tekst: 'Tilskuddsperiode og refusjon', typografiType: 'undertittel' }}
                    >
                        <p>
                            Godkjent tilskuddsperiode {!props.erPilot && <>i tilskuddsbrevet</>} er styrende i henhold
                            til økonomisk forpliktelse fra NAV og kan avvike fra avtalt periode for
                            tiltaksgjennomføringen.
                        </p>
                        <p>
                            Når tiltaket er over, vil NAV sende dere et ferdig utregnet forslag til refusjon. Refusjonen
                            regnes ut på bakgrunn av innhold i avtalen og innrapporterte inntekter i A-meldingen. Har
                            dere mindre lønnsutgifter enn avtalt, blir også støtten redusert. Tilskuddet behandles
                            automatisk og utbetales etterskuddsvis, etter at dere har godkjent refusjonen. Vi kan
                            kontrollere om pengene som blir utbetalt blir brukt riktig.
                        </p>
                        <p>
                            For å behandle refusjonen må du logge deg inn i refusjonsløsningen:
                            <Lenke href={'https://tiltak-refusjon.nav.no.'}> https://tiltak-refusjon.nav.no. </Lenke>
                            Tilgangen styres via Altinn og du må ha tilgangen “inntektsmelding” for å kunne sende inn
                            refusjonskrav.
                        </p>
                        <p>
                            Siste frist for å sende inn kravet er senest to måneder etter at perioden er over. Hvis
                            fristen ikke holdes, trekkes tilskuddet som er innvilget og dere får ikke utbetalt støtte.
                        </p>
                    </IkonTekstRad>
                )}
                {['MENTOR', 'INKLUDERINGSTILSKUDD'].includes(props.tiltakstype) && (
                    <IkonTekstRad
                        svgIkon={<Money width="2.25rem" height="2.25rem" />}
                        headerTekst={{ tekst: 'Refusjon', typografiType: 'undertittel' }}
                    >
                        <p>
                            For å få utbetalt pengene må dere sende inn refusjonskrav til NAV etter at tilskuddsperioden
                            er over. Refusjonskravet sendes inn på papir. I tillegg til å fylle ut refusjonsskjemaet
                            legger dere ved dokumentasjon på de faktiske utgiftene. Refusjonskravet må sendes inn senest
                            to måneder etter at tilskuddsperioden er over.
                        </p>
                        <p>
                            {props.tiltakstype === 'MENTOR' && (
                                <EksternLenke href={'https://www.nav.no/soknader/nb/bedrift/tilskudd-og-tiltak/mentor'}>
                                    Refusjonsskjema for mentortilskudd
                                </EksternLenke>
                            )}
                            {props.tiltakstype === 'INKLUDERINGSTILSKUDD' && (
                                <EksternLenke
                                    href={'https://www.nav.no/soknader/nb/bedrift/refusjoner/inkluderingstilskudd'}
                                >
                                    Refusjonsskjema for inkluderingstilskudd
                                </EksternLenke>
                            )}
                        </p>
                    </IkonTekstRad>
                )}
                <IkonTekstRad
                    svgIkon={<Law width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Hva sier regelverket?', typografiType: 'undertittel' }}
                >
                    <div className={cls.element('kravomrefusjonlinker')}>
                        {props.tiltakstype === 'MENTOR' && (
                            <EksternLenke
                                href={
                                    'https://www.nav.no/nav.no-ressurser/filer/person/arbeid/diverse/krav-vilkar-og-informasjon-mentor.pdf'
                                }
                            >
                                Krav, vilkår og informasjon
                            </EksternLenke>
                        )}
                        <EksternLenke href={oppfolgingLenker[props.tiltakstype]}>
                            Forskrift om arbeidsmarkedstiltak (tiltaksforskriften)
                        </EksternLenke>
                        {props.tiltakstype !== 'MENTOR' && props.tiltakstype !== 'INKLUDERINGSTILSKUDD' && (
                            <EksternLenke href={'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_10'}>
                                Utfyllende regler til forskriften
                            </EksternLenke>
                        )}
                        {props.tiltakstype === 'INKLUDERINGSTILSKUDD' && (
                            <>
                                <EksternLenke href={'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_12'}>
                                    Utfyllende regler til forskriften
                                </EksternLenke>
                                <EksternLenke href="https://www.nav.no/nav.no-ressurser/filer/person/arbeid/diverse/krav-vilkar-og-informasjon-til-tiltaksarrangor-inkluderingstilskudd.pdf">
                                    Krav og vilkår til inkluderingstilskudd
                                </EksternLenke>
                            </>
                        )}
                        {props.tiltakstype === 'MENTOR' && (
                            <EksternLenke href={'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_6'}>
                                Utfyllende regler til Arbeids- og velferdsetatens anvendelse av forskrift om
                                arbeidsmarkedstiltak
                            </EksternLenke>
                        )}
                        {props.tiltakstype === 'SOMMERJOBB' && (
                            <EksternLenke
                                href={
                                    'https://www.nav.no/no/person/arbeid/tilskudd-til-sommerjobb#kort-om-tilskudd-til-sommerjobb'
                                }
                            >
                                Krav og vilkår til sommerjobb
                            </EksternLenke>
                        )}
                    </div>
                </IkonTekstRad>
            </VeilederpanelMedUtklippstavle>
        </>
    );
};

export default ArbeidsgiverInstruks;
