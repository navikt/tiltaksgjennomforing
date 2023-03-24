import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { TilskuddPeriodeStatus } from '@/types/avtale';
import { Radio, RadioGroup } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

const TilskuddPeriodeStatusFilter: FunctionComponent = () => {
    const { endreFilter, filtre } = useFilter();

    const alleTilskuddPeriodeStatus: OptionProps[] = [
        { value: 'UBEHANDLET', label: 'Ubehandlet' },
        { value: 'GODKJENT', label: 'Godkjent' },
        { value: 'AVSLÅTT', label: 'Avslått' },
    ];

    return (
        <Filter tittel="Status">
            <RadioGroup
                legend=""
                size="small"
                value={filtre.tilskuddPeriodeStatus || (filtre.tilskuddPeriodeStatus === undefined && 'UBEHANDLET')}
            >
                {alleTilskuddPeriodeStatus.map((tilskuddPeriodeStatus: OptionProps, index: number) => (
                    <Radio
                        key={index}
                        id={tilskuddPeriodeStatus.label}
                        name={'tilskuddPeriodeStatus'}
                        value={tilskuddPeriodeStatus.value}
                        onChange={(event) => {
                            const nyTilskuddPeriode = event.currentTarget.value as TilskuddPeriodeStatus;
                            endreFilter({ tilskuddPeriodeStatus: nyTilskuddPeriode });
                        }}
                        role="radio"
                        aria-labelledby={tilskuddPeriodeStatus.label}
                    >
                        {tilskuddPeriodeStatus.label}
                    </Radio>
                ))}
            </RadioGroup>
        </Filter>
    );
};

export default TilskuddPeriodeStatusFilter;
