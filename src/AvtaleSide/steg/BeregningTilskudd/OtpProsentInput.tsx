import React from 'react';
import { useState } from 'react';
import { NavFrontendInputProps } from 'nav-frontend-skjema';
import { Input } from 'nav-frontend-skjema';

export const toFormattedProsent = (value: any): string => `${value} %`;
export const toLimit = (value: any, min?: number | string, max?: number | string): number => {
    if (!value || (min && value < min) || (max && value > max)) {
        return min !== undefined ? parseFloat(min.toString()) : 2.0;
    }
    return value;
};

interface OtpProsentPros extends NavFrontendInputProps {
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: number | string | undefined;
    name: string;
    max: number;
    min: number;
    label: string;
}

const OtpProsentInput: React.FunctionComponent<OtpProsentPros> = props => {
    const { value, max, min, onChange, onBlur, ...other } = props;
    const [verdi, setVerdi] = useState(toLimit(value) * 100);

    const onBlurOverride = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value === '') {
            event.target.value = toFormattedProsent(min);
            setVerdi(min);
        } else {
            event.target.value = toFormattedProsent(toLimit(parseFloat(event.target.value), min, max));
        }
        onBlur(event);
    };

    const inputRef = (ref: HTMLInputElement | null) => {
        if (ref && document.activeElement !== ref) {
            ref.type = 'text';
            ref.value = toFormattedProsent(toLimit(parseFloat(ref.value), min, max));
        }
    };

    const onChangeOverride = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputVtallet = event.target.value;
        const validereTallMellom0og30 = new RegExp(
            /^(([0-9]{1})|([0-2]{1})([0-9]{1})?|30$)?([,|.]{1})?(([,|.]{1}?)([0-9]{1,2}))?$/g
        );
        if (inputVtallet.match(validereTallMellom0og30)) {
            setVerdi(parseFloat(event.target.value));
            onChange(event);
        }
    };
    return (
        <Input
            onBlur={onBlurOverride}
            inputRef={inputRef}
            value={verdi || 0}
            max={max}
            type="number"
            placeholder={'0% - 30%'}
            min={min}
            onChange={onChangeOverride}
            {...other}
        />
    );
};
export default OtpProsentInput;
