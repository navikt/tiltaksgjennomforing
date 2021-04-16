import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import { avtaleStatusTekst } from '@/messages';
import { AvtaleStatus } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import * as React from 'react';
import { FunctionComponent, useContext, useState } from 'react';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';

type SokeType = AvtaleStatus | '';

const StatusFilter: FunctionComponent<FiltreringProps> = props => {
    const [valgtStatus, setValgtStatus] = useState<SokeType>('');
    const featureToggleContext = useContext(FeatureToggleContext);
    const annullerAvtaleToggle = featureToggleContext[Feature.AnnullerAvtale];

    const alleStatuser: SokeType[] = [
        '',
        'PÅBEGYNT',
        'MANGLER_GODKJENNING',
        'KLAR_FOR_OPPSTART',
        'GJENNOMFØRES',
        'AVSLUTTET',
        'AVBRUTT',
    ];

    if (annullerAvtaleToggle) {
        alleStatuser.push('ANNULLERT');
    }

    return (
        <Filter tittel="Status">
            {alleStatuser.map(s => (
                <Radio
                    key={s}
                    label={s === '' ? 'Alle' : avtaleStatusTekst[s]}
                    name={'status'}
                    value={s}
                    checked={s === valgtStatus}
                    onChange={event => {
                        const nyStatus = event.currentTarget.value as SokeType;
                        setValgtStatus(nyStatus);
                        props.endreSøk({ status: nyStatus || undefined });
                    }}
                    role="radio"
                    aria-labelledby="filtere på oppgave status"
                />
            ))}
        </Filter>
    );
};

export default StatusFilter;
