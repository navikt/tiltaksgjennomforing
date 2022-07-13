import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import { sjekkOmAvtaleErPilot } from '@/services/rest-service';
import { accurateHumanize, erDatoTilbakeITid } from '@/utils/datoUtils';
import { genererFnrdatostringFraFnr, VellykketGenerertIsoDatoString } from '@/utils/fnrUtils';
import moment from 'moment';
import 'moment/locale/nb';
import { Datepicker } from 'nav-datovelger';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Column, Container, Row } from 'nav-frontend-grid';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { AvtaleMinMaxDato } from './AvtaleMinMaxDato/AvtaleMinMaxDato';
import InfoBoks from './InfoBoks/InfoBoks';
import StillingsprosentInput from './StillingsprosentInput/StillingsprosentInput';

const VarighetSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { deltakerFnr, tiltakstype } = avtaleContext.avtale;
    const { startDato } = avtaleContext.avtale.gjeldendeInnhold;

    const timerIUka = Number(((37.5 * (avtaleContext.avtale.gjeldendeInnhold.stillingprosent || 0)) / 100).toFixed(2));
    const dagerIUka = Number(((timerIUka / 37.5) * 5).toFixed(2));

    const duration =
        moment(avtaleContext.avtale.gjeldendeInnhold.sluttDato).diff(
            avtaleContext.avtale.gjeldendeInnhold.startDato,
            'days'
        ) + 1;
    const avtaleDuration = duration ? accurateHumanize(moment.duration(duration, 'days'), 3) : undefined;

    const erArbeidsgiverOgUfordelt = !innloggetBruker.erNavAnsatt && avtaleContext.avtale.erUfordelt;
    const [sommerjobbDeltakerOver30VedStartdato, setSommerjobbDeltakerOver30VedStartdato] = useState(false);

    const [erPilot, setErPilot] = useState<boolean>();

    useEffect(() => {
        if (tiltakstype === 'SOMMERJOBB' && startDato) {
            const isoDato: VellykketGenerertIsoDatoString = genererFnrdatostringFraFnr(deltakerFnr);
            if (isoDato.vellykketgenerering) {
                const momentDato = moment(isoDato.isoDatostring).add(30, 'years').format('YYYY-MM-DD');
                if (moment(startDato).diff(momentDato) >= 0) {
                    setSommerjobbDeltakerOver30VedStartdato(true);
                } else {
                    setSommerjobbDeltakerOver30VedStartdato(false);
                }
            }
        }
        if (tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || tiltakstype === 'VARIG_LONNSTILSKUDD') {
            sjekkOmAvtaleErPilot(avtaleContext.avtale).then(setErPilot);
        }
    }, [startDato, deltakerFnr, tiltakstype, sommerjobbDeltakerOver30VedStartdato, avtaleContext.avtale]);
    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <Container fluid={true}>
                <Row className="">
                    <Column md="12">
                        <SkjemaTittel>Oppstart og varighet</SkjemaTittel>
                        <Normaltekst>
                            {['SOMMERJOBB'].includes(avtaleContext.avtale.tiltakstype) && (
                                <> Tiltaket må ha oppstart i perioden 1/6 - 31/8. </>
                            )}{' '}
                            Fyll ut startdato og forventet sluttdato. Bare veileder kan sette dato før dagens dato. Hvor
                            lenge det er behov for tiltaket vil vurderes underveis i perioden.
                            {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(
                                avtaleContext.avtale.tiltakstype
                            ) && (
                                <>
                                    {' '}
                                    Godkjent tilskuddsperiode {!erPilot && <>i tilskuddsbrevet</>} er styrende i henhold
                                    til økonomisk forpliktelse fra NAV og kan avvike fra avtalt periode for
                                    tiltaksgjennomføringen.
                                </>
                            )}
                        </Normaltekst>
                        <VerticalSpacer rem={2} />
                    </Column>
                </Row>
                <Row className="">
                    <Column md="6">
                        <label className="skjemaelement__label">Startdato</label>
                        <Datepicker
                            inputProps={{ placeholder: 'dd.mm.åååå' }}
                            value={avtaleContext.avtale.gjeldendeInnhold.startDato || undefined}
                            limitations={AvtaleMinMaxDato(true)}
                            onChange={(dato) => avtaleContext.settAvtaleInnholdVerdier({ startDato: dato })}
                        />
                    </Column>
                    <Column md="6">
                        <label className="skjemaelement__label">Forventet sluttdato</label>
                        <Datepicker
                            inputProps={{ placeholder: 'dd.mm.åååå' }}
                            value={avtaleContext.avtale.gjeldendeInnhold.sluttDato || undefined}
                            limitations={AvtaleMinMaxDato(false)}
                            onChange={(dato) => avtaleContext.settAvtaleInnholdVerdier({ sluttDato: dato })}
                        />
                    </Column>
                </Row>
                {sommerjobbDeltakerOver30VedStartdato && (
                    <>
                        <VerticalSpacer rem={1} />
                        <AlertStripeAdvarsel>
                            Deltaker kan ikke ha fylt 30år før startdatoen. Det vil ikke være mulig å starte opp
                            avtalen.
                        </AlertStripeAdvarsel>
                    </>
                )}
                {(erDatoTilbakeITid(avtaleContext.avtale.gjeldendeInnhold.startDato) ||
                    erDatoTilbakeITid(avtaleContext.avtale.gjeldendeInnhold.sluttDato)) && (
                    <>
                        <VerticalSpacer rem={1} />
                        {erArbeidsgiverOgUfordelt && (
                            <SkjemaelementFeilmelding>Dato kan ikke være tilbake i tid</SkjemaelementFeilmelding>
                        )}
                        {!erArbeidsgiverOgUfordelt && <AlertStripeInfo>Obs! Datoen er tilbake i tid.</AlertStripeInfo>}
                    </>
                )}
                <Row>
                    <Column md="12">{''}</Column>
                </Row>
                {avtaleContext.avtale.tiltakstype !== 'MENTOR' && (
                    <>
                        <VerticalSpacer rem={1} />
                        <StillingsprosentInput
                            label="Hvilken stillingsprosent skal deltakeren ha?"
                            verdi={avtaleContext.avtale.gjeldendeInnhold.stillingprosent}
                            settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('stillingprosent', verdi)}
                        />
                        <VerticalSpacer rem={1} />
                        <PakrevdInput
                            bredde="S"
                            label="Antall dager per uke"
                            type="number"
                            max={7}
                            verdi={avtaleContext.avtale.gjeldendeInnhold.antallDagerPerUke}
                            settVerdi={(eventVerdi) => {
                                const verdi = parseInt(eventVerdi, 10);
                                if (verdi > 0 && verdi < 8) {
                                    avtaleContext.settAvtaleInnholdVerdi('antallDagerPerUke', verdi);
                                } else {
                                    avtaleContext.settAvtaleInnholdVerdi('antallDagerPerUke', undefined);
                                }
                            }}
                        />
                        <VerticalSpacer rem={2} />
                        <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} varighet={avtaleDuration} />
                    </>
                )}
                <VerticalSpacer rem={2} />
                <LagreKnapp label={'Lagre'} lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'} />
            </Container>
        </Innholdsboks>
    );
};

export default VarighetSteg;
