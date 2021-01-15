import { ReactComponent as AnsatteIkon } from '@/assets/ikoner/ansatte.svg';
import { ReactComponent as LovIkon } from '@/assets/ikoner/lov.svg';
import { ReactComponent as PersonOpplysningIkon } from '@/assets/ikoner/personopplysninger.svg';
import { ReactComponent as SkadeIkon } from '@/assets/ikoner/skade.svg';
import { ReactComponent as SkjoldIkon } from '@/assets/ikoner/skjold.svg';
import { ReactComponent as SedlerIkon } from '@/assets/ikoner/sedler.svg';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { TiltaksType } from '@/types/avtale';

const cls = BEMHelper('instruks');
interface Props {
    erLaast: boolean;
    tiltakstype: TiltaksType;
}
const ArbeidsgiverInstruks: FunctionComponent<Props> = props => (
    <>
        {!props.erLaast && <Normaltekst>Når du godkjenner avtalen godtar du kravene fra NAV</Normaltekst>}
        <VeilederpanelMedUtklippstavle>
            <div className={cls.element('subheader')}>
                <Element>Som arbeidsgiver må du</Element>
            </div>
            <ul>
                <li>
                    <Normaltekst>følge arbeidsmiljøloven</Normaltekst>
                </li>
                <li>
                    <Normaltekst>ha forsikring for deltaker</Normaltekst>
                </li>
                <li>
                    <Normaltekst>følge folketrygdlovens regler for egenmelding og sykmelding</Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        behandle personopplysninger til deltaker på en forsvarlig måte og slette opplysningene etter at
                        tiltaket er ferdig
                    </Normaltekst>
                </li>
                {props.tiltakstype !== 'ARBEIDSTRENING' && (
                    <li>
                        <Normaltekst>sende inn refusjonskrav i tide</Normaltekst>
                    </li>
                )}
            </ul>
        </VeilederpanelMedUtklippstavle>

        <Ekspanderbartpanel border={true} tittel="Les mer om kravene">
            <EkspanderbartPanelRad
                svgIkon={<LovIkon />}
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
                {(props.tiltakstype === 'VARIG_LONNSTILSKUDD' || props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD') && (
                    <p>Deltakeren er ansatt og dere skal følge arbeidsmiljølovens bestemmelser.</p>
                )}
                <p>
                    <EksternLenke href="https://lovdata.no/dokument/NL/lov/2005-06-17-62">
                        Les mer om arbeidsmiljøloven her
                    </EksternLenke>
                </p>
            </EkspanderbartPanelRad>

            <EkspanderbartPanelRad
                svgIkon={<SkjoldIkon />}
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
                svgIkon={<SkadeIkon />}
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
                svgIkon={<PersonOpplysningIkon />}
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
                    må slette alle personopplysningene om deltakeren senest innen 12 uker etter at tiltaket er
                    avsluttet.
                </p>
            </EkspanderbartPanelRad>

            {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || props.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                <EkspanderbartPanelRad
                    svgIkon={<SedlerIkon />}
                    headerTekst={{ tekst: 'Sende inn krav om refusjon', typografiType: 'undertittel' }}
                >
                    <p>
                        Vi sender dere et brev til bedriftens innboks i Altinn om innvilget støtte for tiltaket. For å
                        kunne se tilskuddsbrevet i innboksen i Altinn må du ha fått tildelt enkeltrettigheten
                        "Tilskuddsbrev NAV-tiltak" i Altinn. I brevet står det et beløp som viser hvor mye penger NAV
                        holder av for en begrenset periode. Denne perioden kan være maksimalt tre måneder av gangen,
                        uavhengig av tiltakets varighet.
                    </p>

                    <p>
                        Når perioden er over, må dere sende inn et krav om tilskudd til NAV på{' '}
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
        </Ekspanderbartpanel>
    </>
);

export default ArbeidsgiverInstruks;
