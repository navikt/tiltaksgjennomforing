import EksternLenke from '@/komponenter/navigation/EksternLenke';
import React from 'react';

const tilDato = (dag: number, måned: number, år: number, timer: number = 0, minutter: number = 0) =>
    new Date(år, måned - 1, dag, timer, minutter);

const nyheter = [
    {
        dato: tilDato(1, 12, 2021),
        tittel: 'Henting av innsatsbehov for kandidat',
        innhold: (
            <>
                <p>
                    Nå henter avtaleløsningen innsatsbehovet. Det medfører at kandidaten trenger riktig
                    kvalifiseringsgruppe og formidlingsgruppe i arena for å kunne opprette og inngå avtaler.
                </p>
                <p>
                    Er innsatsbehovet til kandidaten feil, vennligst registrer nytt oppfølgingsbehov som samsvarer med
                    reglene rundt gitt tiltak.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(16, 6, 2021),
        tittel: 'Godkjenning på vegne av arbeidsgiver for sommerjobb',
        innhold: (
            <>
                <p>
                    Det er nå mulig å godkjenne avtaler om sommerjobb på vegne av arbeidsgiver på samme måte som man
                    godkjenner på vegne av deltaker.
                </p>
                <p>
                    Dette er ment som en siste utvei, og skal kun benyttes som i unntakstilfeller der det er større
                    problemer for arbeidsgiver å få tilgang. Arbeidsgiver må likevel få tilgang for å få refusjon.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(31, 5, 2021),
        tittel: 'Annullering erstatter avbryt',
        innhold: (
            <>
                <p>
                    "Avbryt" er nå erstattet med "Annullering" som skal brukes når en avtale er feilregistrert eller
                    hvis avtalen ikke ble noe av. Ved å oppgi annulleringsgrunnen "feilregistrering" vil avtalen
                    forsvinne fra oversikten og ikke lenger være synlig for deltakeren og arbeidsgiveren.
                </p>

                <p>Er tilskuddsperioden godkjent og avtalen annulleres, vil midlene frigjøres.</p>

                <p>Hvis tiltaket skal avsluttes før tiden, skal man bruke "forkort avtale" funksjonen i menyen.</p>
            </>
        ),
    },
    {
        dato: tilDato(31, 5, 2021),
        tittel: 'Nå kan inngåtte avtaler endres uten at deltaker og arbeidsgiver må godkjenne på nytt',
        innhold: (
            <>
                <p>
                    "Lås opp avtale" er fjernet og erstattet med en rekke nye endringsfunksjoner i menyen. Endringer via
                    denne menyen krever ikke ny godkjenning fra deltaker eller arbeidsgiver. Det vil også bli opprettet
                    en ny versjon ved endring, slik at man kan se hvordan avtalen så ut før endringen ble utført.
                </p>

                <div>
                    Følgende endringer er endringer som påvirker tilsagnet:
                    <ul>
                        <li>endringer i avtaleperioden</li>
                        <li>endre tilskuddsberegningen</li>
                    </ul>
                    Disse endringene vil bli gjeldende på fremtidige tilskuddsperioder som ikke er godkjent av
                    beslutter.
                </div>

                <p>
                    Det er planlagt å varsle på sms til deltaker og arbeidsgiver ved nye endringer, men dette er ikke
                    klart helt enda.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(19, 5, 2021),
        tittel: 'Avtale om sommerjobb lansert ⛱',
        innhold: (
            <>
                <p>Det er nå mulig å opprette avtaler om sommerjobb.</p>
                <p>
                    <EksternLenke href="https://navno.sharepoint.com/sites/intranett-produktomrader-og-utvikling/SitePages/Digital-avtale-om-tilskudd-til-sommerjobb.aspx">
                        Les mer om sommerjobb på navet.
                    </EksternLenke>
                </p>
            </>
        ),
    },
    {
        dato: tilDato(22, 4, 2021),
        tittel: 'Nytt felt for antall dager i tiltak per uke',
        innhold: (
            <>
                <p>
                    Det er nå lagt til et nytt felt for antall dager i tiltaket som må fylles ut for alle tiltakstyper.
                    Dette feltet ligger under steget varighet.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(11, 3, 2021),
        tittel: 'Mulig å laste ned en PDF av avtalen',
        innhold: (
            <p>
                Etter at avtale er godkjent av alle parter kan man nå laste ned en PDF-versjon av avtalen. Link til å
                laste ned PDF-en ligger på oppsummeringssiden til avtalen. Både deltaker, arbeidsgiver og NAV har
                tilgang til denne linken.
            </p>
        ),
    },
    {
        dato: tilDato(19, 2, 2021),
        tittel: 'Endring av prosentsats midlertidig lønnstilskudd',
        innhold: (
            <p>
                Endring av prosentsats for lønnstilskuddet etter henholdsvis seks og tolv måneder, foregår automatisk ut
                fra periode som legges inn i avtalen (også ved forlengelser). Det beregnes da to perioder som vises i
                beregningssteget og i oversikten.
            </p>
        ),
    },
    {
        dato: tilDato(21, 1, 2021),
        tittel: 'Nå kan også arbeidsgiveren opprette digitale tiltaksavtaler',
        innhold: (
            <>
                <p>
                    Avtaler som arbeidsgiveren oppretter vises under «ufordelte» avtaler. Veilederen overtar avtalen ved
                    å klikke seg inn i avtalen og velge «overta avtale».
                </p>
                <p>
                    <EksternLenke href="https://navno.sharepoint.com/sites/intranett-produktomrader-og-utvikling/SitePages/N%C3%A5-kan-ogs%C3%A5-arbeidsgiveren-opprette-avtale-i-digital-l%C3%B8sning-om-tiltaksavtaler.aspx">
                        Les mer om ny funksjonalitet og rutiner på Navet.
                    </EksternLenke>
                </p>
            </>
        ),
    },
    {
        dato: tilDato(15, 10, 2020),
        tittel: 'Predefinerte stillinger',
        innhold: (
            <>
                For arbeidstrenings- og lønnstilskuddavtaler velges nå stilling ut fra predefinerte stillinger.
                Stillingene man kan velge fra er de samme som på Arbeidsplassen. På sikt kan vi dermed lage bedre
                statistikker over hvilke stillinger som benyttes ved arbeidsmarkedstiltak.
            </>
        ),
    },
    {
        dato: tilDato(2, 10, 2020),
        tittel: 'Virksomhetsmeny for arbeidsgiver',
        innhold: (
            <>
                Arbeidsgiver må nå velge fra menyen hvilken virksomhet de ønsker å se avtaler på. På denne måten kan vi
                gi bedre informasjon om hvilke tilganger man har i den valgte virksomheten, og hvilke som mangler. For
                tiltakene man mangler tilgang på er det mulig å trykke på "Be om tilgang" og bli videresendt til Altinn.
            </>
        ),
    },
    {
        dato: tilDato(18, 9, 2020),
        tittel: 'Overta avtale',
        innhold: (
            <>
                Du kan nå overta en avtale fra en annen veileder dersom veilederen for eksempel blir syk. Du søker opp
                avtalen du vil ta over enten via bedrift eller fødselsnummer på bruker. Funksjonen for å overta avtalen
                finner du på verktøylinjen inne i avtalen. Avtalen beholder eventuelle godkjenninger når den blir
                overtatt av en annen veileder.
            </>
        ),
    },
    {
        dato: tilDato(18, 9, 2020),
        tittel: 'Hendelseslogg',
        innhold: (
            <>
                Nå kan du se en logg over hva som har blitt gjort i avtalen. Du finner loggen på verktøylinjen inne i
                avtalen.
            </>
        ),
    },
    {
        dato: tilDato(2, 9, 2020),
        tittel: 'Filtrere avtaler i oversikten på status',
        innhold:
            'Nederst i den venstre kolonnen er det nå mulig å filtrere ut avtalene i oversikten på ulike statuser.',
    },
    {
        dato: tilDato(1, 9, 2020),
        tittel: 'Digital avtale om lønnstilskudd lansert',
        innhold: (
            <>
                <p>
                    Den digitale lønnstilskuddsavtalen har vært pilotert på NAV Nordstrand i Oslo, og er fra i dag (1.
                    sept.) tilgjengelig for alle fylker. Den digitale avtalen om lønnstilskudd er i samme løsning som
                    avtale om arbeidstrening, og gjelder både midlertidig og varig lønnstilskudd. Papirskjema og
                    søknadsskjema for arbeidsgiver i Altinn vil være tilgjengelig i en overgangsperiode, men digital
                    avtale skal fortrinnsvis benyttes.
                </p>
                <p>
                    <EksternLenke href="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Ny-digital-avtale-om-l%C3%B8nnstilskudd.aspx">
                        Les mer om digital avtale på navet.
                    </EksternLenke>
                </p>
            </>
        ),
    },
];

export default nyheter;
