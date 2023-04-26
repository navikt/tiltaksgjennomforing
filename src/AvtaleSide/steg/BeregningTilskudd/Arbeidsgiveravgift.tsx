import React, { useContext } from 'react';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import SelectInput from '@/komponenter/form/SelectInput';
import { parseFloatIfFloatable } from '@/utils/lonnstilskuddUtregningUtils';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';

interface Props {
    cls: BEMWrapper;
}

const Arbeidsgiveravgift: React.FC<Props> = ({ cls }: Props) => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    const arbeidsgiveravgiftAlternativer = (() => {
        const satser = [0.141, 0.106, 0.064, 0.051, 0.079, 0];
        const satserVerdier = [{ label: 'Velg', value: '' }];
        satser.forEach((sats: number) =>
            satserVerdier.push({
                label: (sats * 100).toFixed(1) + ' %',
                value: sats.toString(),
            })
        );
        return satserVerdier;
    })();

    return (
        <Row className={cls.element('rad')}>
            <Column md="8" className={cls.element('arbeidsgiveravgift')}>
                <SelectInput
                    name="arbeidsgiveravgift"
                    options={arbeidsgiveravgiftAlternativer}
                    label="Sats for arbeidsgiveravgift"
                    size="medium"
                    children=""
                    value={avtale.gjeldendeInnhold.arbeidsgiveravgift}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        settOgKalkulerBeregningsverdier({
                            arbeidsgiveravgift: parseFloatIfFloatable(event.target.value),
                        })
                    }
                />
            </Column>
        </Row>
    );
};
export default Arbeidsgiveravgift;
