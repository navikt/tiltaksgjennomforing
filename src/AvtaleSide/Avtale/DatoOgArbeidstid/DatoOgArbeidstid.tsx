import * as React from 'react';
import AvtaleStegProps from '../../AvtaleStegProps';
import Datovelger from './Datovelger/datovelger';
import { Moment } from 'moment';

interface State {
    startDato: Moment;
    sluttDato: Moment;
    startDatoRiktigFormatert: boolean;
    sluttDatoRiktigFormatert: boolean;
}

class DatoOgArbeidstid extends React.Component<AvtaleStegProps, State> {
    state: State = {
        startDato: this.props.form.startDato,
        sluttDato: this.props.form.sluttDato,
        startDatoRiktigFormatert: true,
        sluttDatoRiktigFormatert: true,
    };

    velgStartDato = (dato: Moment) => {
        this.setState({ startDato: dato, startDatoRiktigFormatert: true });
        // TODO: Blokkert. Løses av Mats sin branch.
        // this.props.oppdaterAvtale('startDato', dato);
    };

    velgSluttDato = (dato: Moment) => {
        this.setState({ sluttDato: dato, sluttDatoRiktigFormatert: true });
        // TODO: Blokkert. Løses av Mats sin branch.
        // this.props.oppdaterAvtale('sluttDato', dato);
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
                <h1>Start- og sluttdato</h1>
                <Datovelger
                    velgDato={this.velgStartDato}
                    dato={this.state.startDato}
                    settRiktigFormatert={this.settStartDatoRiktigFormatert}
                    inputRiktigFormatert={this.state.startDatoRiktigFormatert}
                />
                <Datovelger
                    velgDato={this.velgSluttDato}
                    dato={this.state.sluttDato}
                    settRiktigFormatert={this.settSluttDatoRiktigFormatert}
                    inputRiktigFormatert={this.state.sluttDatoRiktigFormatert}
                />
            </>
        );
    }
}

export default DatoOgArbeidstid;
