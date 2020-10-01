import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/Filtrering';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import { Radio } from 'nav-frontend-skjema';

const StatusFilter: FunctionComponent<FiltreringProps> = props => {
    const [valgtStatus, setValgtStatus] = useState('');

    const statuser: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'PÅBEGYNT', label: 'Påbegynt' },
        { value: 'MANGLER_GODKJENNING', label: 'Mangler godkjenning' },
        { value: 'KLAR_FOR_OPPSTART', label: 'Klar for oppstart' },
        { value: 'GJENNOMFØRES', label: 'Gjennomføres' },
        { value: 'AVSLUTTET', label: 'Avsluttet' },
        { value: 'AVBRUTT', label: 'Avbrutt' },
    ];

    return (
        <Filter tittel="Status">
            {statuser.map(s => (
                <Radio
                    key={s.label}
                    label={s.label}
                    name={'status'}
                    value={s.value}
                    checked={s.value === valgtStatus}
                    onChange={event => {
                        const nyStatus = event.currentTarget.value;
                        setValgtStatus(nyStatus);
                        props.endreSøk({ status: nyStatus });
                    }}
                />
            ))}
        </Filter>
    );
};

export default StatusFilter;
