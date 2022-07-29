import { RadioPanel, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import * as React from 'react';

const RadioPanelGruppeHorisontal = (props: RadioPanelGruppeProps) => {
    const { radios, name, checked, onChange } = props;
    return (
        <div className="opprett-avtale__horisontalGruppeWrapper">
            {radios.map((radio) => (
                <RadioPanel
                    {...radio}
                    name={name}
                    key={`${name}-${radio.value}`}
                    checked={checked === radio.value}
                    onChange={(event: React.SyntheticEvent<EventTarget>) => onChange(event, radio.value)}
                />
            ))}
        </div>
    );
};

export default RadioPanelGruppeHorisontal;
