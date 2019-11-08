import * as React from 'react';
import { RadioPanel, RadioPanelGruppeProps, RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';

const RadioPanelGruppeHorisontal = (props: RadioPanelGruppeProps) => {
    const { radios, name, checked, onChange } = props;
    return (
        <div className="opprett-avtale__tiltakstypeWrapper">
            {radios.map((radio: RadioProps) => (
                <RadioPanel
                    name={name}
                    key={`${name}-${radio.value}`}
                    checked={checked === radio.value}
                    onChange={(event: React.SyntheticEvent<EventTarget>) => onChange(event, radio.value)}
                    {...radio}
                />
            ))}
        </div>
    );
};

export default RadioPanelGruppeHorisontal;
