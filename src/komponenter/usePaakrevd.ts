import { Dispatch, SetStateAction, useState } from 'react';

type UsePaakrevd = (
    verdi: string | undefined,
    label: string,
    feilmelding?: string
) => [string | undefined, Dispatch<SetStateAction<string | undefined>>, () => boolean];

const usePaakrevd: UsePaakrevd = (verdi, label, feilmelding) => {
    const [feil, setFeil] = useState<string | undefined>(undefined);

    const sjekkInputfelt = () => {
        if (!verdi) {
            setFeil(feilmelding || label + ' er påkrevd');
            return false;
        }
        setFeil(undefined);
        return true;
    };

    return [feil, setFeil, sjekkInputfelt];
};

export default usePaakrevd;
