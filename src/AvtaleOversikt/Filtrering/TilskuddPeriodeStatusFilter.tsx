import { Filter } from '@/AvtaleOversikt/Filtrering/Filter';
import { OptionProps } from '@/komponenter/form/SelectInput';
import { TilskuddPeriodeStatus } from '@/types/avtale';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useFilterGammel } from './GammelFiltrering/useFilterGammel';

const TilskuddPeriodeStatusFilter: FunctionComponent = () => {
    const { endreFilter, filtre } = useFilterGammel();

    const alleTilskuddPeriodeStatus: OptionProps[] = [
        { value: 'ALLE', label: 'Alle' },
        { value: 'UBEHANDLET', label: 'Ubehandlet' },
        { value: 'GODKJENT', label: 'Godkjent' },
        { value: 'AVSLÅTT', label: 'Returnert' },
    ];

    return (
        <Filter tittel="Status">
            <RadioGroup
                legend=""
                size="small"
                value={filtre.tilskuddPeriodeStatus || (filtre.tilskuddPeriodeStatus === undefined && 'ALLE')}
            >
                {alleTilskuddPeriodeStatus.map((tilskuddPeriodeStatus: OptionProps) => (
                    <Radio
                        key={tilskuddPeriodeStatus.value}
                        id={tilskuddPeriodeStatus.label}
                        name={'tilskuddPeriodeStatus'}
                        value={tilskuddPeriodeStatus.value}
                        onChange={(event) => {
                            const value = event.currentTarget.value;
                            endreFilter({
                                tilskuddPeriodeStatus: value !== 'ALLE' ? (value as TilskuddPeriodeStatus) : undefined,
                            });
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
