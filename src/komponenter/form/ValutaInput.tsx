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

const truncateDecimals = (raw: string, max: number): string => {
    if (!raw.includes('.')) return raw;
    const [i, d] = raw.split('.');
    if (max <= 0) return i;
    const truncated = d.slice(0, max).replace(/0+$/, '');
    return truncated ? `${i}.${truncated}` : i;
};

const roundDecimals = (raw: string, max: number): string => {
    if (max <= 0) return raw.split('.')[0]; // no decimals
    const num = Number(raw);
    if (!Number.isFinite(num)) return raw;
    const fixed = num.toFixed(max); // rounded
    return fixed
        .replace(/(\.\d*?[1-9])0+$/, '$1') // remove trailing zeros after last non-zero
        .replace(/\.0+$/, '') // remove .000...
        .replace(/\.$/, ''); // safety: remove lone dot
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

    const normalizeOnBlur = React.useCallback(
        //(raw: string) => truncateDecimals(raw, maximumFractionDigits),
        (raw: string) => roundDecimals(raw, maximumFractionDigits),
        [maximumFractionDigits],
    );

    return (
        <FormattedNumberInput
            validatorer={validatorer}
            toFormatted={toFormatted}
            enableWheelStep={enableWheelStep}
            max={max}
            min={min}
            readOnly={readOnly}
            normalizeOnBlur={normalizeOnBlur}
            {...other}
        />
    );
};

export default ValutaInput;
