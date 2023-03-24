import usePaakrevd from '@/komponenter/usePaakrevd';
import classNames from 'classnames';
import { Textarea } from '@navikt/ds-react';
import React from 'react';
import './PakrevdTextarea.less';

interface Props {
    label: string;
    labelledby?: string;
    placeholder?: string;
    verdi?: string;
    feilmelding?: string;
    maxLengde: number;
    settVerdi: (verdi: string) => void;
    className?: string;
    disabled?: boolean;
}

const PakrevdTextarea: React.FunctionComponent<Props> = (props) => {
    const [feil, setFeil, sjekkInputfelt] = usePaakrevd(props.verdi, props.label, props.feilmelding);

    return (
        <Textarea
            aria-label={props.label}
            aria-labelledby={props.labelledby}
            disabled={props.disabled}
            placeholder={props.placeholder}
            error={feil}
            label={props.label}
            value={props.verdi || ''}
            onChange={(event: any) => {
                if (event.target.value.length <= props.maxLengde) {
                    props.settVerdi(event.target.value);
                    setFeil(undefined);
                }
            }}
            maxLength={props.maxLengde}
            onBlur={sjekkInputfelt}
            className={classNames('pakrevd-textarea', props.className)}
            role="textbox"
        />
    );
};

export default PakrevdTextarea;
