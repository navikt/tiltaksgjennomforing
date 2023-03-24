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
    const { options, value, ...other } = props;
    return (
        <Select value={value ?? ''} {...other}>
            {options.map((attr: OptionProps, index: number) => (
                <React.Fragment key={index}>
                    <option key={attr.value ?? ''} {...attr}>
                        {attr.label}
                    </option>
                </React.Fragment>
            ))}
        </Select>
    );
};

export default SelectInput;
