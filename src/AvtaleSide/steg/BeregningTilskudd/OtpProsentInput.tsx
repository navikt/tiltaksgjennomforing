import React from 'react';
import { NavFrontendInputProps } from 'nav-frontend-skjema';
import { Input } from 'nav-frontend-skjema';

export const toFormattedProsent = (value: any, min?: number | string, max?: number | string): string => {
    if (!value || (min && value < min) || (max && value > max)) {
        return '2 %';
    }
    return `${value} %`;
};

const OtpProsentInput: React.FunctionComponent<NavFrontendInputProps> = props => {
    const { step = 1, value, max, min, maxLength, onChange, onBlur, ...other } = props;

    const onBlurOverride = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target instanceof HTMLInputElement) {
            event.target.type = 'text';
            event.target.value = toFormattedProsent(event.target.value, min, max);
            if (onBlur !== undefined) {
                onBlur(event);
            }
        }
    };

    const onChangeOverride = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValueAsNumeric = 0;
        if (event.target.value !== '') {
            inputValueAsNumeric = parseFloat(event.target.value);
        }

        const tallVerdiInnenMaxMin = max && min ? max >= inputValueAsNumeric && min <= inputValueAsNumeric : true;
        if (maxLength && inputValueAsNumeric.toString().length <= maxLength && tallVerdiInnenMaxMin) {
            if (onChange !== undefined) {
                onChange(event);
            }
        }
    };
    const inputRef = (ref: HTMLInputElement | null) => {
        if (ref && document.activeElement !== ref) {
            ref.type = 'text';
            ref.value = toFormattedProsent(ref.value);
        }
    };
    return (
        <Input
            inputRef={inputRef}
            value={value || ''}
            maxLength={2}
            max={max}
            min={min}
            onBlur={onBlurOverride}
            onChange={onChangeOverride}
            {...other}
        />
    );
};
export default OtpProsentInput;
