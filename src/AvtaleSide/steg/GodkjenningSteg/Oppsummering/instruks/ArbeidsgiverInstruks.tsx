import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
<<<<<<< HEAD
import EkstbanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad';
import { ReactComponent as RettighetsHammerIkon } from '@/assets/ikoner/lov.svg';
import { ReactComponent as DrofteMedAnsattePersonOpplysning } from '@/assets/ikoner/drofteMedAnsattePersonOpplysning.svg';
import { ReactComponent as SkadeErstatning } from '@/assets/ikoner/skadeErstatning.svg';
import { ReactComponent as BehandlingPersonOpplysning } from '@/assets/ikoner/behandlingPersonOpplysning.svg';
=======
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import { ReactComponent as LovIkon } from '@/assets/ikoner/lov.svg';
import { ReactComponent as AnsatteIkon } from '@/assets/ikoner/ansatte.svg';
import { ReactComponent as SkadeIkon } from '@/assets/ikoner/skade.svg';
import { ReactComponent as PersonOpplysningIkon } from '@/assets/ikoner/personopplysninger.svg';
import { ReactComponent as SkjoldIkon } from '@/assets/ikoner/skjold.svg';
>>>>>>> refs/remotes/origin/master
import BEMHelper from '@/utils/bem';
import EksternLenke from '@/komponenter/navigation/EksternLenke';

const cls = BEMHelper('instruks');
interface Props {
    erLaast: boolean;
}
const ArbeidsgiverInstruks: FunctionComponent<Props> = props => (
    <>
        {!props.erLaast && <Normaltekst>Når du godkjenner godtar du kravene fra NAV</Normaltekst>}
        <VeilederpanelMedUtklippstavle>
            <div className={cls.element('subheader')}>
                <Element>Som arbeidsgiver må du</Element>
            </div>
            <ul>
                <li>
                    <Normaltekst>følge arbeidsmiljøloven</Normaltekst>
                </li>
                <li>
                    <Normaltekst>ha forsikring for deltaker på arbeidstrening</Normaltekst>
                </li>
                <li>
                    <Normaltekst>følge folketrygdlovens regler for egenmelding og sykmelding</Normaltekst>
                </li>
                <li>
                    <Normaltekst>sørge for at tiltaksplassen ikke erstatter en vanlig stilling i bedriften</Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        behandle personopplysninger til kandidaten på en forsvarlig måte og slette opplysningene etter
                        at arbeidstreningen er ferdig
                    </Normaltekst>
                </li>
            </ul>
        </VeilederpanelMedUtklippstavle>

        <Ekspanderbartpanel border={true} tittel="Les mer om kravene">
            <EkspanderbartPanelRad
                svgIkon={<LovIkon />}
                headerTekst={{ tekst: 'Arbeidsmiljøloven', typografiType: 'undertittel' }}
            >
                <p>
                    Selv om deltakeren ikke er ansatt, skal dere følge arbeidsmiljølovens bestemmelser om arbeidsgivers
                    og arbeidstakers plikter, krav til arbeidsmiljø og krav til kontrolltiltak. Det inkluderer også
                    arbeidstid, vern mot diskriminering og straff ved overtredelse av lovens bestemmelser.
                </p>
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
        </Ekspanderbartpanel>
    </>
);

export default ArbeidsgiverInstruks;
