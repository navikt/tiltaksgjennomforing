import { Dispatch, SetStateAction, useState } from 'react';

type UseValidering = <T>(
    verdi: T,
    validatorer: Array<(verdi: T) => string | undefined>
) => [string | undefined, Dispatch<SetStateAction<string | undefined>>, () => boolean];

const useValidering: UseValidering = (verdi, validatorer) => {
    const [feil, setFeil] = useState<string | undefined>(undefined);

    const sjekkInputfelt = () => {
        for (const validator of validatorer) {
            const feilFraValidator = validator(verdi);
            if (feilFraValidator) {
                setFeil(feilFraValidator);
                return false;
            }
        }
        setFeil(undefined);
        return true;
    };

    return [feil, setFeil, sjekkInputfelt];
};

export default useValidering;
