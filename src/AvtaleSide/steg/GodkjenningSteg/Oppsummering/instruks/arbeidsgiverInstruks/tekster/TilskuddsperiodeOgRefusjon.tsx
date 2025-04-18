import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { Link } from '@navikt/ds-react';
import { TiltaksType } from '@/types/avtale';
import { WalletIcon } from '@navikt/aksel-icons';

interface Props {
    tiltakstype: TiltaksType;
}

const TilskuddsperiodeOgRefusjon: FunctionComponent<Props> = ({ tiltakstype }) => {
    if (
        !(
            tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
            tiltakstype === 'VARIG_LONNSTILSKUDD' ||
            tiltakstype === 'SOMMERJOBB' ||
            tiltakstype === 'VTAO'
        )
    ) {
        return null;
    }
    if (tiltakstype === 'VTAO') {
        return (
            <IkonTekstRad
                svgIkon={<WalletIcon title="Tilskuddsperiode og refusjon" />}
                headerTekst={{ tekst: 'Tilskuddsperiode og refusjon', headingType: 'small' }}
            >
                <p>
                    Godkjent tilskuddsperiode er styrende i henhold til økonomisk forpliktelse fra NAV og kan avvike fra
                    avtalt periode for tiltaksgjennomføringen. Ved endring i deltakelsen underveis i tiltaket som kan
                    påvirker utbetalingen, så må du gi umiddelbar beskjed til NAV.
                </p>
                <p>
                    Tilskudd for varig tilrettelagt arbeid i ordinær virksomhet baseres på en fast sats som settes årlig
                    av departementet. Avtale- og refusjonsløsningen vil automatisk oppdateres når det kommer nye satser.
                </p>
                <p>
                    Refusjonen behandles automatisk, utbetaling og kvittering kan ses i refusjonsløsningen (
                    <Link href={'https://tiltak-refusjon.nav.no'}> https://tiltak-refusjon.nav.no</Link>) og via Min
                    Side Arbeidsgiver. For å bruke løsningen må du ha tilgangen “inntektsmelding” via Altinn. Vi kan
                    kontrollere om pengene som blir utbetalt blir brukt riktig.
                </p>
            </IkonTekstRad>
        );
    }
    return (
        <IkonTekstRad
            svgIkon={<WalletIcon title="Tilskuddsperiode og refusjon" />}
            headerTekst={{ tekst: 'Tilskuddsperiode og refusjon', headingType: 'small' }}
        >
            <p>
                Godkjent tilskuddsperiode er styrende i henhold til økonomisk forpliktelse fra NAV og kan avvike fra
                avtalt periode for tiltaksgjennomføringen.
            </p>
            <p>
                Når tiltaket er over, vil NAV sende dere et ferdig utregnet forslag til refusjon. Refusjonen regnes ut
                på bakgrunn av innhold i avtalen og innrapporterte inntekter i A-meldingen. Har dere mindre
                lønnsutgifter enn avtalt, blir også støtten redusert. Tilskuddet behandles automatisk og utbetales
                etterskuddsvis, etter at dere har godkjent refusjonen. Vi kan kontrollere om pengene som blir utbetalt
                blir brukt riktig.
            </p>
            <p>
                Endringer i lønn etterbetales ikke, og vil først kunne gjelde for tilskuddsperioder som ikke allerede er
                godkjente ved tidspunktet for endringen.
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
