import { Avtale, TilskuddPeriodeStatus } from '@/types/avtale';
import { number } from 'prop-types';
import React from 'react';

export type Filtrering = Partial<Avtale> & {
    sorteringskolonne?: keyof Avtale;
    tilskuddPeriodeStatus?: TilskuddPeriodeStatus;
    navEnhet?: string;
    bedrift?: string; // Bedriftsmenyen bruker queryparameter som heter 'bedrift', så må konvertere den til 'bedriftNr
    page?: string;
};
