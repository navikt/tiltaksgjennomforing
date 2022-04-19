import { ReactComponent as AnsatteIkon } from '@/assets/ikoner/ansatte.svg';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Bandage, Calender, Law, Money, Passport, SocialAid } from '@navikt/ds-icons/cjs';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './instruks.less';

const cls = BEMHelper('instruks');
interface Props {
    erLaast: boolean;
    tiltakstype: TiltaksType;
}
const ArbeidsgiverInstruks: FunctionComponent<Props> = (props) => (
    <>
        {!props.erLaast && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
        <VeilederpanelMedUtklippstavle>
            <div className={cls.element('subheader')}>
                <Element>Som arbeidsgiver må du</Element>
            </div>
            <ul>
                <li>
                    <Normaltekst> følge opp deltaker underveis i perioden</Normaltekst>
                    <VerticalSpacer rem={0.5} />
                </li>
                <li>
                    <Normaltekst>følge arbeidsmiljøloven</Normaltekst>
                    <VerticalSpacer rem={0.5} />
                </li>
                <li>
                    <Normaltekst>ha forsikring for deltaker</Normaltekst>
                    <VerticalSpacer rem={0.5} />
                </li>
                <li>
                    <Normaltekst>følge folketrygdlovens regler for egenmelding og sykmelding</Normaltekst>
                    <VerticalSpacer rem={0.5} />
                </li>
                <li>
                    <Normaltekst>
                        behandle personopplysninger til deltaker på en forsvarlig måte og slette opplysningene etter at
                        tiltaket er ferdig
                    </Normaltekst>
                    <VerticalSpacer rem={0.5} />
                </li>
                {props.tiltakstype !== 'ARBEIDSTRENING' && (
                    <li>
                        <Normaltekst>sende inn refusjonskrav i tide</Normaltekst>
                        <VerticalSpacer rem={0.5} />
                    </li>
                )}
            </ul>
        </VeilederpanelMedUtklippstavle>

        <Ekspanderbartpanel border={true} tittel="Les mer om kravene">
            {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || props.tiltakstype === 'SOMMERJOBB') && (
                <EkspanderbartPanelRad
                    svgIkon={<Calender width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Oppfølging og varighet', typografiType: 'undertittel' }}
                >
                    <p>
                        Du som arbeidsgiver og NAV skal følge opp deltaker. Din oppgave er å følge opp i det daglige
                        arbeidet og se at arbeidet er i tråd med avtalen som er inngått. Varigheten på tilskuddet skal
                        vurderes ut fra deltakers behov. Tilskuddet reguleres av{' '}
                        <EksternLenke href="https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_9">
                            forskrift for arbeidsmarkedstiltak
                        </EksternLenke>
                    </p>
                </EkspanderbartPanelRad>
            )}

            <EkspanderbartPanelRad
                svgIkon={<Law width="2.25rem" height="2.25rem" />}
                headerTekst={{ tekst: 'Arbeidsmiljøloven', typografiType: 'undertittel' }}
            >
                {props.tiltakstype === 'ARBEIDSTRENING' && (
                    <p>
                        Selv om deltakeren ikke er ansatt, skal dere følge arbeidsmiljølovens bestemmelser om
                        arbeidsgivers og arbeidstakers plikter, krav til arbeidsmiljø og krav til kontrolltiltak. Det
                        inkluderer også arbeidstid, vern mot diskriminering og straff ved overtredelse av lovens
                        bestemmelser.
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
            </EkspanderbartPanelRad>

            <EkspanderbartPanelRad
                svgIkon={<SocialAid width="2.25rem" height="2.25rem" />}
                headerTekst={{
                    tekst: 'Yrkesskadeforsikring og skadeerstatning',
                    typografiType: 'undertittel',
                }}
            >
                <p>
                    Dere er ansvarlig dersom deltakeren skader seg på jobb. Du kan søke om inkluderingstilskudd for å
                    dekke utgiftene dere har til forsikringen.{' '}
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
            </EkspanderbartPanelRad>

            <EkspanderbartPanelRad
                svgIkon={<Bandage width="2.25rem" height="2.25rem" />}
                headerTekst={{
                    tekst: 'Folketrygdloven: egenmelding og sykmelding',
                    typografiType: 'undertittel',
                }}
            >
                <p>
                    Folketrygdlovens regler følges når det gjelder bruk av egenmelding og sykmelding for egen og barns
                    sykdom.
                </p>
            </EkspanderbartPanelRad>

            {props.tiltakstype === 'ARBEIDSTRENING' && (
                <EkspanderbartPanelRad
                    svgIkon={<AnsatteIkon />}
                    headerTekst={{
                        tekst: 'Drøft med representanter for de ansatte',
                        typografiType: 'undertittel',
                    }}
                >
                    <p>
                        Før dere gjør en avtale om å ta imot deltakeren på arbeidstrening, må dere drøfte dette med
                        representanter for ansatte i bedriften.
                    </p>
                    <p>Tiltaksplasser skal ikke erstatte en vanlig stilling i bedriften.</p>
                </EkspanderbartPanelRad>
            )}

            <EkspanderbartPanelRad
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
                    Dere kan ikke sende taushetsbelagte og sensitive personopplysninger til NAV på usikret epost. Dere
                    må slette alle personopplysningene som dere ikke har selvstendig behandlingsansvar for om
                    deltakeren, senest innen 12 uker etter at tiltaket er avsluttet.
                </p>
                <p>12 uker etter avsluttet tiltak vil du som arbeidsgiver ikke lenger har tilgang til avtalen</p>
            </EkspanderbartPanelRad>

            {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || props.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                <EkspanderbartPanelRad
                    svgIkon={<Money width="2.25rem" height="2.25rem" />}
                    headerTekst={{ tekst: 'Tilskuddsperiode og refusjon', typografiType: 'undertittel' }}
                >
                    <p>
                        Vi sender dere et brev til bedriftens innboks i Altinn om innvilget støtte for tiltaket. For å
                        kunne se tilskuddsbrevet i innboksen i Altinn må du ha fått tildelt enkeltrettigheten
                        "Tilskuddsbrev NAV-tiltak" i Altinn. I brevet står det et beløp som viser hvor mye penger NAV
                        holder av for en begrenset periode. Denne perioden kan være maksimalt tre måneder av gangen,
                        uavhengig av tiltakets varighet.
                    </p>

                    <p>
                        Godkjent tilskuddsperiode i tilskuddsbrevet er styrende i henhold til økonomisk forpliktelse fra
                        NAV og kan avvike fra avtalt periode for tiltaksgjennomføringen. Når perioden er over, må dere
                        sende inn et krav om tilskudd til NAV på{' '}
                        <EksternLenke href={'https://www.nav.no/soknader/nb/bedrift/refusjoner/lonnstilskud'}>
                            skjema for refusjonskrav
                        </EksternLenke>
                        . Siste frist for å sende inn dette kravet er senest to måneder etter at perioden er over. Hvis
                        fristen ikke holdes, trekkes tilskuddet som er innvilget og dere får ikke utbetalt støtte.
                    </p>

                    <p>
                        Eksempel: Et tiltak settes til å vare i ett år. Hver tredje måned må dere sende inn krav om
                        refusjon for å få utbetalt støtten. Dere må sende inn totalt fire refusjonskrav i løpet av det
                        ene året.
                    </p>
                </EkspanderbartPanelRad>
            )}

            {props.tiltakstype === 'SOMMERJOBB' && (
                <>
                    <EkspanderbartPanelRad
                        svgIkon={<Money width="2.25rem" height="2.25rem" />}
                        headerTekst={{ tekst: 'Sende inn krav om refusjon', typografiType: 'undertittel' }}
                    >
                        <p>
                            Når tiltaket er over, vil NAV sende dere et ferdig utregnet forslag til refusjon. Refusjonen
                            regnes ut på bakgrunn av innhold i avtalen og innrapporterte inntekter i A-meldingen. Har
                            dere mindre lønnsutgifter enn avtalt, blir også støtten redusert. Tilskuddet behandles
                            automatisk og utbetales etterskuddsvis, etter at dere har godkjent refusjonen. Vi kan
                            kontrollere om pengene som blir utbetalt blir brukt riktig.
                        </p>
                        <p>
                            Tilgangen styres via Altinn og du må ha tilgangen “inntektsmelding” for å kunne sende inn
                            refusjonskrav.
                        </p>
                        <p>
                            Siste frist for å sende inn kravet er senest to måneder etter at perioden er over. Hvis
                            fristen ikke holdes, trekkes tilskuddet som er innvilget og dere får ikke utbetalt støtte.
                        </p>
                    </EkspanderbartPanelRad>
                    <EkspanderbartPanelRad
                        svgIkon={<Law width="2.25rem" height="2.25rem" />}
                        headerTekst={{ tekst: 'Sende inn krav om refusjon', typografiType: 'undertittel' }}
                    >
                        <div className={cls.element('kravomrefusjonlinker')}>
                            <EksternLenke href={'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_8'}>
                                Forskrift om arbeidsmarkedstiltak kapittel 8
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
                    </EkspanderbartPanelRad>
                </>
            )}
        </Ekspanderbartpanel>
    </>
);

export default ArbeidsgiverInstruks;
