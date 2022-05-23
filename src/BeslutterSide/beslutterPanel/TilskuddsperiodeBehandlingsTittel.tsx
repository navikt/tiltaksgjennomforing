import React, {FunctionComponent} from "react";
import {Undertittel} from "nav-frontend-typografi";
import {TilskuddPeriodeStatus, TilskuddsPeriode} from "@/types/avtale";
import BEMHelper from "@/utils/bem";

interface Props {
    gjeldendeTilskuddsperiode: TilskuddsPeriode
}

const TilskuddsperiodeBehandlingsTittel: FunctionComponent<Props> = ({ gjeldendeTilskuddsperiode}: Props) => {
    const cls = BEMHelper('beslutter-side');

    const tittel: { [key in TilskuddPeriodeStatus]: string } = {
        AVSLÅTT: 'Tilskuddsperiode er avslått',
        GODKJENT: 'Tilskuddsperiode er godkjent',
        UBEHANDLET: 'Tilskuddsperiode som skal godkjennes',
        UTBETALT: 'Tilskuddsperiode er utbetalt',
        ANNULLERT: 'Tilskuddsperiode er annullert',
    };

    return (
        <div className={cls.element('tittel')}>
            <Undertittel>{tittel[gjeldendeTilskuddsperiode.status]}</Undertittel>

        </div>
    )
}
export default TilskuddsperiodeBehandlingsTittel;