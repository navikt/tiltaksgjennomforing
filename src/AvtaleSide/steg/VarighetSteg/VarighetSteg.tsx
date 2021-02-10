import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Varighet } from '@/types/avtale';
import { accurateHumanize, erDatoTilbakeITid } from '@/utils/datoUtils';
import moment from 'moment';
import 'moment/locale/nb';
import { Datovelger } from 'nav-datovelger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Column, Container, Row } from 'nav-frontend-grid';
import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import InfoBoks from './InfoBoks/InfoBoks';
import StillingsprosentInput from './StillingsprosentInput/StillingsprosentInput';

const VarighetSteg: FunctionComponent = () => {
    const avtaleContext: InputStegProps<Varighet> = useContext(AvtaleContext);

    const timerIUka = Number(((37.5 * (avtaleContext.avtale.stillingprosent || 0)) / 100).toFixed(2));
    const dagerIUka = Number(((timerIUka / 37.5) * 5).toFixed(2));

    const duration = moment(avtaleContext.avtale.sluttDato).diff(avtaleContext.avtale.startDato, 'days');
    const avtaleDuration = duration ? accurateHumanize(moment.duration(duration, 'days'), 3) : undefined;
    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <Container fluid={true}>
                <Row className="">
                    <Column md="12">
                        <SkjemaTittel>Oppstart og varighet</SkjemaTittel>
                    </Column>
                </Row>
                <Row className="">
                    <Column md="6">
                        <label className="skjemaelement__label">Startdato</label>
                        <Datovelger
                            input={{ placeholder: 'dd.mm.åååå' }}
                            valgtDato={avtaleContext.avtale.startDato}
                            onChange={dato => avtaleContext.settAvtaleVerdier({ startDato: dato })}
                        />
                    </Column>
                    <Column md="6">
                        <label className="skjemaelement__label">Sluttdato</label>
                        <Datovelger
                            input={{ placeholder: 'dd.mm.åååå' }}
                            valgtDato={avtaleContext.avtale.sluttDato}
                            onChange={dato => avtaleContext.settAvtaleVerdier({ sluttDato: dato })}
                        />
                    </Column>
                </Row>
                {(erDatoTilbakeITid(avtaleContext.avtale.startDato) ||
                    erDatoTilbakeITid(avtaleContext.avtale.sluttDato)) && (
                    <>
                        <VerticalSpacer rem={1} />
                        <AlertStripeInfo>Obs! Datoen er tilbake i tid.</AlertStripeInfo>
                    </>
                )}
                <Row>
                    <Column md="12"></Column>
                </Row>
                <VerticalSpacer sixteenPx={true} />
                <StillingsprosentInput
                    label="Hvilken stillingsprosent skal deltakeren ha?"
                    verdi={avtaleContext.avtale.stillingprosent}
                    settVerdi={verdi => avtaleContext.settAvtaleVerdi('stillingprosent', verdi)}
                />
                <VerticalSpacer thirtyTwoPx={true} />
                <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} varighet={avtaleDuration} />
                <VerticalSpacer thirtyTwoPx={true} />
                <LagreKnapp label={'Lagre'} lagre={avtaleContext.sjekkOgLagreAvtale} suksessmelding={'Avtale lagret'} />
            </Container>
        </Innholdsboks>
    );
};

export default VarighetSteg;
