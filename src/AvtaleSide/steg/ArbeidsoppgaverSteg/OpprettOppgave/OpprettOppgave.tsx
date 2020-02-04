import { TemporaryLagringArbeidsoppgave } from '@/AvtaleContext';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Godkjenninger, Oppgave } from '@/types/avtale';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import RedigerOppgave from '../RedigerOppgave/RedigerOppgave';
import './OpprettOppgave.less';

interface Props {
    lagreOppgave: (oppgave: Oppgave) => void;
    mellomLagretArbeidsoppgave: TemporaryLagringArbeidsoppgave;
    setMellomLagringArbeidsoppgave: (arbeidsoppgaveInput: TemporaryLagringArbeidsoppgave) => void;
    fjerneMellomLagringArbeidsoppgave: () => void;
    setBekreftelseModalIsOpen: (apen: boolean) => void;
}

class OpprettOppgave extends React.Component<Props & Godkjenninger> {
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
        if (this.props.godkjentAvArbeidsgiver || this.props.godkjentAvDeltaker || this.props.godkjentAvVeileder) {
            this.props.setBekreftelseModalIsOpen(true);
        } else {
            this.visOppgave(true);
        }
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
