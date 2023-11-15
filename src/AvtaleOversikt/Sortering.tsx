import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import { Avtale, Avtaleinnhold, TilskuddsPeriode } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import { Select } from '@navikt/ds-react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

type Sorteringsverdi = keyof Avtale | keyof Avtaleinnhold | keyof TilskuddsPeriode;

const options: Array<{ verdi: Sorteringsverdi; tekst: string }> = [
    { verdi: 'opprettetTidspunkt', tekst: 'Opprettet' },
    { verdi: 'bedriftNavn', tekst: 'Bedrift' },
    { verdi: 'deltakerFornavn', tekst: 'Deltaker' },
    { verdi: 'status', tekst: 'Status' },
];

const Sortering: FunctionComponent = (props) => {
    const { endreFilter, filtre } = useFilter();
    const { rolle } = useContext(InnloggetBrukerContext);

    const leggtilSorteringstype = (key: Sorteringsverdi, value: string) => {
        if (!options.find((option) => option.verdi === key && option.tekst === value)) {
            options.push({ verdi: key, tekst: value });
        }
    };

    leggtilSorteringstype('startDato', 'Startdato');
    leggtilSorteringstype('sistEndret', 'Sist endret');
    if (rolle === 'BESLUTTER') leggtilSorteringstype('tiltakstype', 'Tiltakstype');

    const defaultValg = rolle === 'BESLUTTER' ? 'startDato' : 'sistEndret';

    return (
        <Select
            label={'Sorter etter'}
            value={filtre.sorteringskolonne || defaultValg}
            onChange={(event) => {
                const nySorteringskolonne = event.target.value as keyof Avtale;
                console.log('nySorteringskolonne', nySorteringskolonne);
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
