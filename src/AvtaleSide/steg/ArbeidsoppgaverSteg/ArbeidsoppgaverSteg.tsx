import { Context, medContext } from '@/AvtaleContext';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Oppgave } from '@/types/avtale';
import { ApiError } from '@/types/errors';
import * as React from 'react';
import OppgaveKort from './OppgaveKort/OppgaveKort';
import OpprettOppgave from './OpprettOppgave/OpprettOppgave';

class ArbeidsoppgaverSteg extends React.Component<Context> {
    state: {
        modalIsOpen: false;
        oppgaveRad: Oppgave;
    };

    constructor(props: Context) {
        super(props);

        this.state = {
            modalIsOpen: false,
            oppgaveRad: this.props.avtale.oppgaver[0],
        };
    }

    slettOppgave = async () => {
        try {
            await this.props.slettOppgave(this.state.oppgaveRad);
            this.lukkModal();
        } catch (error) {
            if (error instanceof ApiError) {
                this.props.visFeilmelding(error.message);
            } else {
                throw error;
            }
        }
    };

    bekrefelsePaSlettRad = (oppgave: Oppgave) => {
        this.setState({ oppgaveRad: oppgave }, () => this.setState({ modalIsOpen: true }));
    };

    lukkModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render = () => (
        <>
            <OpprettOppgave
                {...this.props.avtale}
                utforHandlingHvisRedigerbar={this.props.utforHandlingHvisRedigerbar}
                lagreOppgave={this.props.lagreOppgave}
                mellomLagretArbeidsoppgave={this.props.mellomLagringArbeidsoppgave}
                setMellomLagringArbeidsoppgave={this.props.mellomLagreArbeidsoppgave}
                fjerneMellomLagringArbeidsoppgave={this.props.setMellomLagreArbeidsoppgaveTom}
            />
            {this.props.avtale.oppgaver.map(oppgave => (
                <OppgaveKort
                    oppgave={oppgave}
                    key={oppgave.id}
                    lagreOppgave={this.props.lagreOppgave}
                    slettOppgave={this.bekrefelsePaSlettRad}
                    utforHandlingHvisRedigerbar={this.props.utforHandlingHvisRedigerbar}
                />
            ))}
            <BekreftelseModal
                modalIsOpen={this.state.modalIsOpen}
                bekreftOnClick={this.slettOppgave}
                lukkModal={this.lukkModal}
                varselTekst="Du er i ferd med å slette en arbeidsoppgave. Hvis du gjør det vil alt innholdet i arbeidsoppgaven forsvinne. Er du sikker?"
                oversiktTekst="Slette oppgave"
                bekreftelseTekst="Ja, slett oppgave"
                avbrytelseTekst="avbryt"
            />
        </>
    );
}

export default medContext(ArbeidsoppgaverSteg);
