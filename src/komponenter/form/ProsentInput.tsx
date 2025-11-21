import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { formaterProsent } from '@/utils/formaterProsent';
import React, { PropsWithChildren } from 'react';
import { TextFieldProps } from '@navikt/ds-react';

const ProsentInput: React.FunctionComponent<TextFieldProps> = (props: PropsWithChildren<TextFieldProps>) => {
    const { step = 1, max, min, size, ...other } = props;
    const erTom = (v: any) => v === undefined || v === null || v === '';
    const validatorer = [
        (v: any) => {
            if (erTom(v)) return 'Feltet er påkrevd';
        },
        (v: any) => {
            if (!erTom(v) && min !== undefined && v < min) return 'Må være minst ' + formaterProsent(min);
        },
        (v: any) => {
            if (!erTom(v) && max !== undefined && v > max) return 'Kan være maks ' + formaterProsent(max);
        },
    ];

    return (
        <FormattedNumberInput
            size={size}
            step={step}
            validatorer={validatorer}
            maxLength={3}
            toFormatted={formaterProsent}
            max={max}
            min={min}
            {...other}
        />
    );
};

export default ProsentInput;
