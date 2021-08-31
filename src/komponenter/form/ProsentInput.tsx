import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { formatterProsent } from '@/utils/formatterProsent';
import { InputProps } from 'nav-frontend-skjema';
import React from 'react';

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
            toFormatted={formatterProsent}
            max={max}
            min={min}
            {...other}
        />
    );
};

export default ProsentInput;
