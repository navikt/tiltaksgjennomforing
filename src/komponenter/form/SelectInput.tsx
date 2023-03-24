import React, { PropsWithChildren } from 'react';
import { Select, SelectProps } from '@navikt/ds-react';

export interface OptionProps {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value: string;
}

export interface SelectInputProps extends SelectProps {
    options: OptionProps[];
}

const SelectInput: React.FunctionComponent<SelectInputProps> = (props: PropsWithChildren<SelectInputProps>) => {
    const { options, ...other } = props;
    return (
        <Select {...other}>
            {options.map((attr) => (
                <option key={attr.value} {...attr}>
                    {attr.label}
                </option>
            ))}
        </Select>
    );
};

export default SelectInput;
