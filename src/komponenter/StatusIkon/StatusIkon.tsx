import CheckIkon from '@/assets/ikoner/check.svg?react';
import GjennomforesIkon from '@/assets/ikoner/gjennomfores.svg?react';
import InaktivIkon from '@/assets/ikoner/inaktiv.svg?react';
import PabegyntIkon from '@/assets/ikoner/pabegynt.svg?react';
import AvbruttIkon from '@/assets/ikoner/stop.svg?react';
import ProblemIkon from '@/assets/ikoner/varsel.svg?react';
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

const StatusIkon: FunctionComponent<Props> = (props) => {
    switch (props.status) {
        case 'PÅBEGYNT':
            return <PabegyntIkon style={props.style} />;
        case 'KLAR_FOR_OPPSTART':
            return <CheckIkon style={props.style} />;
        case 'MANGLER_SIGNATUR':
        case 'OPPFØLGING_KREVES':
            return <ProblemIkon style={props.style} />;
        case 'MANGLER_GODKJENNING':
            if (props.godkjentAvInnloggetBruker || (props.rolle === 'VEILEDER' && !props.andrePartnerHarGodkjent)) {
                return <PabegyntIkon style={props.style} />;
            } else {
                return <ProblemIkon style={props.style} />;
            }
        case 'ANNULLERT':
            return <AvbruttIkon style={props.style} />;
        case 'AVSLUTTET':
            return <InaktivIkon style={props.style} />;
        case 'GJENNOMFØRES':
            return <GjennomforesIkon style={props.style} />;
        default:
            return null;
    }
};

export default StatusIkon;
