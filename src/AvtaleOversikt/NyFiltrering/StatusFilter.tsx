import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { avtaleStatusTekst } from '@/messages';
import { AvtaleStatus } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import React, { Fragment, FunctionComponent } from 'react';
import { useFilter } from '@/AvtaleOversikt/NyFiltrering/useFilter';

const StatusFilter: FunctionComponent = () => {
    const {filtre, endreFilter} = useFilter();

    const alleStatuser: AvtaleStatus[] = [
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
            <Radio
                label={"Alle"}
                name={'status'}
                value={""}
                checked={filtre.status === undefined}
                onChange={() => {
                    endreFilter({ status: undefined});
                }}
                role="radio"
            />
            {alleStatuser.map((s) => (
                <Fragment key={s}>
                    <Radio
                        label={avtaleStatusTekst[s]}
                        name={'status'}
                        value={s}
                        checked={s === filtre.status}
                        onChange={(event) => {
                            const nyStatus = event.currentTarget.value as AvtaleStatus;
                            endreFilter({ status: nyStatus});
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
