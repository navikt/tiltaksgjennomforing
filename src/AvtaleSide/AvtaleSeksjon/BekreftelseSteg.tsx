import { Knapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import * as moment from 'moment';
import { Context, medContext } from '../avtaleContext';

const BekreftelseSteg = (props: Context) => {
    const startdato = moment(props.avtale.startDatoTimestamp).format(
        'DD.MM.YYYY'
    );
    const sluttdato = moment(props.avtale.sluttDatoTimestamp).format(
        'DD.MM.YYYY'
    );

    const maalsetninger = props.avtale.maalsetninger.map(maalsetning => (
        <li key={maalsetning.kategori}>
            {maalsetning.kategori} {maalsetning.beskrivelse}
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
                        <li>{props.avtale.deltakerFornavn}</li>
                        <li>{props.avtale.deltakerEtternavn}</li>
                        <li>{props.avtale.deltakerAdresse}</li>
                        <li>{props.avtale.deltakerPostnummer}</li>
                        <li>{props.avtale.deltakerPoststed}</li>
                    </ul>
                </SkjemaGruppe>
                <SkjemaGruppe title={'Arbeidsgiver'}>
                    <ul>
                        <li>{props.avtale.bedriftNavn}</li>
                        <li>{props.avtale.bedriftAdresse}</li>
                        <li>{props.avtale.bedriftPostnummer}</li>
                        <li>{props.avtale.bedriftPoststed}</li>
                        <li>{props.avtale.arbeidsgiverFornavn}</li>
                        <li>{props.avtale.arbeidsgiverEtternavn}</li>
                        <li>{props.avtale.arbeidsgiverEpost}</li>
                        <li>{props.avtale.arbeidsgiverTlf}</li>
                        <li>{props.avtale.veilederFornavn}</li>
                        <li>{props.avtale.veilederEtternavn}</li>
                        <li>{props.avtale.veilederEpost}</li>
                        <li>{props.avtale.veilederTlf}</li>
                    </ul>
                </SkjemaGruppe>
                <SkjemaGruppe title={'Dato- og arbeidstid'}>
                    <ul>
                        <li>{startdato}</li>
                        <li>{sluttdato}</li>
                    </ul>
                </SkjemaGruppe>
                <SkjemaGruppe title={'Målsetninger'}>
                    <ul>{maalsetninger}</ul>
                </SkjemaGruppe>
            </PanelBase>

            <PanelBase>
                <SkjemaGruppe
                    className={'bekreft'}
                    title={'Bekreft innhold i avtalen'}
                >
                    <div>
                        <Knapp
                            disabled={props.avtale.bekreftetAvBruker}
                            onClick={() =>
                                props.settAvtaleVerdi('bekreftetAvBruker', true)
                            }
                        >
                            Bekreft som bruker
                        </Knapp>
                        {props.avtale.bekreftetAvBruker &&
                            'Avtalen er bekreftet av bruker'}
                    </div>
                    <div>
                        <Knapp
                            disabled={props.avtale.bekreftetAvArbeidsgiver}
                            onClick={() =>
                                props.settAvtaleVerdi(
                                    'bekreftetAvArbeidsgiver',
                                    true
                                )
                            }
                        >
                            Bekreft som arbeidsgiver
                        </Knapp>
                        {props.avtale.bekreftetAvArbeidsgiver &&
                            'Avtalen er bekreftet av arbeidsgiver'}
                    </div>
                    <div>
                        <Knapp
                            disabled={props.avtale.bekreftetAvVeileder}
                            onClick={() =>
                                props.settAvtaleVerdi(
                                    'bekreftetAvVeileder',
                                    true
                                )
                            }
                        >
                            Bekreft som NAV-veileder
                        </Knapp>
                        {props.avtale.bekreftetAvVeileder &&
                            'Avtalen er bekreftet av NAV-veileder'}
                    </div>
                </SkjemaGruppe>
            </PanelBase>
        </PanelBase>
    );
};

export default medContext(BekreftelseSteg);
