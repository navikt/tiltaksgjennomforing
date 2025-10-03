import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { parseFloatIfFloatable } from '@/utils';
import { TextFieldProps } from '@navikt/ds-react';
import React from 'react';

export const formaterValuta = (value: any, maximumFractionDigits: number = 0, useGrouping: boolean = false): string => {
    const numericValue = parseFloatIfFloatable(value);
    if (numericValue === undefined) {
        return '';
    }
    const formatter = new Intl.NumberFormat('no', {
        style: 'currency',
        currencyDisplay: 'symbol',
        currency: 'NOK',
        useGrouping: useGrouping,
        minimumFractionDigits: 0,
        maximumFractionDigits: maximumFractionDigits,
    });
    return formatter.format(numericValue);
};

type ValutaInputProps = React.PropsWithChildren<TextFieldProps> & {
    maximumFractionDigits?: number;
    useGrouping?: boolean;
    enableWheelStep?: boolean;
};

const ValutaInput: React.FunctionComponent<ValutaInputProps> = ({
    max,
    min,
    maximumFractionDigits,
    useGrouping,
    enableWheelStep,
    ...other
}) => {
    const validatorer = [
        (v: any) => {
            if (v === undefined || v === null || v === '') {
                return 'Feltet er påkrevd';
            }
        },
        (v: any) => {
            if (v && min && v < min) {
                return 'Må være over ' + formaterValuta(min, maximumFractionDigits, useGrouping);
            }
        },
        (v: any) => {
            if (v && max && v > max) {
                return 'Må være under ' + formaterValuta(max, maximumFractionDigits, useGrouping);
            }
        },
    ];

    return (
        <FormattedNumberInput
            validatorer={validatorer}
            toFormatted={(value) => formaterValuta(value, maximumFractionDigits, useGrouping)}
            enableWheelStep={enableWheelStep}
            max={max}
            min={min}
            {...other}
        />
    );
};

export default ValutaInput;
