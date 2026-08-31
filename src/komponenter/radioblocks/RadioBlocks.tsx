import { Radio, RadioGroup, Stack } from '@navikt/ds-react';
import { radioBlock, checked, isDisabled } from './radioBlocks.module.less';
import classNames from 'classnames';

type Key = string;
type Value = string;
interface Values {
    [key: Key]: Value;
}

interface Properties {
    legend: string;
    values: Values;
    selectedValue?: Value;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    direction: 'column' | 'row';
    error?: React.ReactNode;
    disabled?: boolean;
}

const RadioBlocks: React.FC<Properties> = ({
    legend,
    values,
    selectedValue,
    onChange,
    direction,
    error,
    disabled,
}: Properties) => {
    return (
        <RadioGroup legend={legend} error={error} value={selectedValue}>
            <Stack gap="space-12" direction={{ xs: 'column', sm: direction }} wrap={false}>
                {Object.entries(values).map(([value, description]) => (
                    <Radio
                        key={value}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        checked={selectedValue === value}
                        className={classNames(radioBlock, selectedValue === value && checked, disabled && isDisabled)}
                    >
                        {description}
                    </Radio>
                ))}
            </Stack>
        </RadioGroup>
    );
};
export default RadioBlocks;
