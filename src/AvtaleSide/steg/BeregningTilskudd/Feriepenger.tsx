import React, { useContext } from 'react';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import SelectInput from '@/komponenter/form/SelectInput';
import { parseFloatIfFloatable } from '@/utils';

interface Props {
    cls: BEMWrapper;
}
const Feriepenger: React.FC<Props> = ({ cls }: Props) => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    const feriepengeAlternativer = [{ label: 'Velg', value: '' }].concat(
        [0, 0.102, 0.12, 0.125, 0.143].map((sats: number) => ({
            label: (sats * 100).toFixed(1) + ' %',
            value: sats.toString(),
        })),
    );

    return (
        <Row className={cls.element('rad')}>
            <Column md="8" className={cls.element('feriepenger')}>
                <SelectInput
                    label="Sats for feriepenger"
                    name="feriepengesats"
                    size="medium"
                    options={feriepengeAlternativer}
                    value={avtale.gjeldendeInnhold.feriepengesats + ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        settOgKalkulerBeregningsverdier({ feriepengesats: parseFloatIfFloatable(event.target.value) });
                    }}
                    children=""
                />
            </Column>
        </Row>
    );
};
export default Feriepenger;
