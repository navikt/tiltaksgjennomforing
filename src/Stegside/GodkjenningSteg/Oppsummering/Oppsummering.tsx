import * as React from 'react';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import { Avtale } from '../../avtale';
import * as moment from 'moment';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import Avtaleparter from './Avtaleparter/Avtaleparter';
import Stegoppsummering from './Stegoppsummering/Stegoppsummering';

interface Props {
    avtale: Avtale;
}

const Oppsummering = (props: Props) => {
    const startdato = moment(props.avtale.startDatoTimestamp).format(
        'DD.MM.YYYY'
    );

    const maalListe = props.avtale.maal.map(maal => (
        <>
            <Normaltekst>{maal.kategori}</Normaltekst>
            <Normaltekst>{maal.beskrivelse}</Normaltekst>
        </>
    ));

    const arbeidsoppgaver = props.avtale.oppgaver.map(oppgave => (
        <>
            <Ingress>{oppgave.tittel}</Ingress>
            <Normaltekst>Hva går arbeidsoppgaven ut på?</Normaltekst>
            <Normaltekst>{oppgave.beskrivelse}</Normaltekst>
            <Normaltekst>Hvilken opplæring skal deltakeren få?</Normaltekst>
            <Normaltekst>{oppgave.opplaering}</Normaltekst>
        </>
    ));

    return (
        <Innholdsboks>
            <Avtaleparter avtale={props.avtale} />

            <Stegoppsummering tittel="Varighet">
                <Normaltekst>Tidsperiode</Normaltekst>
                <Normaltekst>
                    {props.avtale.arbeidstreningStillingprosent}%
                    stillingsprosent i {props.avtale.arbeidstreningLengde} uker
                    fra {startdato}.
                </Normaltekst>
            </Stegoppsummering>

            <Stegoppsummering tittel="Mål">{maalListe}</Stegoppsummering>

            <Stegoppsummering tittel="Arbeidsoppgaver">
                {arbeidsoppgaver}
            </Stegoppsummering>
        </Innholdsboks>
    );
};

export default Oppsummering;
