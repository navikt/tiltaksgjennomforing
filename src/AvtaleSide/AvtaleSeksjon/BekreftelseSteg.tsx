import { Knapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { EndreAvtale } from '../EndreAvtale';
import StegProps from '../StegProps';
import * as moment from 'moment';
import { Avtale } from '../Avtale';

const BekreftelseSteg = (props: Avtale & EndreAvtale & StegProps) => {
    const startdato = moment(props.startDatoTimestamp).format('DD.MM.YYYY');
    const sluttdato = moment(props.sluttDatoTimestamp).format('DD.MM.YYYY');

    const malsetninger = props.malsetninger.map(malsetning => (
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
                        <li>{props.deltakerFornavn}</li>
                        <li>{props.deltakerEtternavn}</li>
                        <li>{props.deltakerAdresse}</li>
                        <li>{props.deltakerPostnummer}</li>
                        <li>{props.deltakerPoststed}</li>
                    </ul>
                </SkjemaGruppe>
                <SkjemaGruppe title={'Arbeidsgiver'}>
                    <ul>
                        <li>{props.bedriftNavn}</li>
                        <li>{props.bedriftAdresse}</li>
                        <li>{props.bedriftPostnummer}</li>
                        <li>{props.bedriftPoststed}</li>
                        <li>{props.arbeidsgiverFornavn}</li>
                        <li>{props.arbeidsgiverEtternavn}</li>
                        <li>{props.arbeidsgiverEpost}</li>
                        <li>{props.arbeidsgiverTlf}</li>
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
                            disabled={props.bekreftetAvBruker}
                            onClick={() =>
                                props.endreVerdi('bekreftetAvBruker', true)
                            }
                        >
                            Bekreft som bruker
                        </Knapp>
                        {props.bekreftetAvBruker &&
                            'Avtalen er bekreftet av bruker'}
                    </div>
                    <div>
                        <Knapp
                            disabled={props.bekreftetAvArbeidsgiver}
                            onClick={() =>
                                props.endreVerdi(
                                    'bekreftetAvArbeidsgiver',
                                    true
                                )
                            }
                        >
                            Bekreft som arbeidsgiver
                        </Knapp>
                        {props.bekreftetAvArbeidsgiver &&
                            'Avtalen er bekreftet av arbeidsgiver'}
                    </div>
                    <div>
                        <Knapp
                            disabled={props.bekreftetAvVeileder}
                            onClick={() =>
                                props.endreVerdi('bekreftetAvVeileder', true)
                            }
                        >
                            Bekreft som NAV-veileder
                        </Knapp>
                        {props.bekreftetAvVeileder &&
                            'Avtalen er bekreftet av NAV-veileder'}
                    </div>
                </SkjemaGruppe>
            </PanelBase>
        </PanelBase>
    );
};

export default BekreftelseSteg;
