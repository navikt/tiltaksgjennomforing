import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { avtaleStatusTekst } from '@/messages';
import { AvtaleStatus } from '@/types/avtale';
import { Radio, RadioGroup } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

type SokeType = AvtaleStatus | '';

const StatusFilter: FunctionComponent = () => {
    const { endreFilter, filtre } = useFilter();

    const alleStatuser: SokeType[] = [
        '',
        'PÅBEGYNT',
        'KLAR_FOR_OPPSTART',
        'GJENNOMFØRES',
        'AVSLUTTET',
        'AVBRUTT',
        'ANNULLERT',
    ];

    return (
        <Filter tittel="Status">
            <RadioGroup legend="" style={{ marginBottom: '0' }} size="small" value={filtre.status || ''}>
                {alleStatuser.map((soketype: SokeType, index: number) => (
                    <Radio
                        key={index}
                        name={'status'}
                        value={soketype}
                        onChange={(event) => {
                            const nyStatus = event.currentTarget.value as SokeType;
                            endreFilter({ status: nyStatus || undefined });
                        }}
                        role="radio"
                    >
                        {soketype === '' && <>Alle</>}
                        {soketype === 'PÅBEGYNT' && <>Påbegynt/Mangler godkjenning</>}
                        {soketype === 'KLAR_FOR_OPPSTART' && <>Klar for oppstart</>}
                        {soketype === 'GJENNOMFØRES' && <>Gjennomføres</>}
                        {soketype === 'AVSLUTTET' && <>Avsluttet</>}
                        {soketype === 'AVBRUTT' && <>Avbrutt</>}
                        {soketype === 'ANNULLERT' && <>Annullert</>}
                    </Radio>
                ))}
            </RadioGroup>
        </Filter>
    );
};

export default StatusFilter;
