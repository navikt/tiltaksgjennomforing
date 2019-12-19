import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import RedigerOppgave from '../RedigerOppgave/RedigerOppgave';
import { Normaltekst } from 'nav-frontend-typografi';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Oppgave } from '@/types/avtale';
import './OpprettOppgave.less';
import { TemporaryLagringArbeidsoppgave } from '@/AvtaleContext';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';

interface Props {
    lagreOppgave: (oppgave: Oppgave) => void;
    mellomLagretArbeidsoppgave: TemporaryLagringArbeidsoppgave;
    setMellomLagringArbeidsoppgave: (arbeidsoppgaveInput: TemporaryLagringArbeidsoppgave) => void;
    fjerneMellomLagringArbeidsoppgave: () => void;
}

class OpprettOppgave extends React.Component<Props> {
    state = {
        isMounted: false,
        visRedigerOppgave: false,
    };

    setInnMellomLagringArbeidsoppgave = () => {
        return (
            this.props.mellomLagretArbeidsoppgave.oppgaveTittel !== '' ||
            this.props.mellomLagretArbeidsoppgave.oppgaveBeskrivelse !== '' ||
            this.props.mellomLagretArbeidsoppgave.oppgaveOpplaering !== ''
        );
    };

    componentDidMount() {
        this.setState({
            visRedigerOppgave: this.setInnMellomLagringArbeidsoppgave(),
            isMounted: true,
        });
    }

    componentWillUnmount() {
        // eslint-disable-next-line
        this.state.isMounted = false;
    }

    visOppgave = (skalVises: boolean) => {
        if (this.state.isMounted) {
            this.setState({ visRedigerOppgave: skalVises });
        }
    };

    nyOppgaveOnClick = () => {
        this.visOppgave(true);
    };

    lagreOppgave = async (oppgave: Oppgave) => {
        await this.props.lagreOppgave(oppgave);
        await this.visOppgave(false);
    };

    render() {
        return (
            <Innholdsboks utfyller="arbeidsgiver">
                <SkjemaTittel>Hvilke arbeidsoppgaver skal utføres?</SkjemaTittel>
                <Normaltekst>
                    Her skal du beskrive hvilke arbeidsoppgaver som deltakeren skal utføre hos dere under
                    arbeidstreningen.
                </Normaltekst>
                {this.state.visRedigerOppgave ? (
                    <RedigerOppgave
                        lagreOppgave={this.lagreOppgave}
                        mellomLagretDataArbeidsoppgave={this.props.mellomLagretArbeidsoppgave}
                        setMellomLagringArbeidsoppgave={this.props.setMellomLagringArbeidsoppgave}
                        fjerneMellomLagringArbeidsoppgave={this.props.fjerneMellomLagringArbeidsoppgave}
                    />
                ) : (
                    <Knapp className="opprett-oppgave__knapp" htmlType="button" onClick={this.nyOppgaveOnClick}>
                        + Legg til ny arbeidsoppgave
                    </Knapp>
                )}
            </Innholdsboks>
        );
    }
}

export default OpprettOppgave;
