import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import { ReactComponent as ProblemIkon } from '@/assets/ikoner/varsel.svg';
import { ReactComponent as InaktivIkon } from '@/assets/ikoner/inaktiv.svg';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/stop.svg';
import { ReactComponent as GjennomforesIkon } from '@/assets/ikoner/gjennomfores.svg';
import { Rolle } from '@/AvtaleContext';

interface Props {
    status: string;
    rolle?: Rolle;
    godkjentAvInnloggetBruker?: boolean;
    andrePartnerHarGodkjent?: boolean;
    className?: string;
}

const StatusIkon: FunctionComponent<Props> = props => {
    switch (props.status) {
        case 'Påbegynt':
            return <PabegyntIkon />;
        case 'Klar for oppstart':
            return <CheckIkon />;
        case 'Mangler godkjenning':
            if (props.godkjentAvInnloggetBruker || (props.rolle === 'VEILEDER' && !props.andrePartnerHarGodkjent)) {
                return <PabegyntIkon />;
            } else {
                return <ProblemIkon />;
            }
        case 'Avbrutt':
            return <AvbruttIkon />;
        case 'Avsluttet':
            return <InaktivIkon />;
        case 'Gjennomføres':
            return <GjennomforesIkon />;
        default:
            return null;
    }
};

export default StatusIkon;
