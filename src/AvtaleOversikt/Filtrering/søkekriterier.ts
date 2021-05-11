import { Avtale, TilskuddPeriodeStatus } from '@/types/avtale';

export type Søkekriterier = Partial<Avtale> & {
    sorteringskolonne?: keyof Avtale;
    tilskuddPeriodeStatus?: TilskuddPeriodeStatus;
};
