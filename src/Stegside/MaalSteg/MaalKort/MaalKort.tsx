import * as React from 'react';
import { Maal } from '../../avtale';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import './MaalKort.less';
import { Knapp } from 'nav-frontend-knapper';

interface Props {
    maal: Maal;
    endreMaal: (maal: Maal) => void;
    slettMaal: (maal: Maal) => void;
}

const strek = <div className="maalkort__strek" />;

const MaalKort = (props: Props) => (
    <Innholdsboks>
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
                onClick={() => props.endreMaal(props.maal)}
                htmlType="button"
            >
                Endre
            </Knapp>
            <Knapp
                onClick={() => props.slettMaal(props.maal)}
                htmlType="button"
            >
                Slett
            </Knapp>
        </div>
    </Innholdsboks>
);

export default MaalKort;
