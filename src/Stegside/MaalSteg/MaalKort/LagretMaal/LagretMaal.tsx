import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Maal } from '../../../avtale';
import KnappMedIkon from '../../../../komponenter/KnappMedIkon/KnappMedIkon';

interface Props {
    maal: Maal;
    endreOnClick: () => void;
    slettOnClick: () => void;
}

const LagretMaal = (props: Props) => (
    <>
        <Undertittel className="maalkort__tittel">
            {props.maal.kategori}
        </Undertittel>
        <Normaltekst className="maalkort__label">
            Beskrivelse av mål
        </Normaltekst>
        <Normaltekst className="maalkort__beskrivelse">
            {props.maal.beskrivelse}
        </Normaltekst>
        <div className="maalkort__knapper-wrapper">
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

export default LagretMaal;
