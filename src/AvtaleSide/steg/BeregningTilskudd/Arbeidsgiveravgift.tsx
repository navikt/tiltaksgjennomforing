import React from 'react';
import SelectInput from '@/komponenter/form/SelectInput';
import { formaterNorskeTall, parseFloatIfFloatable } from '@/utils';

type ArbeidsgiveravgiftProps = {
    sats: number | undefined;
    onChange: (sats: number | undefined) => void;
};

const Arbeidsgiveravgift: React.FC<ArbeidsgiveravgiftProps> = ({ sats, onChange }) => {
    const arbeidsgiveravgiftAlternativer = (() => {
        const satser = [0, 0.051, 0.064, 0.079, 0.106, 0.141];
        const hasValue = sats !== null && sats !== undefined;

        const satserVerdier = hasValue ? [] : [{ label: 'Velg', value: '' }];
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
            value={sats?.toString() ?? ''}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                onChange(parseFloatIfFloatable(event.target.value));
            }}
        />
    );
};
export default Arbeidsgiveravgift;
