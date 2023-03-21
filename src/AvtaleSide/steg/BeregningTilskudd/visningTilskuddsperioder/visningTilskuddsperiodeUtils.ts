import { Avtale, TilskuddsPeriode } from '@/types/avtale';

interface IndexVisning {
    startIndexVisning: number;
    sluttIndexVisning: number;
}

export const antallAktiveTilskuddsperioder = (avtale: Avtale): number =>
    avtale.tilskuddPeriode.filter((periode: TilskuddsPeriode) => periode.aktiv).length;

export function getIndexVisningForTilskuddsperiode(avtale: Avtale, visAllePerioder: boolean): IndexVisning {
    let gjeldendeTilskuddsperiodeIndex = 0;
    if (avtale.gjeldendeTilskuddsperiode) {
        let i = 0;
        avtale.tilskuddPeriode.forEach((periode: TilskuddsPeriode) => {
            if (avtale.gjeldendeTilskuddsperiode && avtale.gjeldendeTilskuddsperiode.id === periode.id) {
                gjeldendeTilskuddsperiodeIndex = i;
            }
            i++;
        });
    }
    let startIndexVisning = gjeldendeTilskuddsperiodeIndex - 6;
    if (startIndexVisning < 0) {
        startIndexVisning = 0;
    }
    let sluttIndexVisning = gjeldendeTilskuddsperiodeIndex + 6;
    if (visAllePerioder) {
        startIndexVisning = 0;
        sluttIndexVisning = antallAktiveTilskuddsperioder(avtale);
    }

    return {
        startIndexVisning: startIndexVisning,
        sluttIndexVisning: sluttIndexVisning,
    };
}
