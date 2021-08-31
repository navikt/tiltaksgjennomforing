import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { InputProps } from 'nav-frontend-skjema';
import React from 'react';

export const formaterValuta = (value: any): string => {
    const numericValue = parseFloat(value);
    if (!numericValue) {
        return '';
    }
    const formatter = new Intl.NumberFormat('no', {
        style: 'currency',
        currencyDisplay: 'symbol',
        currency: 'NOK',
        useGrouping: false,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return formatter.format(numericValue);
};

const ValutaInput: React.FunctionComponent<InputProps> = (props) => {
    const { max, min, ...other } = props;
    const validatorer = [
        (v: any) => {
            if (!v) {
                return 'Feltet er påkrevd';
            }
        },
        (v: any) => {
            if (v && min && v < min) {
                return 'Må være over ' + formaterValuta(min);
            }
        },
        (v: any) => {
            if (v && max && v > max) {
                return 'Må være under ' + formaterValuta(max);
            }
        },
    ];

    return (
        <FormattedNumberInput validatorer={validatorer} toFormatted={formaterValuta} max={max} min={min} {...other} />
    );
};

export default ValutaInput;
