import React, { PropsWithChildren } from 'react';
import { Radio } from '@navikt/ds-react';

interface Properties extends React.InputHTMLAttributes<HTMLInputElement> {
    key?: string;
    name?: string | undefined;
    value: any;
    checked?: boolean | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const RadioPanel: React.FC<Properties> = ({
    key,
    name,
    value,
    checked,
    onChange,
    children,
}: PropsWithChildren<Properties>) => {
    return (
        <Radio key={key} value={value} name={name} checked={checked} onChange={onChange}>
            {children}
        </Radio>
    );
};
export default RadioPanel;
