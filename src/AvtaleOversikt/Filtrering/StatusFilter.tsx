import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { FiltreringProps } from '@/AvtaleOversikt/Filtrering/VeilederFiltrering';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { avtaleStatusTekst } from '@/messages';
import { AvtaleStatus } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import React, { Fragment, FunctionComponent, useState } from 'react';

type SokeType = AvtaleStatus | '';

const StatusFilter: FunctionComponent<FiltreringProps> = (props) => {
    const [valgtStatus, setValgtStatus] = useState<SokeType>('');

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
                        checked={s === valgtStatus}
                        onChange={(event) => {
                            const nyStatus = event.currentTarget.value as SokeType;
                            setValgtStatus(nyStatus);
                            props.endreSøk({ status: nyStatus || undefined });
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
