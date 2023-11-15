import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { Avtale, Avtaleinnhold, TilskuddsPeriode } from '@/types/avtale';
import { Select } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import { useFilterGammel } from './useFilterGammel';

export type Sorteringsverdi = keyof Avtale | keyof Avtaleinnhold | keyof TilskuddsPeriode;

const options: Array<{ verdi: Sorteringsverdi; tekst: string }> = [
    { verdi: 'opprettetTidspunkt', tekst: 'Opprettet' },
    { verdi: 'bedriftNavn', tekst: 'Bedrift' },
    { verdi: 'deltakerFornavn', tekst: 'Deltaker' },
    { verdi: 'status', tekst: 'Status' },
];

const SorteringGammel: FunctionComponent = (props) => {
    const { endreFilter, filtre } = useFilterGammel();
    const { rolle } = useContext(InnloggetBrukerContext);

    const leggtilSorteringstype = (key: Sorteringsverdi, value: string) => {
        if (!options.find((option) => option.verdi === key && option.tekst === value)) {
            options.push({ verdi: key, tekst: value });
        }
    };

    leggtilSorteringstype('startDato', 'Startdato');
    leggtilSorteringstype('sistEndret', 'Sist endret');
    leggtilSorteringstype('veilederNavIdent', 'Veileder');
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

export default SorteringGammel;
