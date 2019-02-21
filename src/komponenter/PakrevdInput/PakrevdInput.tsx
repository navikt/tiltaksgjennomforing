import React, { useState, ChangeEvent } from 'react';
import { Input } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

interface Props {
    className?: string;
    label: React.ReactNode;
    verdi: string;
    feilmelding?: string;
    // * onChange bør oppdatere verdi feltet på props
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PakrevdInput: React.FunctionComponent<Props> = props => {
    const [feil, setFeil] = useState<SkjemaelementFeil | undefined>(undefined);
    const visFeilmelding = props.feilmelding || props.label + ' er påkrevd';

    const onBlur = () => {
        if (!props.verdi) {
            setFeil({ feilmelding: visFeilmelding });
        } else {
            setFeil(undefined);
        }
    };

    return (
        <Input
            label={props.label}
            value={props.verdi || ''}
            feil={feil}
            onChange={props.onChange}
            onBlur={onBlur}
            className={props.className}
        />
    );
};

export default PakrevdInput;
