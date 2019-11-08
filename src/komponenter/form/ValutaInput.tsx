import { NavFrontendInputProps } from 'nav-frontend-skjema';
import React from 'react';
import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';

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

const ValutaInput: React.FunctionComponent<NavFrontendInputProps> = props => {
    const { max, min, ...other } = props;
    const validatorer = [
        (v: any) => {
            if (!v) {
                return { feilmelding: 'Feltet er påkrevd' };
            }
        },
        (v: any) => {
            if (v && min && v < min) {
                return { feilmelding: 'Må være over ' + formaterValuta(min) };
            }
        },
        (v: any) => {
            if (v && max && v > max) {
                return { feilmelding: 'Må være under ' + formaterValuta(max) };
            }
        },
    ];

    return (
        <FormattedNumberInput validatorer={validatorer} toFormatted={formaterValuta} max={max} min={min} {...other} />
    );
};

export default ValutaInput;
