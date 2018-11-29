import * as React from 'react';
import Stegoppsummering from './Stegoppsummering/Stegoppsummering';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import { Avtale } from '../../avtale';

interface Props {
    avtale: Avtale;
}

const OppgaverOppsummering = (props: Props) => {
    const arbeidsoppgaver = props.avtale.oppgaver.map(oppgave => (
        <div key={oppgave.id}>
            <Ingress className="oppsummering__oppgave-tittel">
                {oppgave.tittel}
            </Ingress>
            <Normaltekst className="oppsummering__label">
                Hva går arbeidsoppgaven ut på?
            </Normaltekst>
            <Normaltekst className="oppsummering__beskrivelse">
                {oppgave.beskrivelse}
            </Normaltekst>
            <Normaltekst className="oppsummering__label">
                Hvilken opplæring skal deltakeren få?
            </Normaltekst>
            <Normaltekst className="oppsummering__beskrivelse">
                {oppgave.opplaering}
            </Normaltekst>
        </div>
    ));

    return (
        <Stegoppsummering tittel="Arbeidsoppgaver">
            {arbeidsoppgaver}
        </Stegoppsummering>
    );
};

export default OppgaverOppsummering;
