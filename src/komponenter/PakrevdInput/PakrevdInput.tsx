import usePaakrevd from '@/komponenter/usePaakrevd';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import React from 'react';

interface Props extends TextFieldProps {
    label: string;
    verdi: string | number | undefined;
    feilmelding?: string;
    settVerdi: (verdi: string) => void;
}

const PakrevdInput: React.FunctionComponent<Props> = (props) => {
    const { verdi, label, feilmelding, settVerdi, type } = props;
    const [feil, setFeil, sjekkInputfelt] = usePaakrevd(verdi ? verdi.toString() : '', label, feilmelding);

    return (
        <TextField
            label={label}
            value={props.verdi || ''}
            error={feil}
            onChange={(event) => {
                settVerdi(event.target.value);
                setFeil(undefined);
            }}
            onBlur={sjekkInputfelt}
            type={type || 'text'}
        />
    );
};

export default PakrevdInput;
