import React, { FunctionComponent, useContext, useState} from "react";
import {Element} from "nav-frontend-typografi";
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";
import {Checkbox, SkjemaGruppe} from "nav-frontend-skjema";
import {tilskuddsperiodeAvslagTekst} from "@/messages";
import {Avslagsårsaker} from "@/types/avtale";
import PakrevdTextarea from "@/komponenter/PakrevdTextarea/PakrevdTextarea";
import LagreKnapp from "@/komponenter/LagreKnapp/LagreKnapp";
import BEMHelper from "@/utils/bem";
import {AvtaleContext} from "@/AvtaleProvider";
import {TilskuddsperiodeContext} from "@/BeslutterSide/BeslutterSide";


const TilskuddsperiodeVisAvslag: FunctionComponent = () => {
    const cls = BEMHelper('beslutter-panel');
    const [avslagsforklaring, setAvslagsforklaring] = useState('');
    const [avslagsårsaker, setAvslagsårsaker] = useState(new Set<Avslagsårsaker>());
    const { avslåTilskudd } = useContext(AvtaleContext);
    const { visAvslag, setVisAvslag } = useContext(TilskuddsperiodeContext);

    if(!visAvslag) return null;

    return (
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
                    await avslåTilskudd(avslagsårsaker, avslagsforklaring);
                    setVisAvslag(false);
                }}
            />
        </div>
    )
}
export default TilskuddsperiodeVisAvslag;