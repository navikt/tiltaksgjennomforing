import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { NavFrontendInputProps } from 'nav-frontend-skjema';
import React, { useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

export const formaterProsent = (value: any): string => {
    if (!value) {
        return '';
    }
    return `${value} %`;
};

const ProsentInput: React.FunctionComponent<NavFrontendInputProps> = props => {
    const erNavAnsatt = useContext(InnloggetBrukerContext).erNavAnsatt;
    const { step = 1, max, min, ...other } = props;
    const validatorer = [
        (v: any) => {
            if (!v) {
                return { feilmelding: 'Feltet er påkrevd' };
            }
        },
        (v: any) => {
            if (v && min && v < min) {
                return { feilmelding: 'Må være over ' + formaterProsent(min) };
            }
        },
        (v: any) => {
            if (v && max && v > max) {
                return { feilmelding: 'Må være under ' + formaterProsent(max) };
            }
        },
    ];

    return (
        <FormattedNumberInput
            step={step}
            validatorer={validatorer}
            toFormatted={formaterProsent}
            max={max}
            min={min}
            disabled={!erNavAnsatt}
            {...other}
        />
    );
};

export default ProsentInput;
