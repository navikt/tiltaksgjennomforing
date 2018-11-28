import { Knapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import * as moment from 'moment';
import { Context, medContext } from '../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import Stegoppsummering from './Stegoppsummering/Stegoppsummering';

const GodkjenningSteg = (props: Context) => {
    // tslint:disable
    const {
        startDatoTimestamp,
        deltakerFornavn,
        deltakerEtternavn,
        bedriftNavn,
        arbeidsgiverFornavn,
        arbeidsgiverEtternavn,
        veilederFornavn,
        veilederEtternavn,
        arbeidstreningLengde,
        arbeidstreningStillingprosent,
        bekreftetAvArbeidsgiver,
        bekreftetAvBruker,
        bekreftetAvVeileder,
    } = props.avtale;
    // tslint:enable
    const startdato = moment(startDatoTimestamp).format('DD.MM.YYYY');

    const kontaktInfo = (
        <>
            <Systemtittel>Godkjenning av avtale</Systemtittel>
            <Normaltekst>
                Dette er en avtale inngått av følgende parter:
            </Normaltekst>
            <Normaltekst>Deltaker</Normaltekst>
            <Normaltekst
            >{`${deltakerFornavn} ${deltakerEtternavn}`}</Normaltekst>
            <Normaltekst>Arbeidsgiver</Normaltekst>
            <Normaltekst
            >{`${bedriftNavn} v/${arbeidsgiverFornavn} ${arbeidsgiverEtternavn}`}</Normaltekst>
            <Normaltekst>NAV</Normaltekst>
            <Normaltekst
            >{`${veilederFornavn} ${veilederEtternavn}`}</Normaltekst>
        </>
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
        <>
            <Innholdsboks>
                {kontaktInfo}
                <Stegoppsummering tittel="Varighet">
                    <Normaltekst>Tidsperiode</Normaltekst>
                    <Normaltekst>
                        {arbeidstreningStillingprosent}% stillingsprosent i{' '}
                        {arbeidstreningLengde} uker fra {startdato}.
                    </Normaltekst>
                </Stegoppsummering>

                <Stegoppsummering tittel="Mål">{maalListe}</Stegoppsummering>

                <Stegoppsummering tittel="Arbeidsoppgaver">
                    {arbeidsoppgaver}
                </Stegoppsummering>
            </Innholdsboks>

            <Innholdsboks>
                <PanelBase>
                    <SkjemaGruppe
                        className={'bekreft'}
                        title={'Bekreft innhold i avtalen'}
                    >
                        <div>
                            <Knapp
                                disabled={bekreftetAvBruker}
                                onClick={() =>
                                    props.settAvtaleVerdi(
                                        'bekreftetAvBruker',
                                        true
                                    )
                                }
                            >
                                Bekreft som bruker
                            </Knapp>
                            {props.avtale.bekreftetAvBruker &&
                                'Avtalen er bekreftet av bruker'}
                        </div>
                        <div>
                            <Knapp
                                disabled={bekreftetAvArbeidsgiver}
                                onClick={() =>
                                    props.settAvtaleVerdi(
                                        'bekreftetAvArbeidsgiver',
                                        true
                                    )
                                }
                            >
                                Bekreft som arbeidsgiver
                            </Knapp>
                            {props.avtale.bekreftetAvArbeidsgiver &&
                                'Avtalen er bekreftet av arbeidsgiver'}
                        </div>
                        <div>
                            <Knapp
                                disabled={bekreftetAvVeileder}
                                onClick={() =>
                                    props.settAvtaleVerdi(
                                        'bekreftetAvVeileder',
                                        true
                                    )
                                }
                            >
                                Bekreft som NAV-veileder
                            </Knapp>
                            {bekreftetAvVeileder &&
                                'Avtalen er bekreftet av NAV-veileder'}
                        </div>
                    </SkjemaGruppe>
                </PanelBase>
            </Innholdsboks>
        </>
    );
};

export default medContext(GodkjenningSteg);
