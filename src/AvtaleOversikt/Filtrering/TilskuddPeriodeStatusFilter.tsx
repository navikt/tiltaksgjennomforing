import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { TilskuddPeriodeStatus } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';

const TilskuddPeriodeStatusFilter: FunctionComponent<FiltreringProps> = props => {
    const [valgtTilskuddPeriodeStatus, setValgtTilskuddPeriodeStatus] = useState<TilskuddPeriodeStatus | ''>(
        'UBEHANDLET'
    );

    const alleTilskuddPeriodeStatus: OptionProps[] = [
        { value: 'UBEHANDLET', label: 'Ubehandlet' },
        { value: 'GODKJENT', label: 'Godkjent' },
        { value: 'AVSLÅTT', label: 'Avslått' },
    ];

    return (
        <Filter tittel="Status">
            {alleTilskuddPeriodeStatus.map(tilskuddPeriodeStatus => (
                <Radio
                    id={tilskuddPeriodeStatus.label}
                    key={tilskuddPeriodeStatus.label}
                    label={tilskuddPeriodeStatus.label}
                    name={'tilskuddPeriodeStatus'}
                    value={tilskuddPeriodeStatus.value}
                    checked={tilskuddPeriodeStatus.value === valgtTilskuddPeriodeStatus}
                    onChange={event => {
                        const nyTilskuddPeriode = event.currentTarget.value as TilskuddPeriodeStatus;
                        setValgtTilskuddPeriodeStatus(nyTilskuddPeriode);
                        props.endreSøk({ tilskuddPeriodeStatus: nyTilskuddPeriode });
                    }}
                    role="radio"
                    aria-labelledby={tilskuddPeriodeStatus.label}
                />
            ))}
        </Filter>
    );
};

export default TilskuddPeriodeStatusFilter;
