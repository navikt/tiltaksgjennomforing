import { Knapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import StegProps from '../StegProps';
import * as moment from 'moment';

const BekreftelseSteg = (props: AvtaleProps & StegProps) => {
    const startdato = moment(props.form.startDatoTimestamp).format(
        'DD.MM.YYYY'
    );
    const sluttdato = moment(props.form.sluttDatoTimestamp).format(
        'DD.MM.YYYY'
    );

    const malsetninger = props.form.malsetninger.map(malsetning => (
        <li key={malsetning.kategori}>
            {malsetning.kategori} {malsetning.beskrivelse}
        </li>
    ));

    return (
        <PanelBase>
            <PanelBase>
                <Systemtittel>Innhold i avtalen</Systemtittel>
            </PanelBase>
            <PanelBase>
                <SkjemaGruppe title={'Person'}>
                    <ul>
                        <li>{props.form.deltakerFornavn}</li>
                        <li>{props.form.deltakerEtternavn}</li>
                        <li>{props.form.deltakerAdresse}</li>
                        <li>{props.form.deltakerPostnummer}</li>
                        <li>{props.form.deltakerPoststed}</li>
                    </ul>
                </SkjemaGruppe>
                <SkjemaGruppe title={'Arbeidsgiver'}>
                    <ul>
                        <li>{props.form.arbeidsgiverorgnr}</li>
                        <li>{props.form.arbeidsgivernavn}</li>
                        <li>{props.form.arbeidsgiverkontaktperson}</li>
                        <li>{props.form.arbeidsgivertlf}</li>
                    </ul>
                </SkjemaGruppe>
                <SkjemaGruppe title={'Dato- og arbeidstid'}>
                    <ul>
                        <li>{startdato}</li>
                        <li>{sluttdato}</li>
                    </ul>
                </SkjemaGruppe>
                <SkjemaGruppe title={'Målsetninger'}>
                    <ul>{malsetninger}</ul>
                </SkjemaGruppe>
            </PanelBase>

            <PanelBase>
                <SkjemaGruppe
                    className={'bekreft'}
                    title={'Bekreft innhold i avtalen'}
                >
                    <div>
                        <Knapp
                            disabled={props.form.bekreftetAvBruker}
                            onClick={() =>
                                props.endreVerdi('bekreftetAvBruker', true)
                            }
                        >
                            Bekreft som bruker
                        </Knapp>
                        {props.form.bekreftetAvBruker &&
                            'Avtalen er bekreftet av bruker'}
                    </div>
                    <div>
                        <Knapp
                            disabled={props.form.bekreftetAvArbeidsgiver}
                            onClick={() =>
                                props.endreVerdi(
                                    'bekreftetAvArbeidsgiver',
                                    true
                                )
                            }
                        >
                            Bekreft som arbeidsgiver
                        </Knapp>
                        {props.form.bekreftetAvArbeidsgiver &&
                            'Avtalen er bekreftet av arbeidsgiver'}
                    </div>
                    <div>
                        <Knapp
                            disabled={props.form.bekreftetAvVeileder}
                            onClick={() =>
                                props.endreVerdi('bekreftetAvVeileder', true)
                            }
                        >
                            Bekreft som NAV-veileder
                        </Knapp>
                        {props.form.bekreftetAvVeileder &&
                            'Avtalen er bekreftet av NAV-veileder'}
                    </div>
                </SkjemaGruppe>
            </PanelBase>
        </PanelBase>
    );
};

export default BekreftelseSteg;
