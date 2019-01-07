import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';
import './OpprettAvtale.less';
import { Context, medContext } from '../AvtaleContext';

interface State {
    deltakerFnr: string;
    arbeidsgiverFnr: string;
}

class OpprettAvtale extends React.Component<Context, State> {
    state = {
        deltakerFnr: '',
        arbeidsgiverFnr: '',
    };

    endredeltakerFnr = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ deltakerFnr: event.target.value });
    };

    endreArbeidsgiverFnr = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ arbeidsgiverFnr: event.target.value });
    };

    opprettAvtaleKlikk = () => {
        this.props.opprettAvtale();
    };

    render() {
        return (
            <>
                <Innholdstittel>
                    Opprett avtale om arbeidstrening
                </Innholdstittel>
                <Input
                    label="Kandidatens fødselsnummer"
                    value={this.state.deltakerFnr}
                    onChange={this.endredeltakerFnr}
                />
                <Input
                    label="Arbeidsgivers fødselsnummer"
                    value={this.state.arbeidsgiverFnr}
                    onChange={this.endreArbeidsgiverFnr}
                />
                <Hovedknapp onClick={this.opprettAvtaleKlikk}>
                    OPPRETT AVTALE
                </Hovedknapp>
            </>
        );
    }
}

export default medContext(OpprettAvtale);
