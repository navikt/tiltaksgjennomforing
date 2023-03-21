import React from 'react';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import { RadioGroup } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import './radioPanelGruppeHorisontal.less';

export interface Radios {
    label: string;
    value: string;
}

interface Props {
    radios: Radios[];
    checked: string | undefined;
    name: string;
    onChange: (event: React.SyntheticEvent<EventTarget, Event>, value: any) => void;
    legend: string;
}

const RadioPanelGruppeHorisontal: React.FC<Props> = ({ radios, name, checked, onChange, legend }: Props) => {
    const cls = BEMHelper('horisontal-radio-gruppe');
    return (
        <div className={cls.className}>
            <RadioGroup legend={legend} className={cls.element('radio-gruppe')} value={checked}>
                {radios.map((radio: Radios) => (
                    <RadioPanel
                        value={radio.value}
                        name={name}
                        key={`${name}-${radio.value}`}
                        checked={checked === radio.value}
                        onChange={(event: React.SyntheticEvent<EventTarget>) => onChange(event, radio.value)}
                    >
                        {radio.label}
                    </RadioPanel>
                ))}
            </RadioGroup>
        </div>
    );
};

export default RadioPanelGruppeHorisontal;
