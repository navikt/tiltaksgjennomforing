import useValidering from '@/komponenter/useValidering';
import { Input } from 'nav-frontend-skjema';
import React, {useState} from 'react';

interface Props {
    className?: string;
    label: string;
    verdi?: string;
    feilmelding?: string;
    settVerdi: (verdi: string) => void;
}

const TelefonnummerInput: React.FunctionComponent<Props> = (props) => {
    const [telefonnummer, setTelefonnummer] = useState(props.verdi)
    const [feil, setFeil, sjekkInputfelt] = useValidering(props.verdi, [
        (verdi) => {
            if (!verdi) {
                return 'Telefonnummer er påkrevd';
            }
        },
        (verdi) => {
            if (verdi && !/^(\+47)?\d{8}$/.test(verdi)) { // Kan inneholde +47 og må ha 8 siffer
                return 'Ugyldig telefonnummer';
            }
        },
    ]);

    return (
        <Input
            bredde="S"
            label={props.label}
            value={telefonnummer || ''}
            feil={feil}
            onChange={(event) => {
                const verdi = event.target.value;

                setTelefonnummer(verdi)

                // fjerner landkode for å kun sende telefonnummeret til backend
                props.settVerdi(verdi.replace(/\+47/g, ''))
                setFeil(undefined);
            }}
            onBlur={sjekkInputfelt}
            maxLength={11}
        />
    );
};

export default TelefonnummerInput;
