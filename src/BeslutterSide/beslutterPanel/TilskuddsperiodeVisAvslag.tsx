import React, { FunctionComponent, useContext, useState} from "react";
import {Element, Normaltekst} from "nav-frontend-typografi";
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";
import {Checkbox, SkjemaGruppe} from "nav-frontend-skjema";
import {tilskuddsperiodeAvslagTekst} from "@/messages";
import {Avslagsårsaker} from "@/types/avtale";
import PakrevdTextarea from "@/komponenter/PakrevdTextarea/PakrevdTextarea";
import LagreKnapp from "@/komponenter/LagreKnapp/LagreKnapp";
import BEMHelper from "@/utils/bem";
import {AvtaleContext, Context} from "@/AvtaleProvider";
import {Periode, TilskuddsperiodeContext} from "@/BeslutterSide/BeslutterSide";
import BekreftelseModal from "@/komponenter/modal/BekreftelseModal";


const TilskuddsperiodeVisAvslag: FunctionComponent = () => {
    const cls = BEMHelper('beslutter-panel');
    const [avslagsforklaring, setAvslagsforklaring] = useState('');
    const [avslagsårsaker, setAvslagsårsaker] = useState(new Set<Avslagsårsaker>());

    const { avslåTilskudd } = useContext<Context>(AvtaleContext);
    const { visAvslag, setVisAvslag } = useContext<Periode>(TilskuddsperiodeContext);

    if(!visAvslag) return null;

    return (
        <>
            <BekreftelseModal
                bekreftOnClick={async () => {
                await avslåTilskudd(avslagsårsaker, avslagsforklaring);
                setVisAvslag(false);
                }}
                modalIsOpen={visAvslag}
                oversiktTekst="Send avslag til veileder"
                varselTekst={
                <>
                    <Normaltekst className={cls.element('avslagtext-subingress')}>
                        Veileder vil få en varsling i avtaleløsningen med årsak til retur og forklaring.
                    </Normaltekst>
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
                        <div className={cls.element('avslagsforklaring-wrapper')}>
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
                </div>
                </>
            }
                bekreftelseTekst="Send avslag"
                avbrytelseTekst="Avbryt"
                lukkModal={() => setVisAvslag(false)}
            />
        </>
    )
}
export default TilskuddsperiodeVisAvslag;