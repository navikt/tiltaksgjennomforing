import * as React from 'react';
import { Avtale } from '../../avtale';
import Stegoppsummering from './Stegoppsummering/Stegoppsummering';
import { Normaltekst } from 'nav-frontend-typografi';
import moment from 'moment';

interface Props {
    avtale: Avtale;
}

const VarighetOppsummering = (props: Props) => {
    const startdato = moment(props.avtale.startDato).format('DD.MM.YYYY');

    return (
        <Stegoppsummering tittel="Varighet">
            <Normaltekst className="oppsummering__label">
                Tidsperiode
            </Normaltekst>
            <Normaltekst className="oppsummering__beskrivelse">
                {props.avtale.arbeidstreningStillingprosent}% stilling i{' '}
                {props.avtale.arbeidstreningLengde} uker fra {startdato}.
            </Normaltekst>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
