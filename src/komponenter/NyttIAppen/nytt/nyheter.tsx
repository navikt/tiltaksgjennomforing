import EksternLenke from '@/komponenter/navigation/EksternLenke';
import React from 'react';

const tilDato = (dag: number, måned: number, år: number, timer: number = 0, minutter: number = 0) =>
    new Date(år, måned - 1, dag, timer, minutter);

const nyheter = [
    {
        dato: tilDato(2, 8, 2020),
        tittel: 'Ny digital avtale om lønnstilskudd lansert i dag :)',
        innhold: (
            <>
                <p></p>
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
    {
        dato: tilDato(8, 6, 2020),
        tittel: 'Nå kan du søke etter en kandidat',
        innhold:
            'Øverst i kandidatsøket i fritekstsøket, kan du nå søke på fødselsnummer og få treff på kandidaten du leter etter. Du vil kun få treff på kandidater som er synlige i Rekrutteringsbistand.',
    },
    {
        dato: tilDato(4, 6, 2020),
        tittel: 'Filtrering på alder',
        innhold:
            'I kandidatsøket har du nå mulighet til å filtrere på alder. Du legger selv inn hvilket aldersintervall du vil ha i søket. Det gir en ny mulighet til målrettede søk etter kandidater innenfor prioriterte målgrupper.',
    },
];

export default nyheter;
