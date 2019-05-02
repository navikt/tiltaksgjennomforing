import * as React from 'react';
import MaskedInput from 'react-maskedinput';
import {
    erGyldigFormattertDato,
    inputDatostringTilISODate,
    ISODateTilInputDatostring,
} from './moment-utils';
import { Moment } from 'moment';
import { datoIkkeTilbakeITid } from '../../../utils/datoUtils';

interface Props {
    valgtDato: Moment;
    velgDato: (dato: Moment) => void;
    inputErRiktigFormatert: (riktigFormatert: boolean) => void;
    datoTilbakeITid: (tilbakeITid: boolean) => void;
    className: string;
}

class DatoInputfelt extends React.Component<Props> {
    endreDatoHvisGyldigFormattert(datostring: string) {
        const datoDate = new Date(
            datostring.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')
        );

        if (erGyldigFormattertDato(datostring)) {
            this.props.inputErRiktigFormatert(true);
            if (!datoIkkeTilbakeITid(datoDate)) {
                this.props.datoTilbakeITid(true);
            } else {
                this.props.velgDato(inputDatostringTilISODate(datostring));
                this.props.datoTilbakeITid(false);
            }
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
