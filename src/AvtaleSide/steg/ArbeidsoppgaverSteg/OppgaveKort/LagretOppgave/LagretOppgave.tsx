import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Oppgave } from '@/types/avtale';
import KnappMedIkon from '@/komponenter/KnappMedIkon/KnappMedIkon';
import SkjemaUndertittel from '@/komponenter/form/SkjemaUndertittel';
import KortKnapper from '@/komponenter/kort/KortKnapper';
import TekstBlokk from '@/komponenter/typografi/TekstBlokk';

interface Props {
    oppgave: Oppgave;
    endreOnClick: () => void;
    slettOnClick: () => void;
}

const LagretOppgave = (props: Props) => (
    <>
        <SkjemaUndertittel>{props.oppgave.tittel}</SkjemaUndertittel>
        <Normaltekst className="oppgavekort__label">Beskrivelse av arbeidsoppgave</Normaltekst>
        <TekstBlokk>{props.oppgave.beskrivelse}</TekstBlokk>
        <Normaltekst className="oppgavekort__label">Opplæring i arbeidsoppgave</Normaltekst>
        <TekstBlokk>{props.oppgave.opplaering}</TekstBlokk>
        <KortKnapper>
            <KnappMedIkon ikonType="blyant" label="Endre" onClick={props.endreOnClick} />
            <KnappMedIkon ikonType="soppelkasse" label="Slett" onClick={props.slettOnClick} />
        </KortKnapper>
    </>
);

export default LagretOppgave;
