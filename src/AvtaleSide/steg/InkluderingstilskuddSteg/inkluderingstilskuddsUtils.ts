import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { useEffect, useState } from 'react';

export const useTilskuddsutgift = (initiellInkluderingstilskuddutgiftListe: Inkluderingstilskuddsutgift[]) => {
    const [inkluderingstilskuddsutgiftListe, setInkluderingstilskuddsutgiftListe] = useState<Inkluderingstilskuddsutgift[]>(initiellInkluderingstilskuddutgiftListe);

    useEffect(() => {
        setInkluderingstilskuddsutgiftListe(initiellInkluderingstilskuddutgiftListe);
    }, [initiellInkluderingstilskuddutgiftListe]);

    const leggTilInkluderingstilskuddsutgift = (beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddsutgiftListe = [...inkluderingstilskuddsutgiftListe];
        nyInkluderingstilskuddsutgiftListe.push({ beløp, type });
        setInkluderingstilskuddsutgiftListe(nyInkluderingstilskuddsutgiftListe);
        return nyInkluderingstilskuddsutgiftListe;
    };

    const endreInkluderingstilskuddsutgift = (index: number, beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddsutgiftListe = [...inkluderingstilskuddsutgiftListe];
        nyInkluderingstilskuddsutgiftListe[index] = {beløp: beløp, type: type};
        setInkluderingstilskuddsutgiftListe(nyInkluderingstilskuddsutgiftListe);
        return nyInkluderingstilskuddsutgiftListe;
    };

    const ledigeInkluderingstilskuddstyper = finnLedigeInkluderingstilskuddstyper(inkluderingstilskuddsutgiftListe).sort();

    const sletteInkluderingstilskuddsutgift = (index: number) => {
        const nyInkluderingstilskuddsutgiftListe = [...inkluderingstilskuddsutgiftListe];
        nyInkluderingstilskuddsutgiftListe.splice(index, index + 1);
        setInkluderingstilskuddsutgiftListe(nyInkluderingstilskuddsutgiftListe);
        return nyInkluderingstilskuddsutgiftListe;
    };

    return { inkluderingstilskuddsutgiftListe, ledigeInkluderingstilskuddstyper, leggTilInkluderingstilskuddsutgift, endreInkluderingstilskuddsutgift, sletteInkluderingstilskuddsutgift };
};


const finnLedigeInkluderingstilskuddstyper = (brukteTyper: Inkluderingstilskuddsutgift[]): InkluderingstilskuddsutgiftType[] => {
    const valgteTyper = (): InkluderingstilskuddsutgiftType[] => {
        return brukteTyper.map(inkluderingstilskuddsutgift => inkluderingstilskuddsutgift.type);
    };
    const typer = ["ARBEIDSHJELPEMIDLER", 'OPPLÆRING', 'PROGRAMVARE', 'TILTAKSPLASS', 'UTSTYR', 'TILRETTELEGGINGSBEHOV'] as const;
    return typer.filter(type => !valgteTyper().includes(type));
};
