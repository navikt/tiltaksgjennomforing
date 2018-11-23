import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Maal } from '../../../avtale';
import KnappMedIkon from './KnappMedIkon/KnappMedIkon';
import redigerIkon from './rediger-penn.svg';
import slettIkon from './soppeldunk.svg';

interface Props {
    maal: Maal;
    endreOnClick: () => void;
    slettOnClick: () => void;
}

const strek = <div className="maalkort__strek" />;

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
        {strek}
        <div className="maalkort__knapper-wrapper">
            <KnappMedIkon
                ikon={redigerIkon}
                label="Endre"
                onClick={props.endreOnClick}
            />
            <KnappMedIkon
                ikon={slettIkon}
                label="Slett"
                onClick={props.slettOnClick}
            />
        </div>
    </>
);

export default LagretMaal;
