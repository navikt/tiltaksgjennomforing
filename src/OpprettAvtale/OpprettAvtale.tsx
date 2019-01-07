import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';
import './OpprettAvtale.less';
import { Context, medContext } from '../AvtaleContext';

interface State {
    kandidatFnr: string;
    arbeidsgiverFnr: string;
}

class OpprettAvtale extends React.Component<Context, State> {
    state = {
        kandidatFnr: '',
        arbeidsgiverFnr: '',
    };

    endreKandidatFnr = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ kandidatFnr: event.target.value });
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
                    value={this.state.kandidatFnr}
                    onChange={this.endreKandidatFnr}
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
