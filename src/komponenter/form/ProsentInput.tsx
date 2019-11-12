import { NavFrontendInputProps } from 'nav-frontend-skjema';
import React from 'react';
import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';

const precision = (a: number) => {
    if (!isFinite(a)) {
        return 0;
    }
    let e = 1;
    let p = 0;
    while (Math.round(a * e) / e !== a) {
        e *= 10;
        p++;
    }
    return p;
};
export const formaterProsent = (value: any): string => {
    const numericValue = parseFloat(value) / 100;
    if (!value || !numericValue) {
        return '';
    }
    const formatter = new Intl.NumberFormat('no-bok', {
        style: 'percent',
        minimumFractionDigits: precision(1),
    });
    return formatter.format(numericValue);
};

const ProsentInput: React.FunctionComponent<NavFrontendInputProps> = props => {
    const { step = 1, max, min, ...other } = props;
    const validatorer = [
        (v: any) => {
            if (!v) {
                return { feilmelding: 'Feltet er påkrevd' };
            }
        },
        (v: any) => {
            if (v && min && v < min) {
                return { feilmelding: 'Må være over ' + formaterProsent(min) };
            }
        },
        (v: any) => {
            if (v && max && v > max) {
                return { feilmelding: 'Må være under ' + formaterProsent(max) };
            }
        },
    ];

    return (
        <FormattedNumberInput
            step={step}
            validatorer={validatorer}
            toFormatted={formaterProsent}
            max={max}
            min={min}
            {...other}
        />
    );
};

export default ProsentInput;
