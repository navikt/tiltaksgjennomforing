import React, { useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import SelectInput from '@/komponenter/form/SelectInput';
import { formaterNorskeTall, parseFloatIfFloatable } from '@/utils';

const Feriepenger: React.FC = () => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    const feriepengeAlternativer = [{ label: 'Velg', value: '' }].concat(
        [0, 0.102, 0.12, 0.125, 0.143].map((sats: number) => ({
            label: formaterNorskeTall(sats * 100) + ' %',
            value: sats.toString(),
        })),
    );

    return (
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
    );
};
export default Feriepenger;
