import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { OptionProps } from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { TilskuddPeriodeStatus } from '@/types/avtale';
import { Radio } from 'nav-frontend-skjema';
import React, { Fragment, FunctionComponent } from 'react';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

const TilskuddPeriodeStatusFilter: FunctionComponent = (props) => {
    const { endreFilter, filtre } = useFilter();

    const alleTilskuddPeriodeStatus: OptionProps[] = [
        { value: 'UBEHANDLET', label: 'Ubehandlet' },
        { value: 'GODKJENT', label: 'Godkjent' },
        { value: 'AVSLÅTT', label: 'Avslått' },
    ];

    return (
        <Filter tittel="Status">
            {alleTilskuddPeriodeStatus.map((tilskuddPeriodeStatus) => (
                <Fragment key={tilskuddPeriodeStatus.label}>
                    <Radio
                        id={tilskuddPeriodeStatus.label}
                        label={tilskuddPeriodeStatus.label}
                        name={'tilskuddPeriodeStatus'}
                        value={tilskuddPeriodeStatus.value}
                        checked={
                            tilskuddPeriodeStatus.value === filtre.tilskuddPeriodeStatus ||
                            (filtre.tilskuddPeriodeStatus === undefined && tilskuddPeriodeStatus.value === 'UBEHANDLET')
                        }
                        onChange={(event) => {
                            const nyTilskuddPeriode = event.currentTarget.value as TilskuddPeriodeStatus;
                            endreFilter({ tilskuddPeriodeStatus: nyTilskuddPeriode });
                        }}
                        role="radio"
                        aria-labelledby={tilskuddPeriodeStatus.label}
                    />
                    <VerticalSpacer rem={1} />
                </Fragment>
            ))}
        </Filter>
    );
};

export default TilskuddPeriodeStatusFilter;
