import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { avtaleStatusTekst } from '@/messages';
import { AvtaleStatus } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import React, { Fragment, FunctionComponent } from 'react';
import { useFilter } from '@/AvtaleOversikt/NyFiltrering/useFilter';

type SokeType = AvtaleStatus | '';

const StatusFilter: FunctionComponent = () => {
    const [filtre, setFilter] = useFilter();

    const alleStatuser: SokeType[] = [
        '',
        'PÅBEGYNT',
        'MANGLER_GODKJENNING',
        'KLAR_FOR_OPPSTART',
        'GJENNOMFØRES',
        'AVSLUTTET',
        'AVBRUTT',
        'ANNULLERT',
    ];

    return (
        <Filter tittel="Status">
            {alleStatuser.map((s) => (
                <Fragment key={s}>
                    <Radio
                        label={s === '' ? 'Alle statuser' : avtaleStatusTekst[s]}
                        name={'status'}
                        value={s}
                        checked={s === filtre.status || s === "" && filtre.status === undefined}
                        onChange={(event) => {
                            const nyStatus = event.currentTarget.value as SokeType;
                            setFilter({ status: nyStatus || '' });
                        }}
                        role="radio"
                    />
                    <VerticalSpacer rem={1} />
                </Fragment>
            ))}
        </Filter>
    );
};

export default StatusFilter;
