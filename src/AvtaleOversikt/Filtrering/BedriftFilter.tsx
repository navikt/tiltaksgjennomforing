import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import { validerOrgnr } from '@/utils/orgnrUtils';
import React, { FunctionComponent } from 'react';
import { SøkeInput } from './SøkeInput';

// Ikke i bruk nå, men kan være relevant senere når AG også får filtreringsmulighet
export const BedriftFilter: FunctionComponent<FiltreringProps> = (props) => {
    return (
        <Filter tittel="Søk på bedrift">
            <SøkeInput
                label="Bedriftsnummer"
                maxLength={9}
                utførSøk={(søkeord: string) => props.endreSøk({ bedriftNr: søkeord })}
                valider={(verdi: string) => (!validerOrgnr(verdi) ? 'Ugyldig bedriftsnummer' : undefined)}
                placeholder={'Skriv et bedriftsnummer'}
            />
        </Filter>
    );
};
