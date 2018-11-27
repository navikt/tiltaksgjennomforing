import * as React from 'react';
import Datovelger from './Datovelger/datovelger';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import Ukevelger from './Ukevelger/Ukevelger';

interface State {
    startDatoTimestamp: number;
    startDatoRiktigFormatert: boolean;
    lengde: number;
}

class ArbeidstidSteg extends React.Component<Context, State> {
    // TODO: default lengde
    state: State = {
        startDatoTimestamp: this.props.avtale.startDatoTimestamp,
        startDatoRiktigFormatert: true,
        lengde: 1,
    };

    velgStartDato = (dato: Moment) => {
        this.setState({
            startDatoTimestamp: dato.valueOf(),
            startDatoRiktigFormatert: true,
        });
        this.props.settAvtaleVerdi('startDatoTimestamp', dato.valueOf());
    };

    settStartDatoRiktigFormatert = (riktigFormatert: boolean) => {
        this.setState({ startDatoRiktigFormatert: riktigFormatert });
    };

    onChange = (verdi: number) => {
        this.setState({ lengde: verdi });
    };

    render() {
        return (
            <Innholdsboks>
                <Innholdstittel tag="h2">Arbeidstid og oppstart</Innholdstittel>
                <Datovelger
                    velgDato={this.velgStartDato}
                    dato={moment(this.state.startDatoTimestamp)}
                    settRiktigFormatert={this.settStartDatoRiktigFormatert}
                    inputRiktigFormatert={this.state.startDatoRiktigFormatert}
                />
                <Ukevelger
                    label="Hvor lenge skal arbeidstreningen vare?"
                    verdi={this.state.lengde}
                    onChange={this.onChange}
                    min={1}
                    max={12}
                />
            </Innholdsboks>
        );
    }
}

export default medContext(ArbeidstidSteg);
