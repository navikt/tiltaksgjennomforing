import React, { PropsWithChildren } from 'react';
import { Radio } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import './radioPanel.less';

interface Properties {
    name?: string | undefined;
    value: any;
    checked?: boolean | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const RadioPanel: React.FC<Properties> = ({
    name,
    value,
    checked,
    onChange,
    children,
}: PropsWithChildren<Properties>) => {
    const cls = BEMHelper('radio-panel');

    return (
        <Radio
            value={value}
            name={name}
            checked={checked}
            onChange={onChange}
            className={cls.className + ' ' + cls.element(checked ? 'active' : 'non-active')}
        >
            {children}
        </Radio>
    );
};
export default RadioPanel;
