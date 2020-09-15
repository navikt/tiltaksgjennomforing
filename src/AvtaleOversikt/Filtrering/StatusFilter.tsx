import * as React from 'react';
import { FunctionComponent, useContext, useState } from 'react';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/Filtrering';
import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { Radio } from 'nav-frontend-skjema';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';

const StatusFilter: FunctionComponent<FiltreringProps> = props => {
    const [valgtStatus, setValgtStatus] = useState('');
    const featureToggleContext = useContext(FeatureToggleContext);
    const arbeidsgiverOppretterToggle = featureToggleContext[Feature.ArbeidsgiverOppretter];

    const statuser: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'PÅBEGYNT', label: 'Påbegynt' },
        { value: 'MANGLER_GODKJENNING', label: 'Mangler godkjenning' },
        { value: 'KLAR_FOR_OPPSTART', label: 'Klar for oppstart' },
        { value: 'GJENNOMFØRES', label: 'Gjennomføres' },
        { value: 'AVSLUTTET', label: 'Avsluttet' },
        { value: 'AVBRUTT', label: 'Avbrutt' },
    ];

    if (arbeidsgiverOppretterToggle) {
        statuser.splice(1, 0, { value: 'UTKAST', label: 'Utkast' });
    }

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
