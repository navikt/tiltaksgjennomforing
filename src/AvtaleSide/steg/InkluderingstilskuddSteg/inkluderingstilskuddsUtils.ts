import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { inkluderingstilskuddtypeTekst } from '@/messages';
import { useState } from 'react';

export const alleInkluderingstilskuddstyper = Object.keys(
    inkluderingstilskuddtypeTekst,
) as InkluderingstilskuddsutgiftType[];

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

export const useUlagredeUtgifter = (lagredeUtgifter: Inkluderingstilskuddsutgift[]) => {
    const [utgifter, setUtgifter] = useState<Inkluderingstilskuddsutgift[]>(lagredeUtgifter);
    return {
        alleInkluderingstilskuddstyper,
        utgifter,
        total: summerUtgifter(utgifter),
        leggTil: (beløp: number, type: InkluderingstilskuddsutgiftType) =>
            setUtgifter((forrige) => leggTilUtgift(forrige, beløp, type)),
        slett: (utgift: Inkluderingstilskuddsutgift) => setUtgifter((forrige) => slettUtgift(forrige, utgift)),
        tilbakestill: setUtgifter,
    };
};
