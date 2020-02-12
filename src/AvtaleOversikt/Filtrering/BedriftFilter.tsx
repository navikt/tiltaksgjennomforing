import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/Filtrering';
import { Input } from 'nav-frontend-skjema';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';

export const BedriftFilter: FunctionComponent<FiltreringProps> = props => {
    const [bedriftNr, setBedriftNr] = useState<string>('');
    return (
        <Filter tittel="Bedrift">
            <Input
                label="Bedriftsnummer"
                defaultValue={bedriftNr}
                onChange={event => setBedriftNr(event.target.value)}
                bredde="M"
                maxLength={9}
            />
            <Søkeknapp onClick={() => props.endreSøk('bedriftNr', bedriftNr)} />
        </Filter>
    );
};
