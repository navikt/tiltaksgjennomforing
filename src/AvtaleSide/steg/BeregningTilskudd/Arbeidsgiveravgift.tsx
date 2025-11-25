import React, { useContext } from 'react';
import SelectInput from '@/komponenter/form/SelectInput';
import { formaterNorskeTall, parseFloatIfFloatable } from '@/utils';
import { AvtaleContext } from '@/AvtaleProvider';

const Arbeidsgiveravgift: React.FC = () => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    const arbeidsgiveravgiftAlternativer = (() => {
        const satser = [0, 0.051, 0.064, 0.079, 0.106, 0.141];
        const satserVerdier = [{ label: 'Velg', value: '' }];
        satser.forEach((sats: number) =>
            satserVerdier.push({
                label: formaterNorskeTall(sats * 100) + ' %',
                value: sats.toString(),
            }),
        );
        return satserVerdier;
    })();

    return (
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
    );
};
export default Arbeidsgiveravgift;
