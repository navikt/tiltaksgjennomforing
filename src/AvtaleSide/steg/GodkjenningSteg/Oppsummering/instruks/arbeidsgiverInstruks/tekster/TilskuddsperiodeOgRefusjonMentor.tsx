import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { WalletIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

const TilskuddsperiodeOgRefusjonMentor: FunctionComponent = () => {
    return (
        <IkonTekstRad
            svgIkon={<WalletIcon title="Tilskuddsperiode og refusjon" />}
            headerTekst={{ tekst: 'Tilskuddsperiode og refusjon', headingType: 'small' }}
        >
            <p>
                Tilskuddet dekker mentorens ordinære timelønn for de timene som er avtalt for mentoroppgaven.
                Arbeidsgiver er pliktig til å oppgi korrekt timelønn og antall timer, og kontakte Nav for å få oppdatert
                avtalen dersom det skjer endringer.
            </p>
            <p>
                Nav forplikter seg økonomisk per godkjente tilskuddsperiode. Midler innvilges for én måned av gangen, og
                kan avvike fra den avtalte perioden for tiltaksgjennomføringen.
            </p>
            <p>
                Når tilskuddsperioden er over, utbetales det automatisk refusjon fra Nav. Refusjonen regnes ut på
                bakgrunn av innhold i avtalen. Nav kan kontrollere at pengene som blir utbetalt blir brukt riktig.
            </p>
            <p>
                For å se refusjonen kan arbeidsgiver logge inn i refusjonsløsningen:{' '}
                <Link href="https://tiltak-refusjon.nav.no">https://tiltak-refusjon.nav.no</Link>. Tilgangen styres via
                Altinn og du må ha tilgangen “Tiltaksrefusjon” for å kunne se refusjonskrav.
            </p>
            <p>
                Endringer i avtalen etterbetales ikke, og vil først gjelde for tilskuddsperioder som ikke allerede er
                godkjent ved tidspunktet for endringen.
            </p>
            <p>Tilskudd til mentor kan ikke gis til dekning av de samme utgiftene som dekkes av andre tilskudd.</p>
        </IkonTekstRad>
    );
};
export default TilskuddsperiodeOgRefusjonMentor;
