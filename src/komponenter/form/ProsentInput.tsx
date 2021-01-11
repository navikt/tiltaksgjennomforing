import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { NavFrontendInputProps } from 'nav-frontend-skjema';
import React from 'react';
import { formatterProsent } from '@/utils/formatterProsent';

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
                return { feilmelding: 'Må være over ' + formatterProsent(min) };
            }
        },
        (v: any) => {
            if (v && max && v > max) {
                return { feilmelding: 'Må være under ' + formatterProsent(max) };
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
