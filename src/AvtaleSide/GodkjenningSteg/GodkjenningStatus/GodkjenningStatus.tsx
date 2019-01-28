import React from 'react';
import './GodkjenningStatus.less';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import { Systemtittel } from 'nav-frontend-typografi';
import { Avtale } from '../../avtale';
import GodkjenningRad from './GodkjenningRad/GodkjenningRad';

interface Props {
    avtale: Avtale;
}

const GodkjenningStatus: React.FunctionComponent<Props> = props => {
    return (
        <Innholdsboks className="godkjenningstatus">
            <Systemtittel>Hvem har godkjent?</Systemtittel>
            <div className="godkjenningstatus__tittel">
                <GodkjenningRad
                    godkjentAvtale={props.avtale.bekreftetAvBruker}
                    personFornavn={props.avtale.deltakerFornavn}
                    personEtternavn={props.avtale.deltakerEtternavn}
                    placeholderName="Deltaker"
                    class="godkjenningsrad__rad"
                />
                <GodkjenningRad
                    godkjentAvtale={props.avtale.bekreftetAvArbeidsgiver}
                    personFornavn={props.avtale.arbeidsgiverFornavn}
                    personEtternavn={props.avtale.arbeidsgiverEtternavn}
                    placeholderName="Arbeidsgiver"
                    class="godkjenningsrad__rad"
                />
                <GodkjenningRad
                    godkjentAvtale={props.avtale.bekreftetAvVeileder}
                    personFornavn={props.avtale.veilederFornavn}
                    personEtternavn={props.avtale.veilederEtternavn}
                    placeholderName="Veileder i NAV"
                    class="godkjenningsrad__sisteRad"
                />
            </div>
        </Innholdsboks>
    );
};

export default GodkjenningStatus;
