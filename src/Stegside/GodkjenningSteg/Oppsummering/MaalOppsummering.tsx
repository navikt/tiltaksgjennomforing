import * as React from 'react';
import { Avtale } from '../../avtale';
import { Normaltekst } from 'nav-frontend-typografi';
import Stegoppsummering from './Stegoppsummering/Stegoppsummering';

interface Props {
    avtale: Avtale;
}

const MaalOppsummering = (props: Props) => {
    const maalListe = props.avtale.maal.map(maal => (
        <div key={maal.id}>
            <Normaltekst className="oppsummering__label">
                {maal.kategori}
            </Normaltekst>
            <Normaltekst className="oppsummering__beskrivelse">
                {maal.beskrivelse}
            </Normaltekst>
        </div>
    ));
    return <Stegoppsummering tittel="Mål">{maalListe}</Stegoppsummering>;
};

export default MaalOppsummering;
