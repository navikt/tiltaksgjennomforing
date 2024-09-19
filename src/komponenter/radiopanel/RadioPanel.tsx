import React, { PropsWithChildren } from 'react';
import { Radio } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import './radioPanel.less';

export interface Properties {
    className?: string;
    name?: string | undefined;
    value: any;
    checked?: boolean | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    disabled?: boolean | undefined;
}

const RadioPanel: React.FC<PropsWithChildren<Properties>> = ({
    className,
    name,
    value,
    checked,
    onChange,
    children,
    disabled,
}: PropsWithChildren<Properties>) => {
    const cls = BEMHelper('radio-panel');

    return (
        <Radio
            value={value}
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={cls.className + ' ' + cls.element(checked ? 'active' : 'non-active') + ' ' + className}
        >
            {children}
        </Radio>
    );
};
export default RadioPanel;
