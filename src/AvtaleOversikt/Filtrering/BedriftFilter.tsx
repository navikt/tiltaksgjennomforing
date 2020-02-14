import * as React from 'react';
import { FunctionComponent } from 'react';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/Filtrering';
import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { validerOrgnr } from '@/utils/orgnrUtils';
import { SøkeInput } from './SøkeInput';

// Ikke i bruk nå, men kan være relevant senere når AG også får filtreringsmulighet
export const BedriftFilter: FunctionComponent<FiltreringProps> = props => {
    return (
        <Filter tittel="Søk på bedrift">
            <SøkeInput
                label="Bedriftsnummer"
                maxLength={9}
                utførSøk={søkeord => props.endreSøk({ bedriftNr: søkeord })}
                valider={verdi => (!validerOrgnr(verdi) ? { feilmelding: 'Ugyldig bedriftsnummer' } : undefined)}
            />
        </Filter>
    );
};
