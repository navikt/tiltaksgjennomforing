import usePaakrevd from '@/komponenter/usePaakrevd';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import React, { PropsWithChildren } from 'react';

interface Props extends TextFieldProps {
    label: string;
    verdi: string | number | undefined;
    feilmelding?: string;
    settVerdi: (verdi: string) => void;
    size?: 'medium' | 'small';
}

const PakrevdInput: React.FunctionComponent<Props> = (props: PropsWithChildren<Props>) => {
    const { verdi, label, feilmelding, settVerdi, type, size, ...restProps } = props;
    const [feil, setFeil, sjekkInputfelt] = usePaakrevd(verdi ? verdi.toString() : '', label, feilmelding);

    return (
        <TextField
            size={size}
            label={label}
            value={props.verdi || ''}
            error={feil || feilmelding}
            onChange={(event) => {
                settVerdi(event.target.value);
                setFeil(undefined);
            }}
            onBlur={sjekkInputfelt}
            type={type || 'text'}
            {...restProps}
        />
    );
};

export default PakrevdInput;
