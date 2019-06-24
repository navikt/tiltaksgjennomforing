import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { useState } from 'react';

type UsePaakrevd = (
    verdi: string,
    label: string,
    feilmelding?: string
) => [SkjemaelementFeil | undefined, () => void];

const usePaakrevd: UsePaakrevd = (verdi, label, feilmelding) => {
    const [feil, setFeil] = useState<SkjemaelementFeil | undefined>(undefined);

    const sjekkInputfelt = () => {
        if (!verdi) {
            setFeil({ feilmelding: feilmelding || label + ' er påkrevd' });
        } else {
            setFeil(undefined);
        }
        return verdi;
    };

    return [feil, sjekkInputfelt];
};

export default usePaakrevd;
