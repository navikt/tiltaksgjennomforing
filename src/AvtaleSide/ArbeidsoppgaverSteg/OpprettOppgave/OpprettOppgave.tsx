import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import RedigerOppgave from '../RedigerOppgave/RedigerOppgave';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import { Oppgave } from '../../avtale';
import './OpprettOppgave.less';
import { TemporaryLagringArbeidsoppgave } from '../../../AvtaleContext';

interface Props {
    lagreOppgave: (oppgave: Oppgave) => void;
    mellomLagretArbeidsoppgave: TemporaryLagringArbeidsoppgave;
    setMellomLagringArbeidsoppgave: (
        arbeidsoppgaveInput: TemporaryLagringArbeidsoppgave
    ) => void;
    fjerneMellomLagringArbeidsoppgave: () => void;
}

class OpprettOppgave extends React.Component<Props> {
    setInnMellomLagringArbeidsoppgave = () => {
        return (
            this.props.mellomLagretArbeidsoppgave.oppgaveTittel !== '' ||
            this.props.mellomLagretArbeidsoppgave.oppgaveBeskrivelse !== '' ||
            this.props.mellomLagretArbeidsoppgave.oppgaveOpplaering !== ''
        );
    };

    state = {
        visRedigerOppgave: this.setInnMellomLagringArbeidsoppgave(),
    };

    visOppgave = (skalVises: boolean) => {
        this.setState({ visRedigerOppgave: skalVises });
    };

    nyOppgaveOnClick = () => {
        this.visOppgave(true);
    };

    lagreOppgave = async (oppgave: Oppgave) => {
        await this.props.lagreOppgave(oppgave);
        this.visOppgave(false);
    };

    render() {
        return (
            <Innholdsboks utfyller="arbeidsgiver">
                <Systemtittel tag="h1" className="opprett-oppgave__tittel">
                    Hvilke arbeidsoppgaver skal utføres?
                </Systemtittel>
                <Normaltekst className="opprett-oppgave__beskrivelse">
                    Her skal du beskrive hvilke arbeidsoppgaver som deltakeren
                    skal utføre hos dere under arbeidstreningen.
                </Normaltekst>
                {this.state.visRedigerOppgave ? (
                    <RedigerOppgave
                        lagreOppgave={this.lagreOppgave}
                        mellomLagretDataArbeidsoppgave={
                            this.props.mellomLagretArbeidsoppgave
                        }
                        setMellomLagringArbeidsoppgave={
                            this.props.setMellomLagringArbeidsoppgave
                        }
                        fjerneMellomLagringArbeidsoppgave={
                            this.props.fjerneMellomLagringArbeidsoppgave
                        }
                    />
                ) : (
                    <Knapp
                        className="opprett-oppgave__knapp"
                        htmlType="button"
                        onClick={this.nyOppgaveOnClick}
                    >
                        + Legg til ny arbeidsoppgave
                    </Knapp>
                )}
            </Innholdsboks>
        );
    }
}

export default OpprettOppgave;
