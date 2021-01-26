import { Input } from 'nav-frontend-skjema';
import React from 'react';
import useValidering from '@/komponenter/useValidering';

interface Props {
    className?: string;
    label: string;
    verdi?: string;
    feilmelding?: string;
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
            if (verdi && !/^\d{8}$/.test(verdi)) {
                return { feilmelding: 'Telefonnummer må bestå av 8 siffer' };
            }
        },
    ]);

    return (
        <Input
            bredde="S"
            label={props.label}
            value={props.verdi || ''}
            feil={feil}
            onChange={event => {
                const verdi = event.target.value.replace(/\D/g, '');
                props.settVerdi(verdi);
                setFeil(undefined);
            }}
            onBlur={sjekkInputfelt}
            type="tel"
            maxLength={8}
        />
    );
};

export default TelefonnummerInput;
