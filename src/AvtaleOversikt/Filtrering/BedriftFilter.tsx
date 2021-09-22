import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { validerOrgnr } from '@/utils/orgnrUtils';
import React, { FunctionComponent } from 'react';
import { SøkeInput } from './SøkeInput';
import { useFilter } from "@/AvtaleOversikt/Filtrering/useFilter";

export const BedriftFilter: FunctionComponent = () => {
    const {endreFilter, filtre} = useFilter();
    return (
        <Filter tittel="Søk på bedrift">
            <SøkeInput
                label="Bedriftsnummer"
                maxLength={9}
                utførSøk={(søkeord: string) => endreFilter({ bedriftNr: søkeord })}
                valider={(verdi: string) => (!validerOrgnr(verdi) ? 'Ugyldig bedriftsnummer' : undefined)}
                placeholder={'Skriv et bedriftsnummer'}
                value={filtre.bedriftNr}
            />
        </Filter>
    );
};
