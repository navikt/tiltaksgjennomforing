import React, {FunctionComponent, useContext} from "react";
import {Undertittel} from "nav-frontend-typografi";
import {TilskuddPeriodeStatus, TilskuddsPeriode} from "@/types/avtale";
import BEMHelper from "@/utils/bem";
import EtikettStatus from "@/BeslutterSide/EtikettStatus";
import {TilskuddsperiodeContext} from "@/BeslutterSide/BeslutterSide";

interface Props {
    gjeldendeTilskuddsperiode: TilskuddsPeriode
}

const TilskuddsperiodeBehandlingsTittel: FunctionComponent<Props> = ({ gjeldendeTilskuddsperiode }: Props) => {
    const cls = BEMHelper('beslutter-side');
    const { periode } = useContext(TilskuddsperiodeContext)

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
            {periode &&
                <div className={cls.element('tittel-etikett2')}>
                    <EtikettStatus tilskuddsperiodestatus={periode?.status} />
                </div>
            }
        </div>
    )
}
export default TilskuddsperiodeBehandlingsTittel;