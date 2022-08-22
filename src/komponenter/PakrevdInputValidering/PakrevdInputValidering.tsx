import React, { ChangeEvent, useState } from 'react';
import { Input, InputProps } from 'nav-frontend-skjema';

interface Props extends InputProps {
    validering: RegExp;
    verdi: string | undefined;
    label: string;
    feilmelding?: string;
    feilmeldingOnBlur?: string;
    settVerdi: (verdi: string) => void;
}

const PakrevdInputValidering: React.FunctionComponent<Props> = (props) => {
    const { verdi, label, feilmelding, settVerdi, validering, type, onChange, ...other } = props;
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
        <Input
            label={label}
            value={props.verdi || ''}
            feil={feil}
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
            {...other}
        />
    );
};
export default PakrevdInputValidering;
