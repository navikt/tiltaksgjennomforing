import { NavFrontendInputProps } from 'nav-frontend-skjema';
import React from 'react';
import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { fromFormatted } from '@/komponenter/form/utils/form-utils';

export const formaterKontonummer = (value: any): string => {
    if (!value) {
        return '';
    }
    return [value.substring(0, 4), value.substring(4, 6), value.substring(6, 11)].join(' ');
};

const KontonummerInput: React.FunctionComponent<NavFrontendInputProps> = props => {
    const validatorer = [
        (v: string) => {
            if (!v) {
                return { feilmelding: 'Feltet er påkrevd' };
            }
        },
        (v: string) => {
            if (v && fromFormatted(v).length !== 11) {
                return { feilmelding: 'Kontonummer må være 11 siffer' };
            }
        },
    ];
    return (
        <FormattedNumberInput
            validatorer={validatorer}
            toFormatted={formaterKontonummer}
            maxLength={11}
            minLength={11}
            {...props}
        />
    );
};

export default KontonummerInput;
