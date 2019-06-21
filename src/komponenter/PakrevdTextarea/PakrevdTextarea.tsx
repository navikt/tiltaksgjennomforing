import { Textarea } from 'nav-frontend-skjema';
import React from 'react';
import usePaakrevd from '../usePaakrevd';

interface Props {
    className?: string;
    label: string;
    verdi: string;
    feilmelding?: string;
    maxLengde: number;
    // * onChange bør oppdatere verdi feltet på props
    onChange: (event: React.SyntheticEvent<EventTarget>) => void;
}

const PakrevdTextarea: React.FunctionComponent<Props> = props => {
    const [feil, sjekkInputfelt] = usePaakrevd(props.verdi, props.label);

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
            onBlur={sjekkInputfelt}
        />
    );
};

export default PakrevdTextarea;
