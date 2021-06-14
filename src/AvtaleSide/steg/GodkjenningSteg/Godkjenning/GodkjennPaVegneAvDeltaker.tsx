import { Checkbox } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';

const GodkjennPaVegneAvDeltaker: FunctionComponent = () => {

    const [godkjennPaVegneAvDeltaker, setGodkjennPaVegneAvDeltaker] = useState(false);
    const godkjennPaVegneLabel = godkjennPaVegneAvDeltaker
        ? 'Jeg skal godkjenne på vegne av deltakeren, fordi deltakeren'
        : 'Jeg skal godkjenne på vegne av deltakeren'; 

    return (
        <div>
            <Checkbox
                label={godkjennPaVegneLabel}
                checked={godkjennPaVegneAvDeltaker}
                onChange={() => setGodkjennPaVegneAvDeltaker(!godkjennPaVegneAvDeltaker)}
            />

            {godkjennPaVegneAvDeltaker && (
                <CheckboxGruppe legend="Hvor vil du sitte?">
                <Checkbox label={"Bakerst"} />
                <Checkbox label={"Midten"} />
                <Checkbox label={"Fremst"} />
              </CheckboxGruppe>;
            )}
        </div>
    );
};

export default GodkjennPaVegneAvDeltaker;
