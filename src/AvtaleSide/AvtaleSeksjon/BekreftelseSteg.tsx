import KnappBase, { Knapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import StegProps from '../StegProps';

const BekreftelseSteg = (props: AvtaleProps & StegProps) => {
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
                        <li>{props.form.personfnr}</li>
                        <li>{props.form.persontlf}</li>
                        <li>{props.form.personnavn}</li>
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
                <SkjemaGruppe title={'Målsetninger'}>
                    <ul>{malsetninger}</ul>
                </SkjemaGruppe>
            </PanelBase>

            <PanelBase>
                <SkjemaGruppe
                    className={'bekreft'}
                    title={'Bekreft innhold i avtalen (ikke implementert)'}
                >
                    <Knapp>Bekreft som bruker</Knapp>
                    <Knapp>Bekreft som arbeidsgiver</Knapp>
                    <Knapp>Bekreft som NAV-veileder</Knapp>
                </SkjemaGruppe>
            </PanelBase>
        </PanelBase>
    );
};

export default BekreftelseSteg;
