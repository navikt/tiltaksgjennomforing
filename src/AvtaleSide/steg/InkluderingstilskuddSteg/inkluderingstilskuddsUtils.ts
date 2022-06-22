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

    const endreMål = (index: number, beløp: number, type: InkluderingstilskuddsutgiftType) => {
        const nyInkluderingstilskuddsutgiftListe = [...inkluderingstilskuddsutgiftListe];
        nyInkluderingstilskuddsutgiftListe[index] = {beløp: beløp, type: type};
        setInkluderingstilskuddsutgiftListe(nyInkluderingstilskuddsutgiftListe);
        return nyInkluderingstilskuddsutgiftListe;
    };

    const ledigeInkluderingstilskuddstyper = finnLedigeInkluderingstilskuddstyper(inkluderingstilskuddsutgiftListe).sort();

    const sletteMål = (index: number) => {
        const nyMålListe = [...inkluderingstilskuddsutgiftListe];
        nyMålListe.splice(index, index + 1);
        setInkluderingstilskuddsutgiftListe(nyMålListe);
        return nyMålListe;
    };

    return { målListe: inkluderingstilskuddsutgiftListe, ledigeMålkategorier: ledigeInkluderingstilskuddstyper, leggTilMål: leggTilInkluderingstilskuddsutgift, endreMål, sletteMål };
};


const finnLedigeInkluderingstilskuddstyper = (brukteTyper: Inkluderingstilskuddsutgift[]): InkluderingstilskuddsutgiftType[] => {
    const valgteTyper = (): InkluderingstilskuddsutgiftType[] => {
        return brukteTyper.map(inkluderingstilskuddsutgift => inkluderingstilskuddsutgift.type);
    };
    const typer = ["ARBEIDSHJELPEMIDLER", 'OPPLÆRING', 'PROGRAMVARE', 'TILTAKSPLASS', 'UTSTYR', 'TILRETTELEGGINGSBEHOV'] as const;
    return typer.filter(type => !valgteTyper().includes(type));
};
