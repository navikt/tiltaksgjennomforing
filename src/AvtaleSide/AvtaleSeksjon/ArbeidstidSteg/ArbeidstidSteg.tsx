import * as React from 'react';
import Datovelger from './Datovelger/datovelger';
import { Moment } from 'moment';
import { EndreAvtale } from '../../EndreAvtale';
import * as moment from 'moment';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Arbeidstid } from '../../Avtale';
import StegProps from '../../StegProps';

interface State {
    startDatoTimestamp: number;
    sluttDatoTimestamp: number;
    startDatoRiktigFormatert: boolean;
    sluttDatoRiktigFormatert: boolean;
}

class ArbeidstidSteg extends React.Component<
    Arbeidstid & EndreAvtale & StegProps,
    State
> {
    state: State = {
        startDatoTimestamp: this.props.startDatoTimestamp,
        sluttDatoTimestamp: this.props.sluttDatoTimestamp,
        startDatoRiktigFormatert: true,
        sluttDatoRiktigFormatert: true,
    };

    velgStartDato = (dato: Moment) => {
        this.setState({
            startDatoTimestamp: dato.valueOf(),
            startDatoRiktigFormatert: true,
        });
        this.props.endreVerdi('startDatoTimestamp', dato.valueOf());
    };

    velgSluttDato = (dato: Moment) => {
        this.setState({
            sluttDatoTimestamp: dato.valueOf(),
            sluttDatoRiktigFormatert: true,
        });
        this.props.endreVerdi('sluttDatoTimestamp', dato.valueOf());
    };

    settStartDatoRiktigFormatert = (riktigFormatert: boolean) => {
        this.setState({ startDatoRiktigFormatert: riktigFormatert });
    };

    settSluttDatoRiktigFormatert = (riktigFormatert: boolean) => {
        this.setState({ sluttDatoRiktigFormatert: riktigFormatert });
    };

    render() {
        return (
            <>
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
            </>
        );
    }
}

export default ArbeidstidSteg;
