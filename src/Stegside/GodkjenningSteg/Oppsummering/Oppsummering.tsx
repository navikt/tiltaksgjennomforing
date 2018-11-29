import * as React from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Avtale } from '../../avtale';
import * as moment from 'moment';
import Innholdsboks from '../../../komponenter/Innholdsboks/Innholdsboks';
import Avtaleparter from './Avtaleparter/Avtaleparter';
import Stegoppsummering from './Stegoppsummering/Stegoppsummering';
import './Oppsummering.less';

interface Props {
    avtale: Avtale;
}

const Oppsummering = (props: Props) => {
    const startdato = moment(props.avtale.startDatoTimestamp).format(
        'DD.MM.YYYY'
    );

    const maalListe = props.avtale.maal.map(maal => (
        <>
            <Normaltekst className="oppsummering__label">
                {maal.kategori}
            </Normaltekst>
            <Normaltekst className="oppsummering__beskrivelse">
                {maal.beskrivelse}
            </Normaltekst>
        </>
    ));

    const arbeidsoppgaver = props.avtale.oppgaver.map(oppgave => (
        <>
            <Ingress className="oppsummering__oppgave-tittel">
                {oppgave.tittel}
            </Ingress>
            <Normaltekst className="oppsummering__label">
                Hva går arbeidsoppgaven ut på?
            </Normaltekst>
            <Normaltekst className="oppsummering__beskrivelse">
                {oppgave.beskrivelse}
            </Normaltekst>
            <Normaltekst className="oppsummering__label">
                Hvilken opplæring skal deltakeren få?
            </Normaltekst>
            <Normaltekst className="oppsummering__beskrivelse">
                {oppgave.opplaering}
            </Normaltekst>
        </>
    ));

    return (
        <Innholdsboks>
            <Systemtittel className="oppsummering__tittel">
                Godkjenning av avtale
            </Systemtittel>

            <Stegoppsummering tittel="Avtalens parter">
                <Avtaleparter avtale={props.avtale} />
            </Stegoppsummering>

            <Stegoppsummering tittel="Varighet">
                <Normaltekst className="oppsummering__label">
                    Tidsperiode
                </Normaltekst>
                <Normaltekst className="oppsummering__beskrivelse">
                    {props.avtale.arbeidstreningStillingprosent}% stilling i{' '}
                    {props.avtale.arbeidstreningLengde} uker fra {startdato}.
                </Normaltekst>
            </Stegoppsummering>

            <Stegoppsummering tittel="Mål">{maalListe}</Stegoppsummering>

            <Stegoppsummering tittel="Arbeidsoppgaver">
                {arbeidsoppgaver}
            </Stegoppsummering>
        </Innholdsboks>
    );
};

// TODO: medContext?
export default Oppsummering;
