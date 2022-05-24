import { AvtaleContext } from '@/AvtaleProvider';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import React, {FunctionComponent, useContext, useState} from 'react';
import EtikettStatus from '../EtikettStatus';
import BEMHelper from "@/utils/bem";
import "./beslutterTilskuddsperioder.less";
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import HorizontalSpacer from "@/komponenter/layout/HorizontalSpacer";
import BekreftelseModal from "@/komponenter/modal/BekreftelseModal";
import {TilskuddsperiodeContext} from "@/BeslutterSide/BeslutterSide";
import {TilskuddsPeriode} from "@/types/avtale";

interface Props {
    startAnimering: () => void;
}

const BeslutterTilskuddsPerioder: FunctionComponent<Props> = props => {
    const { avtale, godkjennTilskudd } = useContext(AvtaleContext);
    const { enhet, setEnhetFeil, setVisAvslag, visAvslag } = useContext(TilskuddsperiodeContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    const [godkjennModalÅpen, setGodkjennModalÅpen] = useState(false);
    const cls = BEMHelper('beslutter-tilskuddsperioder');

    if(avtale.tilskuddPeriode.length < 1) return null;

    const localDateTimeFormat = (date: string) => {
       const datetime = new Date(date)
           if(datetime.toDateString() === 'Invalid Date') return '';
            return datetime.toLocaleDateString('no-NO', {year: '2-digit', month: '2-digit', day: '2-digit'})
    }

    const settStylingUtifraLopenr = (løpenummer: number): string => {
        if(løpenummer === gjeldendeTilskuddsperiode?.løpenummer) return 'gjeldende';
        if(løpenummer - 1 === gjeldendeTilskuddsperiode?.løpenummer) return 'neste'
        return '';
    }

    return (
        <div className={cls.className}>
            <Undertittel className={cls.element('tittel')}>Tilskudd som skal godkjennes</Undertittel>
            <div className={cls.element('container')}>
            <table className={'tabell'}>
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Periode</th>
                        <th>Beløp</th>
                        <th>Sats</th>
                        <th>besluttes f.o.m.</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {avtale.tilskuddPeriode.map((periode, index) => {
                        const gjeldende = periode.løpenummer === gjeldendeTilskuddsperiode?.løpenummer
                        return (
                            <React.Fragment key={index}>
                                <tr
                                    key={index}
                                    className={cls.element('tilskuddsperiode-rad',
                                        settStylingUtifraLopenr(periode.løpenummer))}
                                >
                                    <td>{periode.løpenummer}</td>
                                    <td aria-label={`Startdato ${periode.startDato} og sluttdato ${periode.sluttDato}`}>
                                        {localDateTimeFormat(periode.startDato)} -
                                        {localDateTimeFormat(periode.sluttDato)}
                                    </td>
                                    <td>{formatterPenger(periode.beløp)}</td>
                                    <td>{formatterProsent(periode.lonnstilskuddProsent)}</td>
                                    <td>{formatterDato(periode.kanBesluttesFom, NORSK_DATO_FORMAT)}</td>
                                    <td>
                                        <EtikettStatus tilskuddsperiodestatus={periode.status} />
                                    </td>
                                </tr>
                                {gjeldende && (
                                    <tr  className={cls.element('knapp-row')}>
                                        <td className={cls.element('knapp-data')}>
                                            <Hovedknapp
                                                onClick={() => {
                                                    if (!enhet.match(/\d{4}/)) {
                                                        setEnhetFeil('Enhet må bestå av 4 siffer');
                                                        return;
                                                    }
                                                    setGodkjennModalÅpen(true);
                                                }}
                                            >
                                                Godkjenn tilskuddsperiode
                                            </Hovedknapp>
                                            <HorizontalSpacer rem={1} />
                                            <Knapp onClick={() => setVisAvslag(!visAvslag)}>
                                                Avslå med forklaring
                                            </Knapp>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        )})}
                </tbody>
            </table>
            </div>
            <BekreftelseModal
                bekreftOnClick={async () => {
                    await godkjennTilskudd(enhet);
                    setGodkjennModalÅpen(false);
                }}
                modalIsOpen={godkjennModalÅpen}
                oversiktTekst="Godkjenn tilskuddsperiode"
                varselTekst="Du kan ikke gjøre endringer etter at du har godkjent tilskuddsperioden."
                bekreftelseTekst="Godkjenn tilskuddsperiode"
                avbrytelseTekst="Avbryt"
                lukkModal={() => setGodkjennModalÅpen(false)}
            />
        </div>
    );
};

export default BeslutterTilskuddsPerioder;
