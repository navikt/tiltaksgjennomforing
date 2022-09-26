import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { useState } from 'react';

export const useTilskuddsutgift = (
    initiellInkluderingstilskuddutgiftListe: Inkluderingstilskuddsutgift[],
    inkluderingstilskuddTotalBeløp: number
) => {
    const [inkluderingstilskuddsutgiftListe, setInkluderingstilskuddsutgiftListe] = useState<
        Inkluderingstilskuddsutgift[]
    >(initiellInkluderingstilskuddutgiftListe);
    const [inkluderingstilskuddTotal, setInkluderingstilskuddTotal] = useState<number>(inkluderingstilskuddTotalBeløp);

    const resettListe = (liste: Inkluderingstilskuddsutgift[]) => setInkluderingstilskuddsutgiftListe(liste);
    
    const oppdatereTotalSummen = (initiellInkluderingstilskuddutgifter: Inkluderingstilskuddsutgift[]) => {
        let utgifterTotalsum = 0;
        initiellInkluderingstilskuddutgifter.forEach((utgift) => (utgifterTotalsum += utgift.beløp));
        return utgifterTotalsum;
    };

    const leggTilInkluderingstilskuddsutgift = (beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddsutgiftListe = [...inkluderingstilskuddsutgiftListe];
        nyInkluderingstilskuddsutgiftListe.push({ beløp: beløp, type: type });
        setInkluderingstilskuddsutgiftListe(nyInkluderingstilskuddsutgiftListe);
        setInkluderingstilskuddTotal(oppdatereTotalSummen(nyInkluderingstilskuddsutgiftListe));
        return nyInkluderingstilskuddsutgiftListe;
    };

    const endreInkluderingstilskuddsutgift = (index: number, beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddsutgiftListe = [...inkluderingstilskuddsutgiftListe];
        nyInkluderingstilskuddsutgiftListe[index] = { beløp: beløp, type: type };
        setInkluderingstilskuddsutgiftListe(nyInkluderingstilskuddsutgiftListe);
        setInkluderingstilskuddTotal(oppdatereTotalSummen(nyInkluderingstilskuddsutgiftListe));
        return nyInkluderingstilskuddsutgiftListe;
    };

    const ledigeInkluderingstilskuddstyper = finnLedigeInkluderingstilskuddstyper(
        inkluderingstilskuddsutgiftListe
    );
    const ledigeInkluderingstilskuddstyperInngåttAvtale = finnLedigeInkluderingstilskuddstyperInngåttAvtale(
        inkluderingstilskuddsutgiftListe
    );

    const sletteInkluderingstilskuddsutgift = (index: number) => {
        const nyInkluderingstilskuddsutgiftListe = [...inkluderingstilskuddsutgiftListe];
        nyInkluderingstilskuddsutgiftListe.splice(index, 1);
        setInkluderingstilskuddsutgiftListe(nyInkluderingstilskuddsutgiftListe);
        setInkluderingstilskuddTotal(oppdatereTotalSummen(nyInkluderingstilskuddsutgiftListe));
        return nyInkluderingstilskuddsutgiftListe;
    };

    return {
        inkluderingstilskuddTotal,
        inkluderingstilskuddsutgiftListe,
        ledigeInkluderingstilskuddstyperInngåttAvtale,
        ledigeInkluderingstilskuddstyper,
        leggTilInkluderingstilskuddsutgift,
        endreInkluderingstilskuddsutgift,
        sletteInkluderingstilskuddsutgift,
        resettListe
    };
};

const finnLedigeInkluderingstilskuddstyperInngåttAvtale = (
    brukteTyper: Inkluderingstilskuddsutgift[]
): InkluderingstilskuddsutgiftType[] => {
    // Typer som er lagt til i tidligere versjoner kan brukes på nytt 1 gang.
    const alleTyper = [
        'TILRETTELEGGINGSBEHOV',
        'TILTAKSPLASS',
        'UTSTYR',
        'ARBEIDSHJELPEMIDLER',
        'PROGRAMVARE',
        'OPPLÆRING',
        'FORSIKRING_LISENS_SERTIFISERING',
    ];
    brukteTyper.forEach((bruktType) => {
        if (bruktType.id === undefined) {
            // typen er ikke i backend og skal brukes opp
            const index = alleTyper.findIndex((type) => type === bruktType.type);
            alleTyper.splice(index, 1);
        }
    });
    return alleTyper as InkluderingstilskuddsutgiftType[];
};

const finnLedigeInkluderingstilskuddstyper = (
    brukteTyper: Inkluderingstilskuddsutgift[]
): InkluderingstilskuddsutgiftType[] => {
    // Typer kan kun brukes 1 gang.
    const valgteTyper = (): InkluderingstilskuddsutgiftType[] => {
        return brukteTyper.map((inkluderingstilskuddsutgift) => inkluderingstilskuddsutgift.type);
    };
    const typer = [
        'TILRETTELEGGINGSBEHOV',
        'TILTAKSPLASS',
        'UTSTYR',
        'ARBEIDSHJELPEMIDLER',
        'PROGRAMVARE',
        'OPPLÆRING',
        'FORSIKRING_LISENS_SERTIFISERING'
    ] as const;
    return typer.filter((type) => !valgteTyper().includes(type));
};
