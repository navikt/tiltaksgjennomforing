import { Avtale, TilskuddPeriodeStatus } from '@/types/avtale';

export type Filtrering = Partial<Avtale> & {
    sorteringskolonne?: keyof Avtale;
    tilskuddPeriodeStatus?: TilskuddPeriodeStatus;
    navEnhet?: string;
};
