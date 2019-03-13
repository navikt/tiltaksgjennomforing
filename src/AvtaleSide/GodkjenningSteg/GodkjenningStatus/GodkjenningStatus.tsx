import React from 'react';
import './GodkjenningStatus.less';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import { Systemtittel } from 'nav-frontend-typografi';
import { Avtale } from '../../avtale';
import GodkjenningRad from './GodkjenningRad/GodkjenningRad';

interface Props {
    avtale: Avtale;
}

const GodkjenningStatus: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Innholdsboks className="godkjenningstatus">
            <Systemtittel>Hvem har godkjent?</Systemtittel>
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
                    godkjentAvtale={props.avtale.godkjentAvVeileder}
                    fornavn={props.avtale.veilederFornavn}
                    etternavn={props.avtale.veilederEtternavn}
                    placeholderName="Veileder i NAV"
                />
            </div>
        </Innholdsboks>
    );
};

export default GodkjenningStatus;
