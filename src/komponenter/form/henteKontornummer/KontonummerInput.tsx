import FormattedNumberInput from '@/komponenter/form/FormattedNumberInput';
import { fromFormatted } from '@/komponenter/form/utils/form-utils';
import { TextFieldProps } from '@navikt/ds-react';
import React, { PropsWithChildren } from 'react';

export const formaterKontonummer = (value: any): string => {
    if (!value) {
        return '';
    }
    return [value.substring(0, 4), value.substring(4, 6), value.substring(6, 11)].join(' ');
};

interface KontonummerInputProps extends TextFieldProps {
    className?: string;
    feil?: React.ReactNode | boolean;
    id?: string;
    inputClassName?: string;
    inputRef?: ((element: HTMLInputElement | null) => any) | React.RefObject<HTMLInputElement>;
    description?: React.ReactNode;
    name?: string;
    mini?: boolean;
}

const KontonummerInput: React.FunctionComponent<TextFieldProps> = (props: PropsWithChildren<KontonummerInputProps>) => {
    const validatorer = [
        (v: string) => {
            if (!v) {
                return 'Feltet er påkrevd';
            }
        },
        (v: string) => {
            if (v && fromFormatted(v).length !== 11) {
                return 'Kontonummer må være 11 siffer';
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
