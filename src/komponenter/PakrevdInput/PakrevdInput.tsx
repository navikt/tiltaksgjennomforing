import usePaakrevd from '@/komponenter/usePaakrevd';
import { Input, InputProps } from 'nav-frontend-skjema';
import React from 'react';

interface Props extends InputProps {
    label: string;
    verdi: string | number | undefined;
    feilmelding?: string;
    settVerdi: (verdi: string) => void;
}

const PakrevdInput: React.FunctionComponent<Props> = (props) => {
    const { verdi, label, feilmelding, settVerdi, type, onChange, ...other } = props;
    const [feil, setFeil, sjekkInputfelt] = usePaakrevd(verdi ? verdi.toString() : '', label, feilmelding);
    return (
        <Input
            label={label}
            value={props.verdi || ''}
            feil={feil}
            onChange={(event) => {
                settVerdi(event.target.value);
                setFeil(undefined);
            }}
            onBlur={sjekkInputfelt}
            type={type || 'text'}
            {...other}
        />
    );
};

export default PakrevdInput;
