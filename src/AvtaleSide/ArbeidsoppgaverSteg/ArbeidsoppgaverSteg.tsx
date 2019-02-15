import * as React from 'react';
import ApiError from '../../api-error';
import { Context, medContext } from '../../AvtaleContext';
import { Oppgave } from '../avtale';
import OppgaveKort from './OppgaveKort/OppgaveKort';
import OpprettOppgave from './OpprettOppgave/OpprettOppgave';

const ArbeidsoppgaverSteg = (props: Context) => {
    const slettOppgave = async (oppgave: Oppgave) => {
        try {
            await props.slettOppgave(oppgave);
        } catch (error) {
            if (error instanceof ApiError) {
                props.visFeilmelding(error.message);
            } else {
                throw error;
            }
        }
    };

    const oppgaver = props.avtale.oppgaver.map(oppgave => (
        <OppgaveKort
            oppgave={oppgave}
            key={oppgave.id}
            lagreOppgave={props.lagreOppgave}
            slettOppgave={slettOppgave}
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
