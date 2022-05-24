import React, {FunctionComponent, useContext} from "react";
import {formatterPeriode} from "@/utils/datoUtils";
import HentNavEnhetFraContext from "@/utils/HentNavEnhetFraContext";
import BEMHelper from "@/utils/bem";
import InfoRadBesluttervisning from "@/BeslutterSide/beslutterPanel/InfoRadBesluttervisning";
import TilskuddsperiodeEndreKostnadssted from "@/BeslutterSide/beslutterPanel/TilskuddsperiodeEndreKostnadssted";
import {Element} from "nav-frontend-typografi";
import {AvtaleContext} from "@/AvtaleProvider";


const InfoVisningTilskuddsperiode: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext)
    const { gjeldendeTilskuddsperiode } = avtale;
    const cls = BEMHelper('beslutter-side');
    if(!gjeldendeTilskuddsperiode) return null;

    return (

        <>
            <InfoRadBesluttervisning
                metadata="Avtalenummer"
                info={avtale.avtaleNr}
            />

        <div className={cls.element('grid-container')}>

            <div className={cls.element('infovisning-gruppe')}>

                <InfoRadBesluttervisning
                    metadata="Deltaker"
                    info={`${avtale.gjeldendeInnhold.deltakerFornavn + ' '
                    + avtale.gjeldendeInnhold.deltakerEtternavn}`}
                />
                <InfoRadBesluttervisning
                    metadata="Arbeidsgiver"
                    info={avtale.gjeldendeInnhold.bedriftNavn}
                />
                <InfoRadBesluttervisning
                    metadata="Periode"
                    info={formatterPeriode(gjeldendeTilskuddsperiode.startDato, gjeldendeTilskuddsperiode.sluttDato)}
                    style={{minHeight: '2.5rem'}}
                />
            </div>
            <div className={cls.element('infovisning-gruppe')}>
                <InfoRadBesluttervisning
                    metadata="Geografisk enhet"
                    info={
                        <HentNavEnhetFraContext
                            enhetsnr="enhetGeografisk"
                            enhetsNavn="enhetsnavnGeografisk"
                        />}
                />
                <InfoRadBesluttervisning
                    metadata="Oppfølgingsenhet"
                    info={
                        <HentNavEnhetFraContext
                            enhetsnr="enhetOppfolging"
                            enhetsNavn="enhetsnavnOppfolging"
                        />}
                />
                <div className={cls.element('infovisning-rad')}>
                    <Element>Endre kostnadssted</Element>
                    <TilskuddsperiodeEndreKostnadssted />
                </div>



            </div>
        </div>
            </>
    )
}
export default InfoVisningTilskuddsperiode;