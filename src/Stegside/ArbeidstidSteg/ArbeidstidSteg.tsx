import * as React from 'react';
import Datovelger from './Datovelger/datovelger';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import Ukevelger from './Ukevelger/Ukevelger';
import StillingsprosentInput from './StillingsprosentInput/StillingsprosentInput';
import InfoBoks from './InfoBoks/InfoBoks';
import './ArbeidstidSteg.less';

interface State {
    startDatoRiktigFormatert: boolean;
}

class ArbeidstidSteg extends React.Component<Context, State> {
    state: State = {
        startDatoRiktigFormatert: true,
    };

    velgStartDato = (dato: Moment) => {
        this.setState({
            startDatoRiktigFormatert: true,
        });
        this.props.settAvtaleVerdi('startDatoTimestamp', dato.valueOf());
    };

    settStartDatoRiktigFormatert = (riktigFormatert: boolean) => {
        this.setState({ startDatoRiktigFormatert: riktigFormatert });
    };

    settArbeidstreningLengde = (verdi: number) => {
        this.props.settAvtaleVerdi('arbeidstreningLengde', verdi);
    };

    settStillingsprosent = (verdi: number) => {
        this.props.settAvtaleVerdi('arbeidstreningStillingprosent', verdi);
    };

    render() {
        const timerIUka =
            (37.5 * this.props.avtale.arbeidstreningStillingprosent) / 100;
        const dagerIUka = (timerIUka / 37.5) * 5;

        return (
            <Innholdsboks>
                <Systemtittel className="arbeidstidsteg__tittel" tag="h2">
                    Arbeidstid og oppstart
                </Systemtittel>
                <Normaltekst className="arbeidstidsteg__startdato-label">
                    Startdato
                </Normaltekst>
                <Datovelger
                    className="arbeidstidsteg__datovelger"
                    velgDato={this.velgStartDato}
                    dato={moment(this.props.avtale.startDatoTimestamp)}
                    settRiktigFormatert={this.settStartDatoRiktigFormatert}
                    inputRiktigFormatert={this.state.startDatoRiktigFormatert}
                />
                <Ukevelger
                    label="Hvor lenge skal arbeidstreningen vare?"
                    verdi={this.props.avtale.arbeidstreningLengde}
                    onChange={this.settArbeidstreningLengde}
                    min={1}
                    max={12}
                />
                <StillingsprosentInput
                    label="Hvilken stillingsprosent skal deltakeren ha?"
                    verdi={this.props.avtale.arbeidstreningStillingprosent}
                    onChange={this.settStillingsprosent}
                />
                <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} />
            </Innholdsboks>
        );
    }
}

export default medContext(ArbeidstidSteg);
