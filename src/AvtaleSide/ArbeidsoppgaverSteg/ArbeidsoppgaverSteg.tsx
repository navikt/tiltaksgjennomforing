import * as React from 'react';
import ApiError from '../../api-error';
import { Context, medContext } from '../../AvtaleContext';
import { Oppgave } from '../avtale';
import OppgaveKort from './OppgaveKort/OppgaveKort';
import OpprettOppgave from './OpprettOppgave/OpprettOppgave';
import BekreftelseModal from '../../komponenter/modal/BekreftelseModal';

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
            <OpprettOppgave lagreOppgave={this.props.lagreOppgave} />
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
                varselTekst="Du er i ferd med å slette et mål. Hvis du gjør det vil alt innholdet i målet forsvinne. Er du sikker?"
            />
        </>
    );
}

export default medContext<{}>(ArbeidsoppgaverSteg);
