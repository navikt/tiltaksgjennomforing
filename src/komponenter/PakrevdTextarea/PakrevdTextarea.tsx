import React, { useState } from 'react';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Textarea } from 'nav-frontend-skjema';

interface Props {
    className?: string;
    label: React.ReactNode;
    verdi: string;
    feilmelding?: string;
    maxLengde: number;
    // * onChange bør oppdatere verdi feltet på props
    onChange: (event: React.SyntheticEvent<EventTarget>) => void;
}

const PakrevdTextarea: React.FunctionComponent<Props> = props => {
    const [feil, setFeil] = useState<SkjemaelementFeil | undefined>(undefined);
    const visFeilmelding = props.feilmelding || props.label + ' er påkrevd';

    const onBlur = () => {
        if (!props.verdi) {
            setFeil({ feilmelding: visFeilmelding });
        } else {
            setFeil(undefined);
        }
    };

    const lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    return (
        <Textarea
            feil={feil}
            label={props.label}
            value={props.verdi || ''}
            onChange={props.onChange}
            maxLength={props.maxLengde}
            tellerTekst={lagTellerTekst}
            onBlur={onBlur}
        />
    );
};

export default PakrevdTextarea;
