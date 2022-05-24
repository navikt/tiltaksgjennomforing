import React, {FunctionComponent, useContext} from "react";
import {Normaltekst} from "nav-frontend-typografi";
import {formatterDato, NORSK_DATO_OG_TID_FORMAT} from "@/utils/datoUtils";
import {tilskuddsperiodeAvslagTekst} from "@/messages";
import {AvtaleContext} from "@/AvtaleProvider";


const TilskuddsperiodeStatus: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    if(!gjeldendeTilskuddsperiode) return null;

    return (
        <>
            {gjeldendeTilskuddsperiode.status === 'GODKJENT' && (
                <Normaltekst>
                    Tilskuddsperioden ble godkjent av{' '}
                    <b>{gjeldendeTilskuddsperiode.godkjentAvNavIdent}</b> den{' '}
                    <b>
                        {formatterDato(
                            gjeldendeTilskuddsperiode.godkjentTidspunkt!,
                            NORSK_DATO_OG_TID_FORMAT
                        )}
                    </b>
                    . Kostnadssted: <b>{gjeldendeTilskuddsperiode.enhet}</b>.
                </Normaltekst>
            )}
            {gjeldendeTilskuddsperiode.status === 'AVSLÅTT' && (
                <Normaltekst>
                    Tilskuddsperioden ble avslått av{' '}
                    <b>{gjeldendeTilskuddsperiode.avslåttAvNavIdent}</b> den{' '}
                    {formatterDato(
                        gjeldendeTilskuddsperiode.avslåttTidspunkt!,
                        NORSK_DATO_OG_TID_FORMAT
                    )}{' '}
                    med følgende årsak(er):
                    <ul>
                        {Array.from(gjeldendeTilskuddsperiode.avslagsårsaker).map((årsak, index) => (
                            <li key={index}>{tilskuddsperiodeAvslagTekst[årsak]}</li>
                        ))}
                    </ul>
                    med forklaringen: {gjeldendeTilskuddsperiode.avslagsforklaring}
                </Normaltekst>
            )}
        </>
    )
}
export default TilskuddsperiodeStatus;