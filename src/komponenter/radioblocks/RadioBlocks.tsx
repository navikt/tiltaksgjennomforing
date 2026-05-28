import { Radio, RadioGroup, Stack } from '@navikt/ds-react';
import { radioBlock, checked } from './radioBlocks.module.less';
import classNames from 'classnames';

type Key = string;
type Value = string;
interface Values {
    [key: Key]: Value;
}

export interface Properties {
    legend: string;
    values: Values;
    selectedValue?: Value;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    direction: 'column' | 'row';
    error?: React.ReactNode;
}

const RadioBlocks: React.FC<Properties> = ({
    legend,
    values,
    selectedValue,
    onChange,
    direction,
    error,
}: Properties) => {
    return (
        <RadioGroup legend={legend} error={error} value={selectedValue}>
            <Stack gap="space-12" direction={{ xs: 'column', sm: direction }} wrap={false}>
                {Object.entries(values).map(([value, description]) => (
                    <Radio
                        key={value}
                        value={value}
                        onChange={onChange}
                        checked={selectedValue === value}
                        className={classNames(radioBlock, selectedValue === value && checked)}
                    >
                        {description}
                    </Radio>
                ))}
            </Stack>
        </RadioGroup>
    );
};
export default RadioBlocks;
