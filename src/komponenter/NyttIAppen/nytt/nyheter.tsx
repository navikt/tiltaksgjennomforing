import EksternLenke from '@/komponenter/navigation/EksternLenke';
import React from 'react';

const tilDato = (dag: number, måned: number, år: number, timer: number = 0, minutter: number = 0) =>
    new Date(år, måned - 1, dag, timer, minutter);

const nyheter = [
    {
        dato: tilDato(2, 9, 2020),
        tittel: 'Nå kan du filtrere avtaler i oversikten på status',
        innhold:
            'Nederst i den venstre kolonnen er det nå mulig å filtrere ut avtalene i oversikten på ulike statuser.',
    },
    {
        dato: tilDato(1, 9, 2020),
        tittel: 'Ny digital avtale om lønnstilskudd lansert i dag :)',
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
