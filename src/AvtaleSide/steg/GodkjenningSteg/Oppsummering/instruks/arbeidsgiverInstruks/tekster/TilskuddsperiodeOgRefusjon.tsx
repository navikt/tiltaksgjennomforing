import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';
import { WalletIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

interface Props {
    tiltakstype: TiltaksType;
}

const TilskuddsperiodeOgRefusjon: FunctionComponent<Props> = ({ tiltakstype }) => {
    if (
        !(
            tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
            tiltakstype === 'VARIG_LONNSTILSKUDD' ||
            tiltakstype === 'FIREARIG_LONNSTILSKUDD' ||
            tiltakstype === 'SOMMERJOBB' ||
            tiltakstype === 'VTAO'
        )
    ) {
        return null;
    }
    if (tiltakstype === 'FIREARIG_LONNSTILSKUDD') {
        return (
            <IkonTekstRad
                svgIkon={<WalletIcon title="Tilskuddsperiode og refusjon" />}
                headerTekst={{ tekst: 'Tilskuddsperiode og refusjon', headingType: 'small' }}
            >
                <p>Tilskuddet reguleres av forskrift om forsøk med fireårig lønnstilskudd for unge.</p>
                <p>
                    Nav forplikter seg økonomisk per godkjente tilskuddsperiode. Midler innvilges for én måned av
                    gangen, og kan avvike fra den avtalte perioden for tiltaksgjennomføringen.
                </p>
                <p>
                    Når tilskuddsperioden er over, vil Nav sende dere et ferdig utregnet forslag til refusjon.
                    Refusjonen regnes ut på bakgrunn av innhold i avtalen og innrapporterte inntekter i A-meldingen. Har
                    dere mindre lønnsutgifter enn avtalt, blir også støtten redusert. Tilskuddet behandles automatisk og
                    utbetales etterskuddsvis, etter at dere har godkjent refusjonen.
                </p>
                <p>Nav kan kontrollere at pengene som blir utbetalt blir brukt riktig.</p>
                <p>
                    For å behandle refusjonen må du logge deg inn i{' '}
                    <EksternLenke href="https://tiltak-refusjon.nav.no">refusjonsløsningen</EksternLenke>. Tilgangen
                    styres via Altinn og du må ha tilgangen “Tiltaksrefusjon” for å kunne sende inn refusjonskrav.
                </p>
                <p>
                    Endringer i lønn etterbetales ikke, og vil først gjelde for tilskuddsperioder som ikke allerede er
                    godkjent ved tidspunktet for endringen.
                </p>
                <p>
                    Siste frist for å sende inn kravet er senest to måneder etter at perioden er over. Hvis fristen ikke
                    holdes, trekkes tilskuddet som er innvilget og dere får ikke utbetalt støtte.
                </p>
            </IkonTekstRad>
        );
    }
    if (tiltakstype === 'VTAO') {
        return (
            <IkonTekstRad
                svgIkon={<WalletIcon title="Tilskuddsperiode og refusjon" />}
                headerTekst={{ tekst: 'Tilskuddsperiode og refusjon', headingType: 'small' }}
            >
                <p>
                    De godkjente tilskuddsperiodene er styrende for Navs økonomiske forpliktelser og kan avvike fra den
                    faktiske perioden for tiltaket. Ved endring i deltakelsen underveis i tiltaket som kan påvirke
                    utbetalingen, så må dere gi umiddelbar beskjed til Nav.
                </p>
                <p>Merk:</p>
                <ul style={{ paddingInlineStart: '1.5rem' }}>
                    <li>
                        Tilskudd for varig tilrettelagt arbeid i ordinær virksomhet følger en årlig sats fastsatt av
                        departementet.
                    </li>
                    <li>Avtale- og refusjonsløsningen oppdateres automatisk ved endringer i satsene.</li>
                    <li>Refusjoner behandles automatisk.</li>
                    <li>
                        Utbetaling og kvitteringer finner dere i{' '}
                        <EksternLenke href="https://tiltak-refusjon.Nav.no">refusjonsløsningen</EksternLenke> og via Min
                        Side Arbeidsgiver.
                    </li>
                    <li>For å bruke løsningen må dere ha tilgang til “Tiltaksrefusjon” via Altinn.</li>
                </ul>
                <p>Nav forbeholder seg retten til å kontrollere at utbetalte midler brukes i samsvar med avtalen.</p>
            </IkonTekstRad>
        );
    }
    return (
        <IkonTekstRad
            svgIkon={<WalletIcon title="Tilskuddsperiode og refusjon" />}
            headerTekst={{ tekst: 'Tilskuddsperiode og refusjon', headingType: 'small' }}
        >
            <p>
                Godkjent tilskuddsperiode er styrende i henhold til økonomisk forpliktelse fra Nav og kan avvike fra
                avtalt periode for tiltaksgjennomføringen.
            </p>
            <p>
                Når tilskuddsperioden er over, vil Nav sende dere et ferdig utregnet forslag til refusjon. Refusjonen
                regnes ut på bakgrunn av innhold i avtalen og innrapporterte inntekter i A-meldingen. Har dere mindre
                lønnsutgifter enn avtalt, blir også støtten redusert. Tilskuddet behandles automatisk og utbetales
                etterskuddsvis, etter at dere har godkjent refusjonen. Vi kan kontrollere om pengene som blir utbetalt
                blir brukt riktig.
            </p>
            <p>
                Endringer i lønn etterbetales ikke, og vil først kunne gjelde for tilskuddsperioder som ikke allerede er
                godkjente ved tidspunktet for endringen.
            </p>
            <p>
                For å behandle refusjonen må du logge deg inn i{' '}
                <EksternLenke href="https://tiltak-refusjon.nav.no">refusjonsløsningen</EksternLenke>. Tilgangen styres
                via Altinn og du må ha tilgangen “Tiltaksrefusjon” for å kunne sende inn refusjonskrav.
            </p>
            <p>
                Siste frist for å sende inn kravet er senest to måneder etter at perioden er over. Hvis fristen ikke
                holdes, trekkes tilskuddet som er innvilget og dere får ikke utbetalt støtte.
            </p>
        </IkonTekstRad>
    );
};
export default TilskuddsperiodeOgRefusjon;
