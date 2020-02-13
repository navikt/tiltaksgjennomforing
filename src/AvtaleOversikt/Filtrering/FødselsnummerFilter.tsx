import * as React from 'react';
import { FunctionComponent } from 'react';
import { validerFnr } from '@/utils/fnrUtils';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/Filtrering';
import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { SøkeInput } from '@/AvtaleOversikt/Filtrering/SøkeInput';

export const FødselsnummerFilter: FunctionComponent<FiltreringProps> = props => {
    return (
        <Filter tittel="Søk på deltaker">
            <SøkeInput
                label="Fødselsnummer"
                maxLength={11}
                utførSøk={søkeord => props.endreSøk({deltakerFnr: søkeord})}
                valider={verdi => (!validerFnr(verdi) ? { feilmelding: 'Ugyldig fødselsnummer' } : undefined)}
            />
        </Filter>
    );
};
