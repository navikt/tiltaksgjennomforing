import React from 'react';
import './GodkjenningStatus.less';
import { Avtale } from '@/types/avtale';
import GodkjenningRad from './GodkjenningRad/GodkjenningRad';
import { Undertittel } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

interface Props {
    avtale: Avtale;
}

const GodkjenningStatus: React.FunctionComponent<Props> = props => {
    return (
        <div className="godkjenningstatus">
            <Undertittel>Hvem har godkjent?</Undertittel>
            <VerticalSpacer rem={0.5} />
            <div className="godkjenningstatus__rader">
                <GodkjenningRad
                    godkjentAvtale={props.avtale.godkjentAvDeltaker}
                    navn={`${props.avtale.deltakerFornavn} ${props.avtale.deltakerEtternavn}`}
                />
                <GodkjenningRad godkjentAvtale={props.avtale.godkjentAvArbeidsgiver} navn={props.avtale.bedriftNavn} />
                <GodkjenningRad godkjentAvtale={props.avtale.avtaleInngått} navn="NAV" />
            </div>
        </div>
    );
};

export default GodkjenningStatus;
