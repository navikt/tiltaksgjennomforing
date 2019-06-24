import { Input } from 'nav-frontend-skjema';
import React, { ChangeEvent } from 'react';
import useValidering from '../useValidering';

interface Props {
    className?: string;
    label: string;
    verdi: string;
    feilmelding?: string;
    inputType?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PakrevdInput: React.FunctionComponent<Props> = props => {
    const [feil, setFeil, sjekkInputfelt] = useValidering(props.verdi, [
        verdi => {
            if (!verdi) {
                return { feilmelding: `${props.label} er påkrevd` };
            }
        },
    ]);

    return (
        <Input
            label={props.label}
            value={props.verdi || ''}
            feil={feil}
            onChange={props.onChange}
            onBlur={sjekkInputfelt}
            className={props.className}
            type={props.inputType || 'text'}
        />
    );
};

export default PakrevdInput;
