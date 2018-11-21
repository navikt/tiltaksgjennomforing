import * as React from 'react';
import Datovelger from './Datovelger/datovelger';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';

interface State {
    startDatoTimestamp: number;
    sluttDatoTimestamp: number;
    startDatoRiktigFormatert: boolean;
    sluttDatoRiktigFormatert: boolean;
}

class ArbeidstidSteg extends React.Component<Context, State> {
    state: State = {
        startDatoTimestamp: this.props.avtale.startDatoTimestamp,
        sluttDatoTimestamp: this.props.avtale.sluttDatoTimestamp,
        startDatoRiktigFormatert: true,
        sluttDatoRiktigFormatert: true,
    };

    velgStartDato = (dato: Moment) => {
        this.setState({
            startDatoTimestamp: dato.valueOf(),
            startDatoRiktigFormatert: true,
        });
        this.props.settAvtaleVerdi('startDatoTimestamp', dato.valueOf());
    };

    velgSluttDato = (dato: Moment) => {
        this.setState({
            sluttDatoTimestamp: dato.valueOf(),
            sluttDatoRiktigFormatert: true,
        });
        this.props.settAvtaleVerdi('sluttDatoTimestamp', dato.valueOf());
    };

    settStartDatoRiktigFormatert = (riktigFormatert: boolean) => {
        this.setState({ startDatoRiktigFormatert: riktigFormatert });
    };

    settSluttDatoRiktigFormatert = (riktigFormatert: boolean) => {
        this.setState({ sluttDatoRiktigFormatert: riktigFormatert });
    };

    render() {
        return (
            <Innholdsboks>
                <Innholdstittel tag="h2">Start- og sluttdato</Innholdstittel>
                <Datovelger
                    velgDato={this.velgStartDato}
                    dato={moment(this.state.startDatoTimestamp)}
                    settRiktigFormatert={this.settStartDatoRiktigFormatert}
                    inputRiktigFormatert={this.state.startDatoRiktigFormatert}
                />
                <Datovelger
                    velgDato={this.velgSluttDato}
                    dato={moment(this.state.sluttDatoTimestamp)}
                    settRiktigFormatert={this.settSluttDatoRiktigFormatert}
                    inputRiktigFormatert={this.state.sluttDatoRiktigFormatert}
                />
            </Innholdsboks>
        );
    }
}

export default medContext(ArbeidstidSteg);
