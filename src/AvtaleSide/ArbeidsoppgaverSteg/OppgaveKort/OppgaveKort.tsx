import * as React from 'react';
import { Oppgave } from '../../avtale';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import './OppgaveKort.less';
import RedigerOppgave from '../RedigerOppgave/RedigerOppgave';
import LagretOppgave from './LagretOppgave/LagretOppgave';

interface Props {
    oppgave: Oppgave;
    lagreOppgave: (oppgave: Oppgave) => Promise<any>;
    slettOppgave: (oppgave: Oppgave) => Promise<any>;
}

interface State {
    iEndreModus: boolean;
}

class OppgaveKort extends React.Component<Props, State> {
    state = {
        iEndreModus: false,
    };

    settEndreModus = (modus: boolean) => {
        this.setState({ iEndreModus: modus });
    };

    lagreOppgave = async (oppgave: Oppgave) => {
        await this.props.lagreOppgave(oppgave);
        this.settEndreModus(false);
    };

    endreOppgave = () => {
        this.settEndreModus(true);
    };

    slettOppgave = () => {
        if (
            window.confirm('Er du sikker på at du vil slette denne oppgaven?')
        ) {
            return this.props.slettOppgave(this.props.oppgave);
        }
    };

    render() {
        return (
            <Innholdsboks className="oppgavekort">
                {this.state.iEndreModus ? (
                    <RedigerOppgave
                        defaultOppgave={this.props.oppgave}
                        lagreOppgave={this.lagreOppgave}
                    />
                ) : (
                    <LagretOppgave
                        oppgave={this.props.oppgave}
                        endreOnClick={this.endreOppgave}
                        slettOnClick={this.slettOppgave}
                    />
                )}
            </Innholdsboks>
        );
    }
}

export default OppgaveKort;
