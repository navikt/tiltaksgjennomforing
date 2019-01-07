import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Oppgave } from '../../../avtale';
import KnappMedIkon from '../../../../komponenter/KnappMedIkon/KnappMedIkon';

interface Props {
    oppgave: Oppgave;
    endreOnClick: () => void;
    slettOnClick: () => void;
}

const LagretOppgave = (props: Props) => (
    <>
        <Undertittel className="oppgavekort__tittel">
            {props.oppgave.tittel}
        </Undertittel>
        <Normaltekst className="oppgavekort__label">
            Beskrivelse av arbeidsoppgave
        </Normaltekst>
        <Normaltekst className="oppgavekort__beskrivelse">
            {props.oppgave.beskrivelse}
        </Normaltekst>
        <Normaltekst className="oppgavekort__label">
            Opplæring i arbeidsoppgave
        </Normaltekst>
        <Normaltekst className="oppgavekort__opplaering">
            {props.oppgave.opplaering}
        </Normaltekst>
        <div className="oppgavekort__knapper-wrapper">
            <KnappMedIkon
                ikonType="blyant"
                label="Endre"
                onClick={props.endreOnClick}
            />
            <KnappMedIkon
                ikonType="soppelkasse"
                label="Slett"
                onClick={props.slettOnClick}
            />
        </div>
    </>
);

export default LagretOppgave;
