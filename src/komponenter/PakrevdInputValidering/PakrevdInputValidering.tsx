import React, { ChangeEvent, useState } from 'react';
import { TextField, TextFieldProps } from '@navikt/ds-react';

interface Props extends TextFieldProps {
    validering: RegExp;
    verdi: string | undefined;
    label: string;
    description?: string;
    feilmelding?: string;
    feilmeldingOnBlur?: string;
    settVerdi: (verdi: string) => void;
}

const PakrevdInputValidering: React.FunctionComponent<Props> = (props) => {
    const { verdi, label, feilmelding, settVerdi, validering, type, description } = props;
    const validate = (sjekkVerdi: string) => validering.test(sjekkVerdi);
    const [feil, setFeil] = useState<string | undefined>(undefined);

    const sjekkInputfelt = () => {
        if (!verdi) {
            setFeil(feilmelding || (label ?? ' ') + ' er påkrevd');
            return false;
        }
        setFeil(undefined);
        return true;
    };

    return (
        <TextField
            label={label}
            value={props.verdi || ''}
            error={feil}
            description={description}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (validate(event.target.value)) {
                    settVerdi(event.target.value);
                    if (feil) setFeil(undefined);
                    return;
                }
                setFeil(feilmelding || '');
            }}
            onBlur={sjekkInputfelt}
            type={type || 'text'}
        />
    );
};
export default PakrevdInputValidering;
