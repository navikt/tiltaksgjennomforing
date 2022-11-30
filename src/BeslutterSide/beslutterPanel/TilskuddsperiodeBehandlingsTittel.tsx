import React, {FunctionComponent, useContext} from "react";
import {Normaltekst, Undertittel} from "nav-frontend-typografi";
import {TilskuddPeriodeStatus} from "@/types/avtale";
import BEMHelper from "@/utils/bem";
import {AvtaleContext} from "@/AvtaleProvider";
import {formatterDato, NORSK_DATO_FORMAT} from "@/utils/datoUtils";


const TilskuddsperiodeBehandlingsTittel: FunctionComponent = () => {
    const cls = BEMHelper('beslutter-panel');
    const { avtale } = useContext(AvtaleContext)

    if(!avtale.gjeldendeTilskuddsperiode) return null;

    const tittel: { [key in TilskuddPeriodeStatus]: string } = {
        AVSLÅTT: 'Tilskuddsperiode er avslått',
        GODKJENT: 'Tilskuddsperiode er godkjent',
        UBEHANDLET: 'Tilskuddsperiode som skal godkjennes',
        ANNULLERT: 'Tilskuddsperiode er annullert',
        BEHANDLET_I_ARENA: 'Tilskuddsperiode er behandlet i Arena'
    };

    return (
        <div className={cls.element('tittel')}>
            <Undertittel>{tittel[avtale.gjeldendeTilskuddsperiode.status]}</Undertittel>
            <Normaltekst>{formatterDato(avtale.opprettetTidspunkt, NORSK_DATO_FORMAT)}</Normaltekst>
        </div>
    )
}
export default TilskuddsperiodeBehandlingsTittel;