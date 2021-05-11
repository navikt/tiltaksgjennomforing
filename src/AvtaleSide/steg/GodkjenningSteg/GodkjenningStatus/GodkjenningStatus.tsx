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
                    fornavn={props.avtale.deltakerFornavn}
                    etternavn={props.avtale.deltakerEtternavn}
                    placeholderName="Deltaker"
                />
                <GodkjenningRad
                    godkjentAvtale={props.avtale.godkjentAvArbeidsgiver}
                    fornavn={props.avtale.arbeidsgiverFornavn}
                    etternavn={props.avtale.arbeidsgiverEtternavn}
                    bedriftNavn={props.avtale.bedriftNavn}
                    placeholderName="Arbeidsgiver"
                />
                <GodkjenningRad
                    godkjentAvtale={props.avtale.avtaleInngått}
                    fornavn={props.avtale.veilederFornavn}
                    etternavn={props.avtale.veilederEtternavn}
                    placeholderName="NAV"
                />
            </div>
        </div>
    );
};

export default GodkjenningStatus;
