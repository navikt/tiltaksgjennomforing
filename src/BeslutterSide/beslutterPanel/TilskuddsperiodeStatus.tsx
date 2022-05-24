import React, {FunctionComponent, useContext} from "react";
import {Normaltekst} from "nav-frontend-typografi";
import {formatterDato, NORSK_DATO_OG_TID_FORMAT} from "@/utils/datoUtils";
import {tilskuddsperiodeAvslagTekst} from "@/messages";
import {TilskuddsperiodeContext} from "@/BeslutterSide/BeslutterSide";


const TilskuddsperiodeStatus: FunctionComponent = () => {
    const { periode } = useContext(TilskuddsperiodeContext);
    if(!periode) return null;

    return (
        <>
            {periode.status === 'GODKJENT' && (
                <Normaltekst>
                    Tilskuddsperioden ble godkjent av{' '}
                    <b>{periode.godkjentAvNavIdent}</b> den{' '}
                    <b>
                        {formatterDato(
                            periode.godkjentTidspunkt!,
                            NORSK_DATO_OG_TID_FORMAT
                        )}
                    </b>
                    . Kostnadssted: <b>{periode.enhet}</b>.
                </Normaltekst>
            )}
            {periode.status === 'AVSLÅTT' && (
                <Normaltekst>
                    Tilskuddsperioden ble avslått av{' '}
                    <b>{periode.avslåttAvNavIdent}</b> den{' '}
                    {formatterDato(
                        periode.avslåttTidspunkt!,
                        NORSK_DATO_OG_TID_FORMAT
                    )}{' '}
                    med følgende årsak(er):
                    <ul>
                        {Array.from(periode.avslagsårsaker).map((årsak, index) => (
                            <li key={index}>{tilskuddsperiodeAvslagTekst[årsak]}</li>
                        ))}
                    </ul>
                    med forklaringen: {periode.avslagsforklaring}
                </Normaltekst>
            )}
        </>
    )
}
export default TilskuddsperiodeStatus;