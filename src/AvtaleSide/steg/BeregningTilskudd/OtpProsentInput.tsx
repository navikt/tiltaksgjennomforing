import React from 'react';
import { NavFrontendInputProps } from 'nav-frontend-skjema';
import { Input } from 'nav-frontend-skjema';

export const toFormattedProsent = (value: any): string => {
    return `${value * 100} %`;
};

export const toLimit = (value: any, min?: number | string, max?: number | string): number => {
    if (!value || (min && value < min) || (max && value > max)) {
        return 2.0;
    }
    return value;
};

const OtpProsentInput: React.FunctionComponent<NavFrontendInputProps> = props => {
    const { value, max, min, onChange, onBlur, ...other } = props;

    const onBlurOverride = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.value = toFormattedProsent(toLimit(event.target.value, min, max));
        if (onBlur !== undefined) {
            onBlur(event);
        }
    };

    const onChangeOverride = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange !== undefined) {
            onChange(event);
        }
    };

    const inputRef = (ref: HTMLInputElement | null) => {
        if (ref && document.activeElement !== ref) {
            ref.type = 'text';
            ref.value = toFormattedProsent(toLimit(ref.value, min, max));
        }
    };

    return (
        <Input
            inputRef={inputRef}
            value={value || ''}
            max={max}
            min={min}
            type="number"
            onBlur={onBlurOverride}
            onChange={onChangeOverride}
            {...other}
        />
    );
};
export default OtpProsentInput;
