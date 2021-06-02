import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as GjennomforesIkon } from '@/assets/ikoner/gjennomfores.svg';
import { ReactComponent as InaktivIkon } from '@/assets/ikoner/inaktiv.svg';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/stop.svg';
import { ReactComponent as ProblemIkon } from '@/assets/ikoner/varsel.svg';
import { AvtaleStatus } from '@/types/avtale';
import { Rolle } from '@/types/innlogget-bruker';
import React, { CSSProperties, FunctionComponent } from 'react';

interface Props {
    status: AvtaleStatus;
    rolle?: Rolle;
    godkjentAvInnloggetBruker?: boolean;
    andrePartnerHarGodkjent?: boolean;
    className?: string;
    style?: CSSProperties;
}

const StatusIkon: FunctionComponent<Props> = props => {
    switch (props.status) {
        case 'PÅBEGYNT':
            return <PabegyntIkon focusable="false" style={props.style} />;
        case 'KLAR_FOR_OPPSTART':
            return <CheckIkon focusable="false" style={props.style} />;
        case 'MANGLER_GODKJENNING':
            if (props.godkjentAvInnloggetBruker || (props.rolle === 'VEILEDER' && !props.andrePartnerHarGodkjent)) {
                return <PabegyntIkon focusable="false" style={props.style} />;
            } else {
                return <ProblemIkon focusable="false" style={props.style} />;
            }
        case 'ANNULLERT':
            return <AvbruttIkon focusable="false" style={props.style} />;
        case 'AVBRUTT':
            return <AvbruttIkon focusable="false" style={props.style} />;
        case 'AVSLUTTET':
            return <InaktivIkon focusable="false" style={props.style} />;
        case 'GJENNOMFØRES':
            return <GjennomforesIkon focusable="false" style={props.style} />;
        default:
            return null;
    }
};

export default StatusIkon;
