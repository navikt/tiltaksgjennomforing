import React, { FunctionComponent, useState } from 'react';
import { Avtale } from '@/types/avtale';
import { Select } from 'nav-frontend-skjema';
import { Søkekriterier } from '@/AvtaleOversikt/Filtrering/søkekriterier';

interface Props {
    endreSøk: (søkekriterier: Søkekriterier) => void;
}

const options: { verdi: keyof Avtale; tekst: string }[] = [
    { verdi: 'sistEndret', tekst: 'Sist endret' },
    { verdi: 'bedriftNavn', tekst: 'Bedrift' },
    { verdi: 'deltakerFornavn', tekst: 'Deltaker' },
    { verdi: 'opprettetTidspunkt', tekst: 'Opprettet' },
    { verdi: 'status', tekst: 'Status' },
];

const Sortering: FunctionComponent<Props> = props => {
    const [sorteringskolonne, setSorteringskolonne] = useState<keyof Avtale>('sistEndret');

    return (
        <Select
            label={'Sorter etter'}
            value={sorteringskolonne}
            onChange={event => {
                const nySorteringskolonne = event.target.value as keyof Avtale;
                setSorteringskolonne(nySorteringskolonne);
                props.endreSøk({ sorteringskolonne: nySorteringskolonne });
            }}
        >
            {options.map(o => (
                <option value={o.verdi} key={o.verdi}>
                    {o.tekst}
                </option>
            ))}
        </Select>
    );
};

export default Sortering;
