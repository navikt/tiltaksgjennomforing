import { Checkbox, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import BEMHelper from '@/utils/bem';
import './CheckboxMedInput.less';
import { InkluderingsInnhold } from '@/types/avtale';

const cls = BEMHelper('checkboxMedInput');

interface Props {
    inputLabel: string;
    inputValue: (value: InkluderingradProps) => void;
    checkboxLabel: string;
}

const CheckboxMedInput: FunctionComponent<Props> = ({ inputLabel, inputValue, checkboxLabel }) => {
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState();


    const reg = new RegExp('^[0-9]+$');

    return (
        <SkjemaGruppe feil={false}>
            <Checkbox className={cls.element('checkbox')} onClick={() => setChecked(!checked)} label={checkboxLabel} />
            {checked && (
                <Input
                    className={cls.element('input')}
                    label={inputLabel}
                    value={value}
                    disabled={false}
                    onBlur={(event) => inputValue(parseFloat(event.target.value))}
                />
            )}
        </SkjemaGruppe>
    );
};

export default CheckboxMedInput;
