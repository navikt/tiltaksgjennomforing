import React, { useState, ChangeEvent } from 'react';
import { Input } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

interface Props {
    className?: string;
    label: React.ReactNode;
    verdi: string;
    feilmelding?: string;
    inputType?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PakrevdInput: React.FunctionComponent<Props> = props => {
    const [feilInputFelt, setFeilInputFelt] = useState<
        SkjemaelementFeil | undefined
    >(undefined);
    const { feilmelding, label, verdi, className, inputType } = props;

    const visFeilmelding = feilmelding || label + ' er påkrevd';

    const sjekkInputfelt = () => {
        if (feilmelding) {
            setFeilInputFelt({ feilmelding: props.feilmelding });
        } else if (!verdi) {
            setFeilInputFelt({ feilmelding: visFeilmelding });
        } else {
            setFeilInputFelt(undefined);
        }
    };

    return (
        <Input
            label={label}
            value={verdi || ''}
            feil={feilInputFelt}
            onChange={props.onChange}
            onBlur={sjekkInputfelt}
            className={className}
            type={inputType ? inputType : 'text'}
        />
    );
};

export default PakrevdInput;
