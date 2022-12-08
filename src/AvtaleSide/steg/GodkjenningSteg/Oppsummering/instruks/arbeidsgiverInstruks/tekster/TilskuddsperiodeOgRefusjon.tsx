import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { Money } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';
import { TiltaksType } from '@/types/avtale';

interface Props {
    erPilot: boolean;
    tiltakstype: TiltaksType;
}

const TilskuddsperiodeOgRefusjon: FunctionComponent<Props> = ({ erPilot, tiltakstype }) => {
    if (!(tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || tiltakstype === 'VARIG_LONNSTILSKUDD')) {
        return null;
    }
    return (
        <IkonTekstRad
            svgIkon={<Money width="2.25rem" height="2.25rem" />}
            headerTekst={{ tekst: 'Tilskuddsperiode og refusjon', headingType: 'small' }}
        >
            <p>
                Godkjent tilskuddsperiode {!erPilot && <>i tilskuddsbrevet</>} er styrende i henhold til økonomisk
                forpliktelse fra NAV og kan avvike fra avtalt periode for tiltaksgjennomføringen.
            </p>
            <p>
                Når tiltaket er over, vil NAV sende dere et ferdig utregnet forslag til refusjon. Refusjonen regnes ut
                på bakgrunn av innhold i avtalen og innrapporterte inntekter i A-meldingen. Har dere mindre
                lønnsutgifter enn avtalt, blir også støtten redusert. Tilskuddet behandles automatisk og utbetales
                etterskuddsvis, etter at dere har godkjent refusjonen. Vi kan kontrollere om pengene som blir utbetalt
                blir brukt riktig.
            </p>
            <p>
                Endringer i lønn etterbetales ikke, og vil først kunne gjelde for tilskuddsperioder
                som ikke allerede er godkjente ved tidspunktet for endringen.
            </p>
            <p>
                For å behandle refusjonen må du logge deg inn i refusjonsløsningen:
                <Link href={'https://tiltak-refusjon.nav.no.'}> https://tiltak-refusjon.nav.no. </Link>
                Tilgangen styres via Altinn og du må ha tilgangen “inntektsmelding” for å kunne sende inn refusjonskrav.
            </p>
            <p>
                Siste frist for å sende inn kravet er senest to måneder etter at perioden er over. Hvis fristen ikke
                holdes, trekkes tilskuddet som er innvilget og dere får ikke utbetalt støtte.
            </p>
        </IkonTekstRad>
    );
};
export default TilskuddsperiodeOgRefusjon;
