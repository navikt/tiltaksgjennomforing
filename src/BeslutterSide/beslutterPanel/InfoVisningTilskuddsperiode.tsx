import React, {FunctionComponent} from "react";
import {formatterPeriode} from "@/utils/datoUtils";
import {formatterProsent} from "@/utils/formatterProsent";
import {formatterPenger} from "@/utils/PengeUtils";
import HentNavEnhetFraContext from "@/utils/HentNavEnhetFraContext";
import {Avtale, TilskuddsPeriode} from "@/types/avtale";
import BEMHelper from "@/utils/bem";
import InfoRadBesluttervisning from "@/BeslutterSide/beslutterPanel/InfoRadBesluttervisning";

interface Props {
    avtale: Avtale;
    periode: TilskuddsPeriode;
}

const InfoVisningTilskuddsperiode: FunctionComponent<Props> = ({ avtale, periode }: Props) => {
    const cls = BEMHelper('beslutter-side');
    if(!periode) return null;

    return (
        <div className={cls.element('grid-container')}>
            <div className={cls.element('infovisning-status')}>
                <InfoRadBesluttervisning
                    metadata="løpenummer"
                    info={periode.løpenummer}
                    />
            </div>
            <div className={cls.element('infovisning-gruppe')}>
                <InfoRadBesluttervisning
                    metadata="Avtalenummer"
                    info={avtale.avtaleNr}
                />
                <InfoRadBesluttervisning
                    metadata="Deltaker"
                    info={`${avtale.gjeldendeInnhold.deltakerFornavn + ' '
                    + avtale.gjeldendeInnhold.deltakerEtternavn}`}
                />
            </div>
            <div className={cls.element('infovisning-gruppe')}>
                <InfoRadBesluttervisning
                    metadata="Arbeidsgiver"
                    info={avtale.gjeldendeInnhold.bedriftNavn}
                />
                <InfoRadBesluttervisning
                    metadata="Periode"
                    info={formatterPeriode(periode.startDato, periode.sluttDato)}
                />
            </div>
            <div className={cls.element('infovisning-gruppe')}>
                <InfoRadBesluttervisning
                    metadata="Tilskuddsprosent"
                    info={formatterProsent(periode.lonnstilskuddProsent)}
                />
                <InfoRadBesluttervisning
                    metadata="Beløp"
                    info={formatterPenger(periode.beløp)}
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
            </div>
        </div>
    )
}
export default InfoVisningTilskuddsperiode;