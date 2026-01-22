import React from 'react';
import SelectInput from '@/komponenter/form/SelectInput';
import { formaterNorskeTall, parseFloatIfFloatable } from '@/utils';
import { erNil } from '@/utils/predicates';

type FeriepengerProps = {
    sats?: number;
    onChange: (sats?: number) => void;
};

const Feriepenger: React.FC<FeriepengerProps> = (props: FeriepengerProps) => {
    const { sats, onChange } = props;
    const feriepengeAlternativer = (!erNil(sats) ? [] : [{ label: 'Velg', value: '' }]).concat(
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
            value={sats?.toString() ?? ''}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                onChange(parseFloatIfFloatable(event.target.value));
            }}
            children=""
        />
    );
};
export default Feriepenger;
