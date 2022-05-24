import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {TilskuddsPeriode} from "@/types/avtale";
import {AvtaleContext} from "@/AvtaleProvider";
import BEMHelper from "@/utils/bem";
import InfoVisningTilskuddsperiode from "@/BeslutterSide/beslutterPanel/InfoVisningTilskuddsperiode";
import TilskuddsperiodeBehandlingsTittel from "@/BeslutterSide/beslutterPanel/TilskuddsperiodeBehandlingsTittel";
import TilskuddsperiodeUbehandlet from "@/BeslutterSide/beslutterPanel/TilskuddsperiodeUbehandlet";
import {TilskuddsperiodeContext} from "@/BeslutterSide/BeslutterSide";
import "./beslutterPanel.less";
import TilskuddsperiodeVisAvslag from "@/BeslutterSide/beslutterPanel/TilskuddsperiodeVisAvslag";
import TilskuddsperiodeStatus from "@/BeslutterSide/beslutterPanel/TilskuddsperiodeStatus";

const BeslutterPanel: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const { periode, setPeriode } = useContext(TilskuddsperiodeContext)
    const cls = BEMHelper('beslutter-panel');
    const { gjeldendeTilskuddsperiode } = avtaleContext.avtale;


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
            <TilskuddsperiodeVisAvslag visAvslag={visAvslag} setVisAvslag={setVisAvslag} />
            <TilskuddsperiodeStatus />
        </div>
    )
}
export default BeslutterPanel;