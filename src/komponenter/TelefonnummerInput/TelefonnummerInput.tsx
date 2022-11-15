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
    const tlfRegex = /^((\+|00)47)?\d{8}$/ // Kan inneholde +47 eller 0047 og må ha 8 siffer
    const [feil, setFeil, sjekkInputfelt] = useValidering(props.verdi, [
        (verdi) => {
            if (!verdi) {
                return 'Telefonnummer er påkrevd';
            }
        },
        (verdi) => {
            if (verdi && !tlfRegex.test(verdi.replace(/\s/g, ''))) {
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
                const verdi = event.target.value
                    .replace(/[^ 0-9+]/g, '')  // Aksepter kun tall, space, og pluss tegn

                setTelefonnummer(verdi)

                // fjerner landkode for å kun sende telefonnummeret til backend
                props.settVerdi(verdi
                    .replace(/\s/g, '')
                    .replace(/\+47/g, '')
                    .replace(/^0047/g, '')
                )
                setFeil(undefined);
            }}
            onBlur={sjekkInputfelt}
            maxLength={23}
        />
    );
};

export default TelefonnummerInput;
