import React, { InputHTMLAttributes, PropsWithChildren, useState } from 'react';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import './bekreftCheckboksPanel.less';

interface Properties extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'> {
    legend: React.ReactNode;
    checked?: boolean | undefined;
    error?: boolean;
    errorId?: string;
    children: React.ReactNode;
    hideLabel?: boolean;
    value?: any;
    indeterminate?: boolean;
    description?: string;
    size?: 'medium' | 'small';
    disabled?: boolean;
    id?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

type Signed = 'signed' | '';

const BekreftCheckboksPanel: React.FC<Properties> = ({
    legend,
    size,
    checked,
    onChange,
    children,
}: PropsWithChildren<Properties>) => {
    const cls = BEMHelper('bekreft-checkboks-panel');
    const [signed, setSigned] = useState<Signed[]>(['']);

    return (
        <div className={cls.className + ' ' + cls.element(checked ? 'checked' : 'non-checked')}>
            <CheckboxGroup legend={legend} size={size} value={signed} onChange={(value: any[]) => setSigned(value)}>
                <Checkbox className={cls.element('bekreftelse')} onChange={onChange} value="signed">
                    {children}
                </Checkbox>
            </CheckboxGroup>
        </div>
    );
};
export default BekreftCheckboksPanel;
