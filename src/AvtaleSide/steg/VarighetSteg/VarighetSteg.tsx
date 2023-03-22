import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import { accurateHumanize, erDatoTilbakeITid, formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { genererFnrdatostringFraFnr, VellykketGenerertIsoDatoString } from '@/utils/fnrUtils';
import { Alert, BodyShort } from '@navikt/ds-react';
import moment from 'moment';
import 'moment/locale/nb';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import InfoBoks from './InfoBoks/InfoBoks';
import StillingsprosentInput from './StillingsprosentInput/StillingsprosentInput';
import Datovelger from '@/komponenter/datovelger/Datovelger';
import BEMHelper from '@/utils/bem';
import './varighetSteg.less';

const VarighetSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { deltakerFnr, tiltakstype } = avtaleContext.avtale;
    const { startDato } = avtaleContext.avtale.gjeldendeInnhold;
    const cls = BEMHelper('varighetsteg');

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
    }, [startDato, deltakerFnr, tiltakstype, sommerjobbDeltakerOver30VedStartdato, avtaleContext.avtale]);

    return (
        <div className={cls.className}>
            <Innholdsboks utfyller="veileder_og_arbeidsgiver">
                <Container fluid={true}>
                    <Row className="">
                        <Column md="12">
                            <SkjemaTittel>Oppstart og varighet</SkjemaTittel>
                            <BodyShort size="small" className={cls.element('ingress-sommerjobb')}>
                                {['SOMMERJOBB'].includes(avtaleContext.avtale.tiltakstype) ? (
                                    <>
                                        Tiltaket må ha oppstart i perioden 1/6 - 31/8. Fyll ut startdato og forventet
                                        sluttdato. Veileder kan sette startdato 7 dager før dagens dato, mens beslutter
                                        kan åpne opp for etterregistrering lenger tilbake i tid.
                                    </>
                                ) : (
                                    <>
                                        Fyll ut startdato og forventet sluttdato. Bare veileder kan sette dato før
                                        dagens dato.
                                    </>
                                )}
                                <> Hvor lenge det er behov for tiltaket må vurderes underveis i perioden.</>
                                {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(
                                    avtaleContext.avtale.tiltakstype
                                ) && (
                                    <>
                                        {' '}
                                        Godkjent tilskuddsperiode er styrende i henhold til økonomisk forpliktelse fra
                                        NAV og kan avvike fra avtalt periode for tiltaksgjennomføringen.
                                    </>
                                )}
                            </BodyShort>
                        </Column>
                    </Row>
                    {innloggetBruker.erNavAnsatt && (
                        <Row>
                            <Column md="12">
                                <Alert variant="info" className={cls.element('info-veileder')}>
                                    <BodyShort size="small">
                                        Hvis startdato er tidligere enn 7 dager tilbake i tid, må du først be beslutter
                                        om å åpne opp for etterregistrering før du kan velge startdato i avtalen. Send
                                        med avtalenummeret til beslutter.
                                    </BodyShort>
                                </Alert>
                            </Column>
                        </Row>
                    )}
                    <Row className="">
                        {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(
                            avtaleContext.avtale.tiltakstype
                        ) &&
                            moment(avtaleContext.avtale.gjeldendeInnhold.startDato).isBefore('2023-02-01') &&
                            !avtaleContext.avtale.erRyddeAvtale &&
                            innloggetBruker.erNavAnsatt && (
                                <>
                                    <Alert variant="warning" className={cls.element('info-arena-opprydding-alert')}>
                                        <div className={cls.element('info-arena-opprydding-container')}>
                                            <div className={cls.element('info-arena-opprydding-avsnitt')}>
                                                Du har oppgitt startdato som er før 01.02.2023 uten å huke av for at
                                                avtalen skal overføres fra arena. Dette vil dermed bli behandlet som en
                                                ny avtale, som aldri har vært behandlet i Arena før, med
                                                tilsagn/tilskuddsperioder fra{' '}
                                                {formatterDato(
                                                    avtaleContext.avtale.gjeldendeInnhold.startDato!,
                                                    NORSK_DATO_FORMAT
                                                )}
                                                .
                                            </div>
                                            <div className={cls.element('info-arena-opprydding-avsnitt')}>
                                                Hvis dette er en avtale som tidligere har vært behandlet i Arena, må du
                                                annullere denne og opprette en ny, hvor du huker av for at avtalen skal
                                                overføres fra Arena.
                                            </div>
                                        </div>
                                    </Alert>
                                </>
                            )}
                        <Column md="6">
                            <Datovelger datoFelt="startDato" label="Startdato" />
                        </Column>
                        <Column md="6">
                            <Datovelger datoFelt="sluttDato" label="Forventet sluttdato" />
                        </Column>
                    </Row>
                    {sommerjobbDeltakerOver30VedStartdato && (
                        <>
                            <Alert variant="warning" className={cls.element('sommerjobb-deltaker-over30-alert')}>
                                Deltaker kan ikke ha fylt 30år før startdatoen. Det vil ikke være mulig å starte opp
                                avtalen.
                            </Alert>
                        </>
                    )}
                    {(erDatoTilbakeITid(avtaleContext.avtale.gjeldendeInnhold.startDato) ||
                        erDatoTilbakeITid(avtaleContext.avtale.gjeldendeInnhold.sluttDato)) && (
                        <>
                            {erArbeidsgiverOgUfordelt && (
                                <SkjemaelementFeilmelding className={cls.element('er-arbeidsgiver-ufordelt')}>
                                    Dato kan ikke være tilbake i tid
                                </SkjemaelementFeilmelding>
                            )}
                            {!erArbeidsgiverOgUfordelt && (
                                <Alert variant="info" className={cls.element('er-arbeidsgiver-ikke-ufordelt')}>
                                    Obs! Datoen er tilbake i tid.
                                </Alert>
                            )}
                        </>
                    )}
                    <Row>
                        <Column md="12">{''}</Column>
                    </Row>
                    {avtaleContext.avtale.tiltakstype !== 'MENTOR' && (
                        <div className={cls.element('input-wrapper')}>
                            <div className={cls.element('input-container')}>
                                <div className={cls.element('Stillingsprosent-input-container')}>
                                    <StillingsprosentInput
                                        label="Hvilken stillingsprosent skal deltakeren ha?"
                                        verdi={avtaleContext.avtale.gjeldendeInnhold.stillingprosent}
                                        size="medium"
                                        settVerdi={(verdi) =>
                                            avtaleContext.settAvtaleInnholdVerdi('stillingprosent', verdi)
                                        }
                                    />
                                </div>
                                <PakrevdInput
                                    size="medium"
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
                            </div>
                            <VerticalSpacer rem={2} />
                            <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} varighet={avtaleDuration} />
                        </div>
                    )}
                    <VerticalSpacer rem={2} />
                    <LagreKnapp label={'Lagre'} lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'} />
                </Container>
            </Innholdsboks>
        </div>
    );
};

export default VarighetSteg;
