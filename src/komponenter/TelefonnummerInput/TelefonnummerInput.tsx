import { Input } from 'nav-frontend-skjema';
import React from 'react';
import useValidering from '../useValidering';

interface Props {
    className?: string;
    label: string;
    verdi: string;
    feilmelding?: string;
    inputType?: string;
    settVerdi: (verdi: string) => void;
}

const TelefonnummerInput: React.FunctionComponent<Props> = props => {
    const [feil, setFeil, sjekkInputfelt] = useValidering(props.verdi, [
        verdi => {
            if (!verdi) {
                return { feilmelding: 'Telefonnummer er påkrevd' };
            }
        },
        verdi => {
            if (!/^\d{8}$/.test(verdi)) {
                return { feilmelding: 'Telefonnummer må bestå av 8 siffer' };
            }
        },
    ]);

    return (
        <Input
            label={props.label}
            value={props.verdi || ''}
            feil={feil}
            onChange={event => {
                const verdi = event.target.value.replace(/\D/g, '');
                props.settVerdi(verdi);
                setFeil(undefined);
            }}
            onBlur={sjekkInputfelt}
            className={props.className}
            type="tel"
        />
    );
};

export default TelefonnummerInput;
