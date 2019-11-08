import * as _ from 'lodash';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import Datovelger from './Datovelger/Datovelger';
import moment, { Moment } from 'moment';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import StillingsprosentInput from './StillingsprosentInput/StillingsprosentInput';
import InfoBoks from './InfoBoks/InfoBoks';
import './VarighetSteg.less';
import BEMHelper from '@/utils/bem';
import { Varighet } from '@/types/avtale';
import { medContext } from '@/AvtaleContext';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Column, Container, Row } from 'nav-frontend-grid';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { accurateHumanize } from '@/utils/datoUtils';

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
            <Systemtittel className={cls.element('tittel')} tag="h2">
                Arbeidstid og oppstart
            </Systemtittel>
            <Container fluid={true}>
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
            </Container>
            <VerticalSpacer twentyPx={true} />
            <StillingsprosentInput
                label="Hvilken stillingsprosent skal deltakeren ha?"
                verdi={props.avtale.stillingprosent}
                settVerdi={_.partial(props.settAvtaleVerdi, 'stillingprosent')}
            />
            <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} varighet={avtaleDuration}/>
            <LagreKnapp
                className={cls.element('lagre-knapp')}
                label={'Lagre'}
                lagre={props.lagreAvtale}
                suksessmelding={'Avtale lagret'}
            />
        </Innholdsboks>
    );
};

export default medContext(VarighetSteg);
