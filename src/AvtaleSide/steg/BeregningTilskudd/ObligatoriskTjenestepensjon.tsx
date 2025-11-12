import React, { useContext } from 'react';
import ProsentInput from '@/komponenter/form/ProsentInput';
import { AvtaleContext } from '@/AvtaleProvider';
import { formaterNorskeTall } from '@/utils';

const ObligatoriskTjenestepensjon: React.FC = () => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);
    return (
        <ProsentInput
            name="tjenestepensjon"
            label={'Obligatorisk tjenestepensjon'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            description={'Fra 0 - 30%'}
            value={
                avtale.gjeldendeInnhold.otpSats !== undefined && avtale.gjeldendeInnhold.otpSats !== null
                    ? formaterNorskeTall(avtale.gjeldendeInnhold.otpSats * 100)
                    : ''
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                settOgKalkulerBeregningsverdier({
                    otpSats: event.target.value === '' ? undefined : parseFloat(event.target.value) / 100,
                });
            }}
        />
    );
};
export default ObligatoriskTjenestepensjon;
