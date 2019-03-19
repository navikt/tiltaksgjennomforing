import { Normaltekst, Element } from 'nav-frontend-typografi';
import * as React from 'react';
import VeilederpanelMedUtklippstavle from '../../../../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import EkstbanderbartPanelRad from '../../../../komponenter/EkspanderbartPanelRad/EkstbanderbartPanelRad';
import { ReactComponent as RettighetsHammerIkon } from '../../../../assets/ikoner/law.svg';
import { ReactComponent as DrofteMedAnsattePersonOpplysning } from '../../../../assets/ikoner/drofteMedAnsattePersonOpplysning.svg';
import { ReactComponent as SkadeErstatning } from '../../../../assets/ikoner/skadeErstatning.svg';
import { ReactComponent as BehandlingPersonOpplysning } from '../../../../assets/ikoner/behandlingPersonOpplysning.svg';
import BEMHelper from '../../../../utils/bem';

const cls = BEMHelper('instruks');

const ArbeidsgiverInstruks = () => (
    <>
        <Normaltekst>Når du godkjenner godtar du kravene fra NAV</Normaltekst>
        <VeilederpanelMedUtklippstavle>
            <div className={cls.element('subheader', 'arbeidsgiver')}>
                <Element>Som arbeidsgiver må du:</Element>
            </div>
            <ul>
                <li>
                    <Normaltekst>Følge arbeidsmiljøloven</Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Ha forsikring for deltaker på arbeidstrening
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Sørge for at tiltaksplassen ikke erstatter en vanlig
                        stilling i bedriften
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Behandle personopplysninger til kandidaten på en
                        forsvarlig måte og slette opplysningene etter at
                        arbeidstreningen er ferdig
                    </Normaltekst>
                </li>
            </ul>
        </VeilederpanelMedUtklippstavle>
        <Ekspanderbartpanel border={true} tittel="Les mer om kravene">
            <EkstbanderbartPanelRad
                svgIkon={<RettighetsHammerIkon />}
                headerTekst="Arbeidsmiljøloven"
            >
                En arbeidssøker som deltar på arbeidstrening blir i de fleste
                situasjoner regnet som en ordinær arbeidstaker etter
                arbeidsmiljøloven. Det betyr at arbeidsgivers og deltaker
                plikter til arbeidsmiljø og krav til kontrolltiltak også gjelder
                når arbeidssøkeren er på arbeidstrening. Det inkluderer blant
                annet arbeidstid, vern mot diskriminering og straff ved
                overtredelse av lovens bestemmelser.
            </EkstbanderbartPanelRad>
            <EkstbanderbartPanelRad
                svgIkon={<SkadeErstatning />}
                headerTekst="Yrkesskadeforsikring og skadeerstatning"
            >
                Den som er i arbeidstrening er omfattet av arbeidsgiverens
                yrkesskadeforsikring. Arbeidsgiveren er ansvarlig for skade som
                personen i arbeidstrening gjør, enten forsettlig eller uaktsomt.
                Du kan søke om inkluderingstilskudd for å dekke eventuelle
                kostnader i forbindelse med forsikringsansvaret.
            </EkstbanderbartPanelRad>
            <EkstbanderbartPanelRad
                svgIkon={<DrofteMedAnsattePersonOpplysning />}
                headerTekst="Drøft med representanter for de ansatte"
            >
                Du må drøfte inngåelse av avtale om arbeidstrening med
                representanter for de ansatte i din bedrift før en eventuell
                avtaleinngåelse. Tillitsvalgte og verneombud skal ivareta de
                ansattes interesser, og en tiltaksplass skal ikke erstatte en
                vanlig stilling i bedriften.
            </EkstbanderbartPanelRad>

            <EkstbanderbartPanelRad
                svgIkon={<BehandlingPersonOpplysning />}
                headerTekst="Behandling av personopplysninger"
            >
                Som arbeidsgiver må du sikre at all behandling av
                personopplysninger utføres etter krav til personvern,
                taushetsplikt og informasjonssikkerhet. Taushetsbelagte og
                sensitive personopplysninger skal ikke sendes mellom deg og NAV
                på usikrede og ukrypterte kommunikasjonskanaler, slik som
                usikret epost og faks. Senest innen 12 uker etter at
                tiltaksgjennomføringen er avsluttet, skal du eller
                databehandleren slette personopplysninger om den du har i
                arbeidstrening.
            </EkstbanderbartPanelRad>
        </Ekspanderbartpanel>
    </>
);

export default ArbeidsgiverInstruks;
