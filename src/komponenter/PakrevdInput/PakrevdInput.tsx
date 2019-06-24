import { Input } from 'nav-frontend-skjema';
import React, { ChangeEvent } from 'react';
import usePaakrevd from '../usePaakrevd';

interface Props {
    className?: string;
    label: string;
    verdi: string;
    feilmelding?: string;
    inputType?: string;
    settVerdi: (verdi: string) => void;
}

const PakrevdInput: React.FunctionComponent<Props> = props => {
    const [feil, sjekkInputfelt] = usePaakrevd(props.verdi, props.label);

    return (
        <Input
            label={props.label}
            value={props.verdi || ''}
            feil={feil}
            onChange={event => props.settVerdi(event.target.value)}
            onBlur={sjekkInputfelt}
            className={props.className}
            type={props.inputType || 'text'}
        />
    );
};

export default PakrevdInput;
