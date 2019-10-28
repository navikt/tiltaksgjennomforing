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
import './ArbeidstidSteg.less';
import BEMHelper from '@/utils/bem';
import { Arbeidstid, Avtale } from '@/types/avtale';
import { medContext } from '@/AvtaleContext';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';

const ArbeidstidSteg: FunctionComponent<InputStegProps<Arbeidstid>> = props => {
    const [startDatoRiktigFormatert, setStartDatoRiktigFormatert] = useState<
        boolean
    >(true);
    const [sluttDatoRiktigFormatert, setSluttDatoRiktigFormatert] = useState<
        boolean
    >(true);

    const velgStartDato = (dato: Moment) => {
        setStartDatoRiktigFormatert(true);
        props.settAvtaleVerdi(
            'startDato',
            dato.toISOString(true).split('+')[0]
        );
    };

    const velgSluttDato = (dato: Moment) => {
        setSluttDatoRiktigFormatert(true);
        props.settAvtaleVerdi(
            'sluttDato',
            dato.toISOString(true).split('+')[0]
        );
    };

    const timerIUka = Number(
        ((37.5 * props.avtale.arbeidstreningStillingprosent) / 100).toFixed(2)
    );

    const dagerIUka = Number(((timerIUka / 37.5) * 5).toFixed(2));

    const cls = BEMHelper('arbeidstidsteg');

    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <Systemtittel className={cls.element('tittel')} tag="h2">
                Arbeidstid og oppstart
            </Systemtittel>
            <Normaltekst>Startdato</Normaltekst>
            <Datovelger
                className={cls.element('datovelger')}
                velgDato={velgStartDato}
                dato={moment(props.avtale.startDato)}
                settRiktigFormatert={() => setStartDatoRiktigFormatert(true)}
                inputRiktigFormatert={startDatoRiktigFormatert}
            />
            <Normaltekst>Sluttdato</Normaltekst>
            <Datovelger
                className={cls.element('datovelger')}
                velgDato={velgSluttDato}
                dato={moment(props.avtale.sluttDato)}
                settRiktigFormatert={() => setSluttDatoRiktigFormatert(true)}
                inputRiktigFormatert={sluttDatoRiktigFormatert}
            />
            <StillingsprosentInput
                label="Hvilken stillingsprosent skal deltakeren ha?"
                verdi={props.avtale.arbeidstreningStillingprosent}
                settVerdi={_.partial(
                    props.settAvtaleVerdi,
                    'arbeidstreningStillingprosent'
                )}
            />
            <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} />

            <LagreKnapp
                className={cls.element('lagre-knapp')}
                label={'Lagre'}
                lagre={props.lagreAvtale}
                suksessmelding={'Avtale lagret'}
            />
        </Innholdsboks>
    );
};

export default medContext(ArbeidstidSteg);
