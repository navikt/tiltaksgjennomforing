import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Dispatch, SetStateAction, useState } from 'react';

type UsePaakrevd = (
    verdi: string | undefined,
    label: string,
    feilmelding?: string
) => [SkjemaelementFeil | undefined, Dispatch<SetStateAction<SkjemaelementFeil | undefined>>, () => boolean];

const usePaakrevd: UsePaakrevd = (verdi, label, feilmelding) => {
    const [feil, setFeil] = useState<SkjemaelementFeil | undefined>(undefined);

    const sjekkInputfelt = () => {
        if (!verdi) {
            setFeil({ feilmelding: feilmelding || label + ' er påkrevd' });
            return false;
        }
        setFeil(undefined);
        return true;
    };

    return [feil, setFeil, sjekkInputfelt];
};

export default usePaakrevd;
