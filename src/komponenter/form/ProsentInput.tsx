import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { formatterProsent } from '@/utils/formatterProsent';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    bredde?: 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
    className?: string;
    feil?: React.ReactNode | boolean;
    id?: string;
    inputClassName?: string;
    inputRef?: ((element: HTMLInputElement | null) => any) | React.RefObject<HTMLInputElement>;
    label?: React.ReactNode;
    description?: React.ReactNode;
    name?: string;
    mini?: boolean;
}

const ProsentInput: React.FunctionComponent<InputProps> = (props) => {
    const { step = 1, max, min, ...other } = props;
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
