import React from 'react';
import ProsentInput, { Props as ProsentInputProps } from '@/komponenter/form/ProsentInput';

interface Props extends Omit<ProsentInputProps, 'label' | 'name' | 'min' | 'maks' | 'desimaler' | 'prosentType'> {
    label?: React.ReactNode;
}

function StillingsprosentInput(props: Props) {
    const { label, ...restProps } = props;
    return (
        <ProsentInput
            {...restProps}
            label={label ?? 'Stillingsprosent'}
            name="stillingsprosent"
            prosentType="heltall"
            min={0.1}
            maks={100}
            desimaler
        />
    );
}

export default StillingsprosentInput;
