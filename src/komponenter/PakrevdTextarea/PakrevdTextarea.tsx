import usePaakrevd from '@/komponenter/usePaakrevd';
import { Textarea } from 'nav-frontend-skjema';
import React from 'react';
import './PakrevdTextarea.less';

interface Props {
    label: string;
    placeholder?: string;
    verdi: string;
    feilmelding?: string;
    maxLengde: number;
    settVerdi: (verdi: string) => void;
}

const PakrevdTextarea: React.FunctionComponent<Props> = props => {
    const [feil, setFeil, sjekkInputfelt] = usePaakrevd(props.verdi, props.label, props.feilmelding);

    const lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    return (
        <Textarea
            placeholder={props.placeholder}
            feil={feil}
            label={props.label}
            value={props.verdi || ''}
            onChange={(event: any) => {
                if (event.target.value.length <= props.maxLengde) {
                    props.settVerdi(event.target.value);
                    setFeil(undefined);
                }
            }}
            maxLength={props.maxLengde}
            tellerTekst={lagTellerTekst}
            onBlur={sjekkInputfelt}
            textareaClass={'pakrevd-textarea'}
        />
    );
};

export default PakrevdTextarea;
