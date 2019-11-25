import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Dispatch, SetStateAction, useState } from 'react';

type UseValidering = <T>(
    verdi: T,
    validatorer: Array<(verdi: T) => SkjemaelementFeil | undefined>
) => [SkjemaelementFeil | undefined, Dispatch<SetStateAction<SkjemaelementFeil | undefined>>, () => boolean];

const useValidering: UseValidering = (verdi, validatorer) => {
    const [feil, setFeil] = useState<SkjemaelementFeil | undefined>(undefined);

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
