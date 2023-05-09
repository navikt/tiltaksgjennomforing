import { Avtale, TilskuddPeriodeStatus } from '@/types/avtale';
import { number } from 'prop-types';
import React from 'react';

interface FiterOgPagnation {
    sorteringskolonne?: keyof Avtale;
    tilskuddPeriodeStatus?: TilskuddPeriodeStatus;
    navEnhet?: string;
    bedrift?: string; // Bedriftsmenyen bruker queryparameter som heter 'bedrift', så må konvertere den til 'bedriftNr
    page?: string;
}

export type Filtrering = Partial<Avtale> & FiterOgPagnation;
