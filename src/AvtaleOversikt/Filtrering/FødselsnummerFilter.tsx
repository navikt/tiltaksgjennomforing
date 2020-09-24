import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import { validerFnr } from '@/utils/fnrUtils';
import * as React from 'react';
import { FunctionComponent } from 'react';

// Ikke i bruk nå, men kan være relevant senere når AG også får filtreringsmulighet
export const FødselsnummerFilter: FunctionComponent<FiltreringProps> = props => {
    return (
        <Filter tittel="Søk på deltaker">
            <SøkeInput
                label="Fødselsnummer"
                maxLength={11}
                utførSøk={søkeord => props.endreSøk({ deltakerFnr: søkeord })}
                valider={verdi => (!validerFnr(verdi) ? { feilmelding: 'Ugyldig fødselsnummer' } : undefined)}
            />
        </Filter>
    );
};
