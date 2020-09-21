import EksternLenke from '@/komponenter/navigation/EksternLenke';
import React from 'react';

const tilDato = (dag: number, måned: number, år: number, timer: number = 0, minutter: number = 0) =>
    new Date(år, måned - 1, dag, timer, minutter);

const nyheter = [
    {
        dato: tilDato(18, 9, 2020),
        tittel: 'Overta avtale',
        innhold: (
            <>
                Du kan nå overta en avtale fra en annen veileder dersom veilederen for eksempel blir syk. Funksjonen
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
