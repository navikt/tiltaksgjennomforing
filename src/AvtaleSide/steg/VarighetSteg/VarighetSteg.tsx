import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import { accurateHumanize, erDatoTilbakeITid } from '@/utils/datoUtils';
import moment from 'moment';
import 'moment/locale/nb';
import { Datovelger } from 'nav-datovelger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Column, Container, Row } from 'nav-frontend-grid';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import InfoBoks from './InfoBoks/InfoBoks';
import StillingsprosentInput from './StillingsprosentInput/StillingsprosentInput';

const VarighetSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const timerIUka = Number(((37.5 * (avtaleContext.avtale.stillingprosent || 0)) / 100).toFixed(2));
    const dagerIUka = Number(((timerIUka / 37.5) * 5).toFixed(2));

    const duration = moment(avtaleContext.avtale.sluttDato).diff(avtaleContext.avtale.startDato, 'days');
    const avtaleDuration = duration ? accurateHumanize(moment.duration(duration, 'days'), 3) : undefined;

    const erArbeidsgiverOgUfordelt = !innloggetBruker.erNavAnsatt && avtaleContext.avtale.erUfordelt;
    const arbgiverDatoGrense = erArbeidsgiverOgUfordelt ? { minDato: new Date().toISOString() } : {};

    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <Container fluid={true}>
                <Row className="">
                    <Column md="12">
                        <SkjemaTittel>Oppstart og varighet</SkjemaTittel>
                        <Normaltekst>
                            Fyll ut startdato og forventet sluttdato. Bare veileder kan sette dato før dagens dato. Hvor
                            lenge det er behov for tiltaket vil vurderes underveis i perioden.
                        </Normaltekst>
                        <VerticalSpacer rem={2} />
                    </Column>
                </Row>
                <Row className="">
                    <Column md="6">
                        <label className="skjemaelement__label">Startdato</label>
                        <Datovelger
                            input={{ placeholder: 'dd.mm.åååå' }}
                            valgtDato={avtaleContext.avtale.startDato}
                            avgrensninger={arbgiverDatoGrense}
                            onChange={dato => avtaleContext.settAvtaleVerdier({ startDato: dato })}
                        />
                    </Column>
                    <Column md="6">
                        <label className="skjemaelement__label">Forventet sluttdato</label>
                        <Datovelger
                            input={{ placeholder: 'dd.mm.åååå' }}
                            valgtDato={avtaleContext.avtale.sluttDato}
                            avgrensninger={arbgiverDatoGrense}
                            onChange={dato => avtaleContext.settAvtaleVerdier({ sluttDato: dato })}
                        />
                    </Column>
                </Row>
                {(erDatoTilbakeITid(avtaleContext.avtale.startDato) ||
                    erDatoTilbakeITid(avtaleContext.avtale.sluttDato)) && (
                    <>
                        <VerticalSpacer rem={1} />
                        {erArbeidsgiverOgUfordelt && (
                            <SkjemaelementFeilmelding feil={{ feilmelding: 'Dato kan ikke være tilbake i tid' }} />
                        )}
                        {!erArbeidsgiverOgUfordelt && avtaleContext.avtale.versjoner.length === 1 && (
                            <AlertStripeInfo>Obs! Datoen er tilbake i tid.</AlertStripeInfo>
                        )}
                    </>
                )}
                <Row>
                    <Column md="12"></Column>
                </Row>
                <VerticalSpacer rem={1} />
                <StillingsprosentInput
                    label="Hvilken stillingsprosent skal deltakeren ha?"
                    verdi={avtaleContext.avtale.stillingprosent}
                    settVerdi={verdi => avtaleContext.settAvtaleVerdi('stillingprosent', verdi)}
                />
                <VerticalSpacer rem={1} />
                <PakrevdInput
                    bredde="S"
                    label="Antall dager per uke"
                    type="number"
                    max={7}
                    verdi={avtaleContext.avtale.antallDagerPerUke}
                    settVerdi={eventVerdi => {
                        const verdi = parseInt(eventVerdi);
                        if (verdi > 0 && verdi < 8) {
                            avtaleContext.settAvtaleVerdi('antallDagerPerUke', verdi);
                        } else {
                            avtaleContext.settAvtaleVerdi('antallDagerPerUke', undefined);
                        }
                    }}
                />

                <VerticalSpacer rem={2} />
                <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} varighet={avtaleDuration} />
                <VerticalSpacer rem={2} />
                <LagreKnapp label={'Lagre'} lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'} />
            </Container>
        </Innholdsboks>
    );
};

export default VarighetSteg;
