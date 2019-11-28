import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import Datovelger from './Datovelger/Datovelger';
import moment, { Moment } from 'moment';
import { Normaltekst } from 'nav-frontend-typografi';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import StillingsprosentInput from './StillingsprosentInput/StillingsprosentInput';
import InfoBoks from './InfoBoks/InfoBoks';
import './VarighetSteg.less';
import BEMHelper from '@/utils/bem';
import { Varighet } from '@/types/avtale';
import { medContext } from '@/AvtaleContext';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Column, Container, Row } from 'nav-frontend-grid';
import { accurateHumanize } from '@/utils/datoUtils';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';

const VarighetSteg: FunctionComponent<InputStegProps<Varighet>> = props => {
    const [startDatoRiktigFormatert, setStartDatoRiktigFormatert] = useState<boolean>(true);
    const [sluttDatoRiktigFormatert, setSluttDatoRiktigFormatert] = useState<boolean>(true);

    const velgStartDato = (dato: Moment) => {
        setStartDatoRiktigFormatert(true);
        props.settAvtaleVerdi('startDato', dato.toISOString(true).split('+')[0]);
    };

    const velgSluttDato = (dato: Moment) => {
        setSluttDatoRiktigFormatert(true);
        props.settAvtaleVerdi('sluttDato', dato.toISOString(true).split('+')[0]);
    };

    const timerIUka = Number(((37.5 * props.avtale.stillingprosent) / 100).toFixed(2));

    const dagerIUka = Number(((timerIUka / 37.5) * 5).toFixed(2));

    const cls = BEMHelper('arbeidstidsteg');
    const duration = moment(props.avtale.sluttDato).diff(props.avtale.startDato, 'days');
    const avtaleDuration = duration ? accurateHumanize(moment.duration(duration, 'days'), 3) : undefined;
    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <Container fluid={true}>
                <Row className="">
                    <Column md="12">
                        <SkjemaTittel>Arbeidstid og varighet</SkjemaTittel>
                    </Column>
                </Row>
                <Row className="">
                    <Column md="6">
                        <Normaltekst>Startdato</Normaltekst>
                        <Datovelger
                            className={cls.element('datovelger')}
                            velgDato={velgStartDato}
                            dato={moment(props.avtale.startDato)}
                            settRiktigFormatert={() => setStartDatoRiktigFormatert(true)}
                            inputRiktigFormatert={startDatoRiktigFormatert}
                        />
                    </Column>
                    <Column md="6">
                        <Normaltekst>Sluttdato</Normaltekst>
                        <Datovelger
                            className={cls.element('datovelger')}
                            velgDato={velgSluttDato}
                            dato={moment(props.avtale.sluttDato)}
                            settRiktigFormatert={() => setSluttDatoRiktigFormatert(true)}
                            inputRiktigFormatert={sluttDatoRiktigFormatert}
                        />
                    </Column>
                </Row>

                <StillingsprosentInput
                    label="Hvilken stillingsprosent skal deltakeren ha?"
                    verdi={props.avtale.stillingprosent}
                    settVerdi={verdi => props.settAvtaleVerdi('stillingprosent', verdi)}
                />
                <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} varighet={avtaleDuration} />
                <LagreKnapp
                    className={cls.element('lagre-knapp')}
                    label={'Lagre'}
                    lagre={props.lagreAvtale}
                    suksessmelding={'Avtale lagret'}
                />
            </Container>
        </Innholdsboks>
    );
};

export default medContext(VarighetSteg);
