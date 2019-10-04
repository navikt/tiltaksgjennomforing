import * as _ from 'lodash';
import * as React from 'react';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import Datovelger from './Datovelger/Datovelger';
import moment, { Moment } from 'moment';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '@/AvtaleContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import Ukevelger from './Ukevelger/Ukevelger';
import StillingsprosentInput from './StillingsprosentInput/StillingsprosentInput';
import InfoBoks from './InfoBoks/InfoBoks';
import './ArbeidstidSteg.less';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

interface State {
    startDatoRiktigFormatert: boolean;
    stillingsprosentFeil?: SkjemaelementFeil;
    arbTreningLengdeFeil?: SkjemaelementFeil;
}

class ArbeidstidSteg extends React.Component<Context, State> {
    state: State = {
        startDatoRiktigFormatert: true,
        stillingsprosentFeil: undefined,
        arbTreningLengdeFeil: undefined,
    };

    velgStartDato = (dato: Moment) => {
        this.setState({
            startDatoRiktigFormatert: true,
        });
        this.props.settAvtaleVerdi(
            'startDato',
            dato.toISOString(true).split('+')[0]
        );
    };

    settStartDatoRiktigFormatert = (riktigFormatert: boolean) => {
        this.setState({ startDatoRiktigFormatert: riktigFormatert });
    };

    settArbeidstreningLengde = (verdi: number) => {
        this.props.settAvtaleVerdi('arbeidstreningLengde', verdi);

        if (verdi === 0) {
            this.setState({
                arbTreningLengdeFeil: {
                    feilmelding: 'Lengde på arbeidstreningen er påkrevd',
                },
            });
        } else {
            this.setState({ arbTreningLengdeFeil: undefined });
        }
    };

    render() {
        const timerIUka = Number(
            (
                (37.5 * this.props.avtale.arbeidstreningStillingprosent) /
                100
            ).toFixed(2)
        );
        const dagerIUka = Number(((timerIUka / 37.5) * 5).toFixed(2));

        return (
            <Innholdsboks utfyller="arbeidsgiver">
                <Systemtittel className="arbeidstidsteg__tittel" tag="h2">
                    Arbeidstid og oppstart
                </Systemtittel>
                <Normaltekst className="arbeidstidsteg__startdato-label">
                    Startdato
                </Normaltekst>
                <Datovelger
                    className="arbeidstidsteg__datovelger"
                    velgDato={this.velgStartDato}
                    dato={moment(this.props.avtale.startDato)}
                    settRiktigFormatert={this.settStartDatoRiktigFormatert}
                    inputRiktigFormatert={this.state.startDatoRiktigFormatert}
                />
                <Ukevelger
                    feilmelding={this.state.arbTreningLengdeFeil}
                    label="Hvor lenge skal arbeidstreningen vare?"
                    verdi={this.props.avtale.arbeidstreningLengde}
                    onChange={this.settArbeidstreningLengde}
                    min={1}
                    max={12}
                />
                <StillingsprosentInput
                    feilmelding={this.state.stillingsprosentFeil}
                    label="Hvilken stillingsprosent skal deltakeren ha?"
                    verdi={this.props.avtale.arbeidstreningStillingprosent}
                    settVerdi={_.partial(
                        this.props.settAvtaleVerdi,
                        'arbeidstreningStillingprosent'
                    )}
                />
                <InfoBoks timerIUka={timerIUka} dagerIUka={dagerIUka} />

                <LagreKnapp
                    className="arbeidstidsteg__lagre-knapp"
                    label={'Lagre'}
                    lagre={this.props.lagreAvtale}
                    suksessmelding={'Avtale lagret'}
                />
            </Innholdsboks>
        );
    }
}

export default medContext(ArbeidstidSteg);
