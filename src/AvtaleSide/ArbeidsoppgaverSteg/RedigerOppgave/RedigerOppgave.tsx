import { Input, Textarea } from 'nav-frontend-skjema';
import * as React from 'react';
import LagreKnapp from '../../../komponenter/LagreKnapp/LagreKnapp';
import { Oppgave } from '../../avtale';
import ApiError from '../../../api-error';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { TemporaryLagringArbeidsoppgave } from '../../../AvtaleContext';

interface Props {
    lagreOppgave: (oppgave: Oppgave) => Promise<any>;
    defaultOppgave?: Oppgave;
    mellomLagretDataArbeidsoppgave?: TemporaryLagringArbeidsoppgave;
    setMellomLagringArbeidsoppgave?: (
        arbeidsoppgaveInput: TemporaryLagringArbeidsoppgave
    ) => void;
    fjerneMellomLagringArbeidsoppgave?: () => void;
}

interface State {
    tittel: string;
    beskrivelse: string;
    opplaering: string;
    tittelFeil?: SkjemaelementFeil;
    beskrivelseFeil?: SkjemaelementFeil;
    opplaeringFeil?: SkjemaelementFeil;
    erLagret: boolean;
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
        tittelFeil: undefined,
        beskrivelseFeil: undefined,
        opplaeringFeil: undefined,
        erLagret: false,
    };

    componentDidMount(): void {
        if (this.props.mellomLagretDataArbeidsoppgave) {
            if (
                this.props.mellomLagretDataArbeidsoppgave.oppgaveTittel !==
                    '' ||
                this.props.mellomLagretDataArbeidsoppgave.oppgaveBeskrivelse !==
                    '' ||
                this.props.mellomLagretDataArbeidsoppgave.oppgaveOpplaering !==
                    ''
            ) {
                this.setState({
                    tittel: this.props.mellomLagretDataArbeidsoppgave
                        .oppgaveTittel,
                    beskrivelse: this.props.mellomLagretDataArbeidsoppgave
                        .oppgaveBeskrivelse,
                    opplaering: this.props.mellomLagretDataArbeidsoppgave
                        .oppgaveOpplaering,
                });
            }
        }
    }
    componentWillUnmount(): void {
        if (
            (this.state.tittel !== '' ||
                this.state.beskrivelse !== '' ||
                this.state.opplaering !== '') &&
            !this.state.erLagret
        ) {
            const tempArbeidsoppgave = {
                oppgaveTittel: this.state.tittel,
                oppgaveBeskrivelse: this.state.beskrivelse,
                oppgaveOpplaering: this.state.opplaering,
            };
            if (this.props.setMellomLagringArbeidsoppgave) {
                this.props.setMellomLagringArbeidsoppgave(tempArbeidsoppgave);
            }
        }
    }

    settTittel = (event: any) => {
        this.setState({
            tittel: event.currentTarget.value,
        });

        event.currentTarget.value
            ? this.setState({ tittelFeil: undefined })
            : this.setState({
                  tittelFeil: { feilmelding: 'Feltet kan ikke være tomt' },
              });
    };

    settBeskrivelse = (event: any) => {
        this.setState({
            beskrivelse: event.currentTarget.value,
        });

        event.currentTarget.value
            ? this.setState({ beskrivelseFeil: undefined })
            : this.setState({
                  beskrivelseFeil: { feilmelding: 'Feltet kan ikke være tomt' },
              });
    };

    settOpplaering = (event: any) => {
        this.setState({
            opplaering: event.currentTarget.value,
        });

        event.currentTarget.value
            ? this.setState({ opplaeringFeil: undefined })
            : this.setState({
                  opplaeringFeil: { feilmelding: 'Feltet kan ikke være tomt' },
              });
    };

    lagreOppgave = () => {
        if (
            this.state.tittel &&
            this.state.beskrivelse &&
            this.state.opplaering
        ) {
            this.setState({ erLagret: true });
            if (this.props.fjerneMellomLagringArbeidsoppgave) {
                this.props.fjerneMellomLagringArbeidsoppgave();
            }
            return this.props.lagreOppgave({
                id: this.props.defaultOppgave && this.props.defaultOppgave.id,
                opprettetTimestamp:
                    this.props.defaultOppgave &&
                    this.props.defaultOppgave.opprettetTimestamp,
                tittel: this.state.tittel,
                beskrivelse: this.state.beskrivelse,
                opplaering: this.state.opplaering,
            });
        } else {
            if (!this.state.tittel) {
                this.setState({
                    tittelFeil: { feilmelding: 'Feltet kan ikke være tomt' },
                });
            }
            if (!this.state.beskrivelse) {
                this.setState({
                    beskrivelseFeil: {
                        feilmelding: 'Feltet kan ikke være tomt',
                    },
                });
            }
            if (!this.state.opplaering) {
                this.setState({
                    opplaeringFeil: {
                        feilmelding: 'Feltet kan ikke være tomt',
                    },
                });
            }
            throw new ApiError('');
        }
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
                    feil={this.state.tittelFeil}
                    onBlur={this.settTittel}
                />
                <Textarea
                    label="Hva går arbeidsoppgaven ut på?"
                    value={this.state.beskrivelse}
                    onChange={this.settBeskrivelse}
                    maxLength={1000}
                    tellerTekst={this.lagTellerTekst}
                    feil={this.state.beskrivelseFeil}
                    onBlur={this.settBeskrivelse}
                />
                <Textarea
                    label="Hvilken opplæring vil deltakeren få?"
                    value={this.state.opplaering}
                    onChange={this.settOpplaering}
                    maxLength={1000}
                    tellerTekst={this.lagTellerTekst}
                    feil={this.state.opplaeringFeil}
                    onBlur={this.settOpplaering}
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
