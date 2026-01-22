import React from 'react';
import ProsentInput from '@/komponenter/form/ProsentInput';
import { formaterNorskeTall } from '@/utils';

type ObligatoriskTjenestepensjonProps = {
    sats?: number;
    onChange: (sats?: number) => void;
};

const ObligatoriskTjenestepensjon: React.FC<ObligatoriskTjenestepensjonProps> = (
    props: ObligatoriskTjenestepensjonProps,
) => {
    const { sats, onChange } = props;

    return (
        <ProsentInput
            name="tjenestepensjon"
            label={'Obligatorisk tjenestepensjon'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            description={'Fra 0 - 30%'}
            value={sats !== undefined && sats !== null ? formaterNorskeTall(sats * 100) : ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange(event.target.value === '' ? undefined : parseFloat(event.target.value) / 100);
            }}
        />
    );
};
export default ObligatoriskTjenestepensjon;
