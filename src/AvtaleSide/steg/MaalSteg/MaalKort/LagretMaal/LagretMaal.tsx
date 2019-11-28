import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Maal } from '@/types/avtale';
import KnappMedIkon from '@/komponenter/KnappMedIkon/KnappMedIkon';
import SkjemaUndertittel from '@/komponenter/form/SkjemaUndertittel';
import KortKnapper from '@/komponenter/kort/KortKnapper';
import TekstBlokk from '@/komponenter/typografi/TekstBlokk';

interface Props {
    maal: Maal;
    endreOnClick: () => void;
    slettOnClick: () => void;
}

const LagretMaal = (props: Props) => (
    <>
        <SkjemaUndertittel>{props.maal.kategori}</SkjemaUndertittel>
        <Normaltekst className="maalkort__label">Beskrivelse av mål</Normaltekst>
        <TekstBlokk>{props.maal.beskrivelse}</TekstBlokk>
        <KortKnapper>
            <KnappMedIkon ikonType="blyant" label="Endre" onClick={props.endreOnClick} />
            <KnappMedIkon ikonType="soppelkasse" label="Slett" onClick={props.slettOnClick} />
        </KortKnapper>
    </>
);

export default LagretMaal;
