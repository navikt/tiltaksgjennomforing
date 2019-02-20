import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useState } from 'react';
import ApiError from '../../../api-error';
import { Rolle } from '../../../AvtaleContext';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '../../../komponenter/LagreKnapp/LagreKnapp';
import { Avtale } from '../../avtale';
import ArbeidsgiverInstruks from '../ArbeidsgiverInstruks';
import DeltakerInstruks from '../DeltakerInstruks';
import './Godkjenning.less';

interface Props {
    avtale: Avtale;
    rolle: Rolle;
    endreGodkjenning: (godkjent: boolean) => Promise<any>;
}

const Godkjenning = (props: Props) => {
    const [bekreftet, setBekreftet] = useState(false);

    const instruks = (() => {
        switch (props.rolle) {
            case 'DELTAKER':
                return <DeltakerInstruks />;
            case 'ARBEIDSGIVER':
                return <ArbeidsgiverInstruks />;
            case 'VEILEDER':
                return <div />;
        }
    })();

    return (
        <Innholdsboks className="godkjenning">
            <Systemtittel className="godkjenning__tittel">
                Godkjenn avtalen
            </Systemtittel>
            {instruks}
            <BekreftCheckboksPanel
                label="Ja, jeg forstår kravene og godkjenner innholdet i avtalen"
                checked={bekreftet}
                onChange={() => setBekreftet(!bekreftet)}
            />
            <div>
                <LagreKnapp
                    lagre={() => {
                        if (bekreftet) {
                            return props.endreGodkjenning(true);
                        } else {
                            throw new ApiError(
                                'Må bekrefte innholdet i avtalen'
                            );
                        }
                    }}
                    label="Godkjenn avtalen"
                />
            </div>
        </Innholdsboks>
    );
};

export default Godkjenning;
