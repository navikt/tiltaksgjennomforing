import * as React from 'react';
import { Avtale } from '../../../avtale';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { Normaltekst } from 'nav-frontend-typografi';
import moment from 'moment';
import VarighetIkon from "./VarighetIkon";

interface Props {
    avtale: Avtale;
}

const VarighetOppsummering = (props: Props) => {
    const startdato = moment(props.avtale.startDato).format('DD.MM.YYYY');
    const ukeUker = props.avtale.arbeidstreningLengde > 1 ? 'uker' : 'uke';

    return (
        <Stegoppsummering ikon={<VarighetIkon/>} tittel="Varighet">
            <Normaltekst className="oppsummering__label">
                Tidsperiode
            </Normaltekst>
            <Normaltekst className="oppsummering__beskrivelse">
                {props.avtale.arbeidstreningStillingprosent}% stilling i{' '}
                {props.avtale.arbeidstreningLengde} {ukeUker} fra {startdato}.
            </Normaltekst>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
