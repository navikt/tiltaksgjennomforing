import * as React from 'react';
import { Avtale } from '../../../avtale';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { Normaltekst } from 'nav-frontend-typografi';
import moment from 'moment';
import VarighetIkon from './VarighetIkon';
import { AvtaleRad } from '../Avtaleparter/Avtaleparter';
import BEMHelper from '../../../../utils/bem';
import './varighet.less';

const cls = BEMHelper('varighetOppsummering');

interface Props {
    avtale: Avtale;
}

/*
* startDato: number;
    arbeidstreningLengde: number;
    arbeidstreningStillingprosent: number;
* */

const VarighetOppsummering = ({ avtale }: { avtale: Avtale }) => {
    const {startDato, arbeidstreningLengde, arbeidstreningStillingprosent } = avtale;

    const startdato = moment(startDato).format('DD.MM.YYYY');
    const ukeUker = arbeidstreningLengde > 1 ? 'uker' : 'uke';

    return (
        <Stegoppsummering ikon={<VarighetIkon />} tittel="Dato og arbeidstid">
            <AvtaleRad
                clsName="varighetOppsummering"
                labelKolEn="Startdato"
                navnKolEn={startdato}
                labelKolTo="Varighet"
                navnKolTo={`${arbeidstreningLengde ? arbeidstreningLengde.toString() : ''} ${ukeUker}`}
            />

            <Normaltekst className="oppsummering__label">
                Tidsperiode
            </Normaltekst>
            <Normaltekst className="oppsummering__beskrivelse">
                {arbeidstreningStillingprosent}% stilling i{' '}
                {arbeidstreningLengde} {ukeUker} fra {startdato}.
            </Normaltekst>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
