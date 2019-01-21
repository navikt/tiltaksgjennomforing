import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import RedigerOppgave from '../RedigerOppgave/RedigerOppgave';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import { Oppgave } from '../../avtale';
import './OpprettOppgave.less';

interface Props {
    lagreOppgave: (oppgave: Oppgave) => void;
}

class OpprettOppgave extends React.Component<Props> {
    state = {
        visRedigerOppgave: false,
    };

    visOppgave = (skalVises: boolean) => {
        this.setState({ visRedigerOppgave: skalVises });
    };

    nyOppgaveOnClick = () => {
        this.visOppgave(true);
    };

    lagreOppgave = (oppgave: Oppgave) => {
        this.props.lagreOppgave(oppgave);
        this.visOppgave(false);
    };

    render() {
        return (
            <Innholdsboks>
                <Systemtittel tag="h1" className="opprett-oppgave__tittel">
                    Hvilke arbeidsoppgaver skal utføres?
                </Systemtittel>
                <Normaltekst className="opprett-oppgave__beskrivelse">
                    Her skal du beskrive hvilke arbeidsoppgaver som deltakeren
                    skal utføre hos dere under arbeidstreningen.
                </Normaltekst>
                {this.state.visRedigerOppgave ? (
                    <RedigerOppgave lagreOppgave={this.lagreOppgave} />
                ) : (
                    <Knapp
                        className="opprett-oppgave__knapp"
                        htmlType="button"
                        onClick={this.nyOppgaveOnClick}
                    >
                        + Legg til arbeidsoppgave
                    </Knapp>
                )}
            </Innholdsboks>
        );
    }
}

export default OpprettOppgave;
