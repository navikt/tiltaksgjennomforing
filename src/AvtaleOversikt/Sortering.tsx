import React, { FunctionComponent } from 'react';
import { Avtale } from '@/types/avtale';
import { Select } from 'nav-frontend-skjema';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

const options: { verdi: keyof Avtale; tekst: string }[] = [
    { verdi: 'sistEndret', tekst: 'Sist endret' },
    { verdi: 'bedriftNavn', tekst: 'Bedrift' },
    { verdi: 'deltakerFornavn', tekst: 'Deltaker' },
    { verdi: 'opprettetTidspunkt', tekst: 'Opprettet' },
    { verdi: 'status', tekst: 'Status' },
];

const Sortering: FunctionComponent = (props) => {
    const { endreFilter, filtre } = useFilter();

    return (
        <Select
            label={'Sorter etter'}
            value={filtre.sorteringskolonne || 'sistEndret'}
            onChange={(event) => {
                const nySorteringskolonne = event.target.value as keyof Avtale;
                endreFilter({ sorteringskolonne: nySorteringskolonne });
            }}
        >
            {options.map((o) => (
                <option value={o.verdi} key={o.verdi}>
                    {o.tekst}
                </option>
            ))}
        </Select>
    );
};

export default Sortering;
