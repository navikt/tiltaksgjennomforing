import React from 'react';
import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { parseFloatIfFloatable } from '@/utils';
import { isEmptyValue } from '@/komponenter/form/utils/form-utils';
import { TextFieldProps } from '@navikt/ds-react';

export const formaterValuta = (value: any, maximumFractionDigits: number = 0, useGrouping: boolean = false): string => {
    const numericValue = parseFloatIfFloatable(value);
    if (numericValue === undefined) {
        return '';
    }
    const formatter = new Intl.NumberFormat('nb-NO', {
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
    readOnly,
    ...other
}) => {
    const validatorer = React.useMemo(() => {
        if (readOnly) return [];

        const toNumber = (v: any): number | undefined => parseFloatIfFloatable(v);

        return [
            (v: any) => {
                if (isEmptyValue(v)) return 'Feltet er påkrevd';
                if (toNumber(v) === undefined) return 'Ugyldig tallformat';
            },
            (v: any) => {
                const n = toNumber(v);
                if (n !== undefined && min != null && n < Number(min)) {
                    return 'Må være over ' + formaterValuta(min, maximumFractionDigits, useGrouping);
                }
            },
            (v: any) => {
                const n = toNumber(v);
                if (n !== undefined && max != null && n > Number(max)) {
                    return 'Må være under ' + formaterValuta(max, maximumFractionDigits, useGrouping);
                }
            },
        ];
    }, [readOnly, min, max, maximumFractionDigits, useGrouping]);

    const toFormatted = React.useCallback(
        (value: any) => formaterValuta(value, maximumFractionDigits, useGrouping),
        [maximumFractionDigits, useGrouping],
    );

    return (
        <FormattedNumberInput
            validatorer={validatorer}
            toFormatted={toFormatted}
            enableWheelStep={enableWheelStep}
            max={max}
            min={min}
            readOnly={readOnly}
            {...other}
        />
    );
};

export default ValutaInput;
