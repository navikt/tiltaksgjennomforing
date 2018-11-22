import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { Maal } from '../../avtale';

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
            <Knapp
                className="maalkort__endreknapp"
                onClick={props.endreOnClick}
                htmlType="button"
            >
                Endre
            </Knapp>
            <Knapp onClick={props.slettOnClick} htmlType="button">
                Slett
            </Knapp>
        </div>
    </>
);

export default LagretMaal;
