import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { useState } from 'react';

// Typen til inkluderingstilskuddtypeTekst krever alle typer som nøkler, så listen er alltid komplett.
const alleInkluderingstilskuddstyper = Object.keys(inkluderingstilskuddtypeTekst) as InkluderingstilskuddsutgiftType[];

export const summerUtgifter = (utgifter: Inkluderingstilskuddsutgift[]): number =>
    utgifter.reduce((sum, utgift) => sum + utgift.beløp, 0);

export const leggTilUtgift = (
    utgifter: Inkluderingstilskuddsutgift[],
    beløp: number,
    type: InkluderingstilskuddsutgiftType,
): Inkluderingstilskuddsutgift[] => [...utgifter, { beløp, type }];

export const slettUtgift = (
    utgifter: Inkluderingstilskuddsutgift[],
    utgift: Inkluderingstilskuddsutgift,
): Inkluderingstilskuddsutgift[] => utgifter.filter((u) => u !== utgift);

// Typer kan kun brukes 1 gang.
export const finnLedigeInkluderingstilskuddstyper = (
    utgifter: Inkluderingstilskuddsutgift[],
): InkluderingstilskuddsutgiftType[] =>
    alleInkluderingstilskuddstyper.filter((type) => !utgifter.some((utgift) => utgift.type === type));

// Typer som er lagt til i tidligere versjoner kan brukes på nytt 1 gang.
// Utgifter uten id er ikke lagret i backend ennå, og bruker opp typen.
export const finnLedigeInkluderingstilskuddstyperInngåttAvtale = (
    utgifter: Inkluderingstilskuddsutgift[],
): InkluderingstilskuddsutgiftType[] =>
    alleInkluderingstilskuddstyper.filter(
        (type) => !utgifter.some((utgift) => utgift.id === undefined && utgift.type === type),
    );

// Ulagrede endringer i utgiftslisten for endring av inngått avtale.
// Kall `tilbakestill` med de lagrede utgiftene for å forkaste endringene, for eksempel når modalen åpnes.
export const useUlagredeUtgifter = (lagredeUtgifter: Inkluderingstilskuddsutgift[]) => {
    const [utgifter, setUtgifter] = useState<Inkluderingstilskuddsutgift[]>(lagredeUtgifter);

    return {
        utgifter,
        total: summerUtgifter(utgifter),
        ledigeTyper: finnLedigeInkluderingstilskuddstyperInngåttAvtale(utgifter),
        leggTil: (beløp: number, type: InkluderingstilskuddsutgiftType) =>
            setUtgifter((forrige) => leggTilUtgift(forrige, beløp, type)),
        slett: (utgift: Inkluderingstilskuddsutgift) => setUtgifter((forrige) => slettUtgift(forrige, utgift)),
        tilbakestill: setUtgifter,
    };
};
