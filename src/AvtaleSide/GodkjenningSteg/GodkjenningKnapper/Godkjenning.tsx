import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { useState } from 'react';
import * as React from 'react';
import ApiError from '../../../api-error';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '../../../komponenter/LagreKnapp/LagreKnapp';
import { Avtale } from '../../avtale';
import './Godkjenning.less';

interface Props {
    avtale: Avtale;
    endreGodkjenning: (godkjent: boolean) => Promise<any>;
}

const Godkjenning = (props: Props) => {
    const [bekreftet, setBekreftet] = useState(false);

    return (
        <Innholdsboks>
            <Systemtittel className="godkjenningknapper__tittel">
                Godkjenn avtalen
            </Systemtittel>
            <Normaltekst>
                Når du godkjenner godtar du kravene fra NAV
            </Normaltekst>
            <BekreftCheckboksPanel
                label="Ja, jeg forstår kravene og godkjenner innholdet i avtalen"
                checked={bekreftet}
                onChange={() => setBekreftet(!bekreftet)}
            />
            <LagreKnapp
                lagre={() => {
                    if (bekreftet) {
                        return props.endreGodkjenning(true);
                    } else {
                        throw new ApiError('Må bekrefte innholdet i avtalen');
                    }
                }}
                label="Godkjenn avtalen"
            />
        </Innholdsboks>
    );
};

export default Godkjenning;
