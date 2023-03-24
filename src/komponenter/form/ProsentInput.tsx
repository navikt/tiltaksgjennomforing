import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { formatterProsent } from '@/utils/formatterProsent';
import React, { PropsWithChildren } from 'react';
import { TextFieldProps } from '@navikt/ds-react';

export interface InputProps extends TextFieldProps {
    width?: 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
    className?: string;
    feil?: React.ReactNode | boolean;
    id?: string;
    inputClassName?: string;
    inputRef?: ((element: HTMLInputElement | null) => any) | React.RefObject<HTMLInputElement>;
    description?: React.ReactNode;
    name?: string;
    mini?: boolean;
}

const ProsentInput: React.FunctionComponent<InputProps> = (props: PropsWithChildren<InputProps>) => {
    const { step = 1, max, min, size, ...other } = props;
    const validatorer = [
        (v: any) => {
            if (!v) {
                return 'Feltet er påkrevd';
            }
        },
        (v: any) => {
            if (v && min && v < min) {
                return 'Må være over ' + formatterProsent(min);
            }
        },
        (v: any) => {
            if (v && max && v > max) {
                return 'Må være under ' + formatterProsent(max);
            }
        },
    ];

    return (
        <FormattedNumberInput
            size={size}
            step={step}
            validatorer={validatorer}
            maxLength={3}
            toFormatted={formatterProsent}
            max={max}
            min={min}
            {...other}
        />
    );
};

export default ProsentInput;
