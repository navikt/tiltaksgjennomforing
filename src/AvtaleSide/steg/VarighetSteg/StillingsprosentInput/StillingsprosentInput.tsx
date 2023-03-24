import useValidering from '@/komponenter/useValidering';
import { TextField } from '@navikt/ds-react';

interface Props {
    label: string;
    verdi?: number;
    settVerdi: (verdi: number) => void;
    size?: 'medium' | 'small';
}

const StillingsprosentInput = (props: Props) => {
    const [feil, setFeil, validerStillingsprosent] = useValidering(props.verdi, [
        (verdi) => {
            if (!verdi) {
                return 'Stillingsprosent er påkrevd';
            }
        },
        (verdi) => {
            if (verdi! <= 0 || verdi! > 100) {
                return 'Stillingsprosent må være mellom 1 og 100';
            }
        },
    ]);

    return (
        <TextField
            error={feil}
            label={props.label}
            value={props.verdi || ''}
            onChange={(event) => {
                const verdi = event.target.value;
                if (/^\d{0,3}$/.test(verdi)) {
                    props.settVerdi(Number(verdi));
                    setFeil(undefined);
                }
            }}
            onBlur={validerStillingsprosent}
            size={props.size}
        />
    );
};

export default StillingsprosentInput;
