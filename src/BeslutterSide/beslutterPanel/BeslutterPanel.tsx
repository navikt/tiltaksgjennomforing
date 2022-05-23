import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {Element, Normaltekst} from "nav-frontend-typografi";
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";
import {formatterDato, NORSK_DATO_OG_TID_FORMAT} from "@/utils/datoUtils";
import {Checkbox, SkjemaGruppe} from "nav-frontend-skjema";
import {tilskuddsperiodeAvslagTekst} from "@/messages";
import {Avslagsårsaker, TilskuddsPeriode} from "@/types/avtale";
import PakrevdTextarea from "@/komponenter/PakrevdTextarea/PakrevdTextarea";
import LagreKnapp from "@/komponenter/LagreKnapp/LagreKnapp";
import {AvtaleContext} from "@/AvtaleProvider";
import BEMHelper from "@/utils/bem";
import InfoVisningTilskuddsperiode from "@/BeslutterSide/beslutterPanel/InfoVisningTilskuddsperiode";
import TilskuddsperiodeBehandlingsTittel from "@/BeslutterSide/beslutterPanel/TilskuddsperiodeBehandlingsTittel";
import TilskuddsperiodeUbehandlet from "@/BeslutterSide/beslutterPanel/TilskuddsperiodeUbehandlet";
import {TilskuddsperiodeContext} from "@/BeslutterSide/BeslutterSide";
import "./beslutterPanel.less";

const BeslutterPanel: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const { periode, setPeriode } = useContext(TilskuddsperiodeContext)
    const cls = BEMHelper('beslutter-panel');
    const { gjeldendeTilskuddsperiode } = avtaleContext.avtale;

    const [avslagsforklaring, setAvslagsforklaring] = useState('');
    const [avslagsårsaker, setAvslagsårsaker] = useState(new Set<Avslagsårsaker>());
    const [visAvslag, setVisAvslag] = useState(false);


    useEffect(() => {
        if(gjeldendeTilskuddsperiode) setPeriode(gjeldendeTilskuddsperiode)
    }, [gjeldendeTilskuddsperiode, setPeriode])


    if (!periode) {
        return <div>Ingen tilskuddsperioder</div>;
    }

    return (
        <div className={cls.className}>
            <TilskuddsperiodeBehandlingsTittel gjeldendeTilskuddsperiode={periode as TilskuddsPeriode} />
            <InfoVisningTilskuddsperiode avtale={avtaleContext.avtale} periode={periode} />
            <TilskuddsperiodeUbehandlet periode={periode} visAvslag={visAvslag} setVisAvslag={setVisAvslag} />

            <VerticalSpacer rem={1} />
            {visAvslag && (
                <div className={cls.element('avslag-boks')}>
                    <div className={cls.element('avslag-input')}>
                        <div>
                            <Element>Årsak til avslag</Element>
                            <VerticalSpacer rem={1} />
                            <SkjemaGruppe>
                                {Object.entries(tilskuddsperiodeAvslagTekst).map(([kode, tekst]) => {
                                    const avslagskode = kode as Avslagsårsaker;
                                    return (
                                        <Checkbox
                                            key={kode}
                                            label={tekst}
                                            checked={avslagsårsaker.has(avslagskode)}
                                            onChange={(event) => {
                                                const årsaker = new Set<Avslagsårsaker>(avslagsårsaker);
                                                if (event.currentTarget.checked) {
                                                    årsaker.add(avslagskode);
                                                } else {
                                                    årsaker.delete(avslagskode);
                                                }
                                                setAvslagsårsaker(årsaker);
                                            }}
                                        />
                                    );
                                })}
                            </SkjemaGruppe>
                        </div>
                        <div>
                            <PakrevdTextarea
                                className={cls.element('avslagsforklaring')}
                                label="Forklaring"
                                maxLengde={1000}
                                verdi={avslagsforklaring}
                                settVerdi={(verdi) => setAvslagsforklaring(verdi)}
                            />
                        </div>
                    </div>
                    <VerticalSpacer rem={1} />
                    <LagreKnapp
                        label="Send avslag"
                        lagre={async () => {
                            await avtaleContext.avslåTilskudd(avslagsårsaker, avslagsforklaring);
                            setVisAvslag(false);
                        }}
                    />
                </div>
            )}

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
        </div>
    )
}
export default BeslutterPanel;