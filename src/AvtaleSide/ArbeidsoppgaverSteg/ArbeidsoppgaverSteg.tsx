import * as React from 'react';
import { ApiError } from '@/types/errors';
import { Context, medContext } from '@/AvtaleContext';
import { Oppgave } from '@/types/avtale';
import OppgaveKort from './OppgaveKort/OppgaveKort';
import OpprettOppgave from './OpprettOppgave/OpprettOppgave';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';

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

    slettOppgave = async (oppgave: Oppgave) => {
        try {
            await this.props.slettOppgave(oppgave);
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
        this.setState({ oppgaveRad: oppgave }, () =>
            this.setState({ modalIsOpen: true })
        );
    };

    lukkModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render = () => (
        <>
            <OpprettOppgave
                lagreOppgave={this.props.lagreOppgave}
                mellomLagretArbeidsoppgave={
                    this.props.mellomLagringArbeidsoppgave
                }
                setMellomLagringArbeidsoppgave={
                    this.props.mellomLagreArbeidsoppgave
                }
                fjerneMellomLagringArbeidsoppgave={
                    this.props.setMellomLagreArbeidsoppgaveTom
                }
            />
            {this.props.avtale.oppgaver.map(oppgave => (
                <OppgaveKort
                    oppgave={oppgave}
                    key={oppgave.id}
                    lagreOppgave={this.props.lagreOppgave}
                    slettOppgave={this.bekrefelsePaSlettRad}
                />
            ))}
            <BekreftelseModal
                modalIsOpen={this.state.modalIsOpen}
                radTilSletting={this.state.oppgaveRad}
                slettOnClick={this.slettOppgave}
                lukkModal={this.lukkModal}
                navn="oppgave"
                varselTekst="Du er i ferd med å slette en arbeidsoppgave. Hvis du gjør det vil alt innholdet i arbeidsoppgaven forsvinne. Er du sikker?"
                oversiktTekst="Slette "
                bekreftelseTekst="Ja, slett"
                avbrytelseTekst="avbryt"
            />
        </>
    );
}

export default medContext(ArbeidsoppgaverSteg);
