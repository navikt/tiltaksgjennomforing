import * as React from 'react';
import { Maal } from '../../avtale';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import './MaalKort.less';

interface Props {
    maal: Maal;
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
    </Innholdsboks>
);

export default MaalKort;
