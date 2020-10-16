import { RadioPanel, RadioPanelGruppeProps, RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';

const RadioPanelGruppeHorisontal = (props: RadioPanelGruppeProps & { disabled?: boolean }) => {
    const { radios, name, checked, onChange, disabled } = props;
    return (
        <div className="opprett-avtale__tiltakstypeWrapper">
            {radios.map((radio: RadioProps) => (
                <RadioPanel
                    disabled={disabled}
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
