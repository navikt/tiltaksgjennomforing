import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import { validerFnr } from '@/utils/fnrUtils';
import React, { FunctionComponent } from 'react';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

// Ikke i bruk nå, men kan være relevant senere når AG også får filtreringsmulighet
export const FødselsnummerFilter: FunctionComponent = () => {
    const { endreFilter, filtre } = useFilter();
    return (
        <Filter tittel="Søk på deltaker">
            <SøkeInput
                className="søk"
                label="Fødselsnummer"
                maxLength={11}
                utførsøk={(søkeord: string) => endreFilter({ deltakerFnr: søkeord })}
                valider={(verdi: string) => (!validerFnr(verdi) ? 'Ugyldig fødselsnummer' : undefined)}
                value={filtre.deltakerFnr}
            />
        </Filter>
    );
};
