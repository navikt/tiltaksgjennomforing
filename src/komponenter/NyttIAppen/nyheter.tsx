import EksternLenke from '@/komponenter/navigation/EksternLenke';
import React from 'react';

const tilDato = (dag: number, måned: number, år: number, timer: number = 0, minutter: number = 0) =>
    new Date(år, måned - 1, dag, timer, minutter);

const nyheter = [
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
