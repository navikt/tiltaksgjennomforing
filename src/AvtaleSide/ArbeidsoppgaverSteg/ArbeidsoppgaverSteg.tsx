import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import OpprettOppgave from './OpprettOppgave/OpprettOppgave';
import OppgaveKort from './OppgaveKort/OppgaveKort';

const ArbeidsoppgaverSteg = (props: Context) => {
    const oppgaver = props.avtale.oppgaver.map(oppgave => (
        <OppgaveKort
            oppgave={oppgave}
            key={oppgave.id}
            lagreOppgave={props.lagreOppgave}
            slettOppgave={props.slettOppgave}
        />
    ));

    return (
        <>
            <OpprettOppgave lagreOppgave={props.lagreOppgave} />
            {oppgaver}
        </>
    );
};

export default medContext<{}>(ArbeidsoppgaverSteg);
