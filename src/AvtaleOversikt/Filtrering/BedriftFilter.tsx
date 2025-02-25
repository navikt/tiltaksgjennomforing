import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { validerOrgnr } from '@/utils/orgnrUtils';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { SøkeInput } from './SøkeInput';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

export const BedriftFilter: FunctionComponent<PropsWithChildren> = () => {
    const { endreFilter, filtre } = useFilter();
    return (
        <Filter tittel="Søk på bedrift">
            <SøkeInput
                className="søk"
                style={{ display: 'flex', alignItems: 'center' }}
                label="Organisasjonsnummer for underenhet"
                maxLength={9}
                utførsøk={(søkeord: string) => endreFilter({ bedriftNr: søkeord })}
                valider={(verdi: string) => {
                    if (verdi === '') return undefined;
                    return !validerOrgnr(verdi) ? 'Ugyldig organisasjonsnummer for underenhet' : undefined;
                }}
                placeholder={'Skriv et organisasjonsnummer for underenhet'}
                verdi={filtre.bedriftNr}
            />
        </Filter>
    );
};
