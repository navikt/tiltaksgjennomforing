import { Avtale, TilskuddPeriodeStatus } from '@/types/avtale';
import React from 'react';

interface FilterOgPagination {
    sorteringskolonne?: keyof Avtale;
    tilskuddPeriodeStatus?: TilskuddPeriodeStatus;
    navEnhet?: string;
    bedrift?: string; // Bedriftsmenyen bruker queryparameter som heter 'bedrift', så må konvertere den til 'bedriftNr
    page?: string;
    sorteringOrder?: string;
}

export type Filtrering = Partial<Avtale> & FilterOgPagination;
