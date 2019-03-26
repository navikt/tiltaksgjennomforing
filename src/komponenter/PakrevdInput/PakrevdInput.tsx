import React, { useState, ChangeEvent } from 'react';
import { Input } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

interface Props {
    className?: string;
    label: React.ReactNode;
    verdi: string;
    feilmelding?: string;
    ekstraValidering?: boolean;
    inputType?: string;
    validatePhoneNr?: boolean;
    // * onChange bør oppdatere verdi feltet på props
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PakrevdInput: React.FunctionComponent<Props> = props => {
    const [feil, setFeil] = useState<SkjemaelementFeil | undefined>(undefined);
    const {
        feilmelding,
        label,
        ekstraValidering,
        verdi,
        className,
        inputType,
        validatePhoneNr,
    } = props;

    const phoneRegex = /^\+?\.?\d{0,12}$/;
    const visFeilmelding = feilmelding || label + ' er påkrevd';

    const onBlur = () => {
        if (ekstraValidering && feilmelding) {
            setFeil({ feilmelding: props.feilmelding });
        } else {
            if (!verdi) {
                setFeil({ feilmelding: visFeilmelding });
            } else {
                setFeil(undefined);
            }
        }
    };

    const validatePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
        if (phoneRegex.test(event.target.value)) {
            props.onChange(event);
        }
    };

    return (
        <Input
            label={label}
            value={verdi || ''}
            feil={feil}
            onChange={validatePhoneNr ? validatePhoneNumber : props.onChange}
            onBlur={onBlur}
            className={className}
            type={inputType ? inputType : 'text'}
        />
    );
};

export default PakrevdInput;
