import { Avtale, TilskuddsPeriode } from '@/types/avtale';
import { useMemo, useState } from 'react';

interface Tilskuddsperiodevisning {
    tilskuddsperioder: {
        forste?: TilskuddsPeriode;
        mellom: TilskuddsPeriode[];
        siste?: TilskuddsPeriode;
    };
    antallAktivePerioder: number;
    visAllePerioder: boolean;
    toggleAllePerioder: () => void;
}

export function useTilskuddsperiodevisning(avtale: Avtale): Tilskuddsperiodevisning {
    const [visAllePerioder, setVisAllePerioder] = useState(false);

    return useMemo(() => {
        const aktiveTilskuddsperioder = avtale.tilskuddPeriode.filter((tp) => tp.aktiv);
        const gjeldendeTilskuddsperiodeIndex =
            aktiveTilskuddsperioder.findIndex((tp) => avtale.gjeldendeTilskuddsperiode?.id === tp.id) ?? 0;

        const forstePeriode = aktiveTilskuddsperioder[0];
        const perioder = aktiveTilskuddsperioder.slice(
            gjeldendeTilskuddsperiodeIndex,
            gjeldendeTilskuddsperiodeIndex + 6,
        );
        const sistePeriode = aktiveTilskuddsperioder[aktiveTilskuddsperioder.length - 1];

        return {
            tilskuddsperioder: {
                forste: perioder.includes(forstePeriode) || visAllePerioder ? undefined : forstePeriode,
                mellom: visAllePerioder ? aktiveTilskuddsperioder : perioder,
                siste: perioder.includes(sistePeriode) || visAllePerioder ? undefined : sistePeriode,
            },
            antallAktivePerioder: aktiveTilskuddsperioder.length,
            visAllePerioder: visAllePerioder,
            toggleAllePerioder: () => setVisAllePerioder(!visAllePerioder),
        };
    }, [avtale.tilskuddPeriode, avtale.gjeldendeTilskuddsperiode, visAllePerioder]);
}
