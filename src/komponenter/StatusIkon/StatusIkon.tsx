import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as GjennomforesIkon } from '@/assets/ikoner/gjennomfores.svg';
import { ReactComponent as InaktivIkon } from '@/assets/ikoner/inaktiv.svg';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/stop.svg';
import { ReactComponent as ProblemIkon } from '@/assets/ikoner/varsel.svg';
import { Rolle } from '@/AvtaleContext';
import React, { CSSProperties, FunctionComponent } from 'react';

interface Props {
    status: string;
    rolle?: Rolle;
    godkjentAvInnloggetBruker?: boolean;
    andrePartnerHarGodkjent?: boolean;
    className?: string;
    style?: CSSProperties;
}

const StatusIkon: FunctionComponent<Props> = props => {
    switch (props.status) {
        case 'Påbegynt':
            return <PabegyntIkon style={props.style} />;
        case 'Klar for oppstart':
            return <CheckIkon style={props.style} />;
        case 'Mangler godkjenning':
            if (props.godkjentAvInnloggetBruker || (props.rolle === 'VEILEDER' && !props.andrePartnerHarGodkjent)) {
                return <PabegyntIkon style={props.style} />;
            } else {
                return <ProblemIkon style={props.style} />;
            }
        case 'Avbrutt':
            return <AvbruttIkon style={props.style} />;
        case 'Avsluttet':
            return <InaktivIkon style={props.style} />;
        case 'Gjennomføres':
            return <GjennomforesIkon style={props.style} />;
        default:
            return null;
    }
};

export default StatusIkon;
