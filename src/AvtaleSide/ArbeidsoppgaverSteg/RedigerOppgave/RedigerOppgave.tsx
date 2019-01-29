import { Input, Textarea } from 'nav-frontend-skjema';
import * as React from 'react';
import LagreKnapp from '../../../komponenter/LagreKnapp/LagreKnapp';
import { Oppgave } from '../../avtale';

interface Props {
    lagreOppgave: (oppgave: Oppgave) => Promise<any>;
    defaultOppgave?: Oppgave;
}

interface State {
    tittel: string;
    beskrivelse: string;
    opplaering: string;
}

class RedigerOppgave extends React.Component<Props, State> {
    state = {
        tittel:
            (this.props.defaultOppgave && this.props.defaultOppgave.tittel) ||
            '',
        beskrivelse:
            (this.props.defaultOppgave &&
                this.props.defaultOppgave.beskrivelse) ||
            '',
        opplaering:
            (this.props.defaultOppgave &&
                this.props.defaultOppgave.opplaering) ||
            '',
    };

    settTittel = (event: any) => {
        this.setState({
            tittel: event.currentTarget.value,
        });
    };

    settBeskrivelse = (event: any) => {
        this.setState({
            beskrivelse: event.currentTarget.value,
        });
    };

    settOpplaering = (event: any) => {
        this.setState({
            opplaering: event.currentTarget.value,
        });
    };

    lagreOppgave = () => {
        return this.props.lagreOppgave({
            id: this.props.defaultOppgave && this.props.defaultOppgave.id,
            opprettetTimestamp:
                this.props.defaultOppgave &&
                this.props.defaultOppgave.opprettetTimestamp,
            tittel: this.state.tittel,
            beskrivelse: this.state.beskrivelse,
            opplaering: this.state.opplaering,
        });
    };

    lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    render() {
        return (
            <>
                <Input
                    label="Navn på arbeidsoppgave"
                    value={this.state.tittel}
                    onChange={this.settTittel}
                    className="rediger-oppgave__tittel-input"
                />
                <Textarea
                    label="Hva går arbeidsoppgaven ut på?"
                    value={this.state.beskrivelse}
                    onChange={this.settBeskrivelse}
                    maxLength={1000}
                    tellerTekst={this.lagTellerTekst}
                />
                <Textarea
                    label="Hvilken opplæring vil deltakeren få?"
                    value={this.state.opplaering}
                    onChange={this.settOpplaering}
                    maxLength={1000}
                    tellerTekst={this.lagTellerTekst}
                />
                <LagreKnapp
                    lagre={this.lagreOppgave}
                    label="Lagre arbeidsoppgave"
                    className="rediger-maal__lagre-knapp"
                />
            </>
        );
    }
}

export default RedigerOppgave;
