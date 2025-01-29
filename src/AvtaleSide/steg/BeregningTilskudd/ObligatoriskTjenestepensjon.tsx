import React, { useContext } from 'react';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import ProsentInput from '@/komponenter/form/ProsentInput';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import { formaterNorskeTall } from '@/utils';

interface Props {
    cls: BEMWrapper;
}

const ObligatoriskTjenestepensjon: React.FC<Props> = ({ cls }: Props) => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);
    return (
        <Row className={cls.element('rad')}>
            <Column md="8" className={cls.element('tjenestepensjon')}>
                <ProsentInput
                    name="tjenestepensjon"
                    label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
                    min={0}
                    max={30}
                    maxLength={4}
                    autoComplete={'off'}
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
            </Column>
        </Row>
    );
};
export default ObligatoriskTjenestepensjon;
