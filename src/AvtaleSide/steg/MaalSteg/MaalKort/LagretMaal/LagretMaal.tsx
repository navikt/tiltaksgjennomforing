import * as React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { Maal } from '@/types/avtale';
import KnappMedIkon from '@/komponenter/KnappMedIkon/KnappMedIkon';
import SkjemaUndertittel from '@/komponenter/form/SkjemaUndertittel';
import KortKnapper from '@/komponenter/kort/KortKnapper';
import TekstBlokk from '@/komponenter/typografi/TekstBlokk';
import { FormattedMessage } from 'react-intl';

interface Props {
    maal: Maal;
    endreOnClick: () => void;
    slettOnClick: () => void;
}

const LagretMaal = (props: Props) => (
    <>
        <SkjemaUndertittel>
            <FormattedMessage id={props.maal.kategori} />
        </SkjemaUndertittel>
        <BodyShort size="small" className="maalkort__label">
            Beskrivelse av mål
        </BodyShort>
        <TekstBlokk>{props.maal.beskrivelse}</TekstBlokk>
        <KortKnapper>
            <KnappMedIkon ikonType="blyant" label="Endre" onClick={props.endreOnClick} />
            <KnappMedIkon ikonType="soppelkasse" label="Slett" onClick={props.slettOnClick} />
        </KortKnapper>
    </>
);

export default LagretMaal;
