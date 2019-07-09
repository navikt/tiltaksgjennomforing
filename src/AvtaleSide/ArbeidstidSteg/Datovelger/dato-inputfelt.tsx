import * as React from 'react';
import MaskedInput from 'react-maskedinput';
import {
    erGyldigFormattertDato,
    inputDatostringTilISODate,
    ISODateTilInputDatostring,
} from './moment-utils';
import { Moment } from 'moment';
import { datoIkkeTilbakeITid } from '../../../utils/datoUtils';
import moment from 'moment';

interface Props {
    valgtDato: Moment;
    velgDato: (dato: Moment) => void;
    inputErRiktigFormatert: (riktigFormatert: boolean) => void;
    datoTilbakeITid: (tilbakeITid: boolean) => void;
    className: string;
}

class DatoInputfelt extends React.Component<Props> {
    endreDatoHvisGyldigFormattert(datostring: string) {
        const valgtDato = moment(datostring, 'DD.MM.YYYY').toDate();

        if (erGyldigFormattertDato(datostring)) {
            this.props.inputErRiktigFormatert(true);
            this.props.datoTilbakeITid(!datoIkkeTilbakeITid(valgtDato));
            this.props.velgDato(inputDatostringTilISODate(datostring));
        } else {
            this.props.inputErRiktigFormatert(false);
            this.props.datoTilbakeITid(false);
        }
    }

    render() {
        return (
            <MaskedInput
                type="tel"
                mask="11.11.1111"
                autoComplete="off"
                placeholder="dd.mm.åååå"
                className={`datovelger__input ${this.props.className}`}
                value={ISODateTilInputDatostring(this.props.valgtDato)}
                onBlur={event =>
                    this.endreDatoHvisGyldigFormattert(event.target.value)
                }
            />
        );
    }
}

export default DatoInputfelt;
