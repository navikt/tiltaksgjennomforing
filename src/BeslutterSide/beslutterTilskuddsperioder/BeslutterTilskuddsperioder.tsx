import { AvtaleContext } from '@/AvtaleProvider';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterProsent } from '@/utils/formatterProsent';
import { formatterPenger } from '@/utils/PengeUtils';
import React, { FunctionComponent, useContext } from 'react';
import EtikettStatus from '../EtikettStatus';
import BEMHelper from "@/utils/bem";
import {TilskuddsperiodeContext} from "@/BeslutterSide/BeslutterSide";
import "./beslutterTilskuddsperioder.less";

interface Props {
    startAnimering: () => void;
}

const BeslutterTilskuddsPerioder: FunctionComponent<Props> = props => {
    const { avtale } = useContext(AvtaleContext);
    const { setPeriode, periode } = useContext(TilskuddsperiodeContext)
    const cls = BEMHelper('beslutter-tilskuddsperioder');

    if(avtale.tilskuddPeriode.length < 1) return null;

    const localDateTimeFormat = (date: string) => {
       const datetime = new Date(date)
           if(datetime.toDateString() === 'Invalid Date') return '';
            return datetime.toLocaleDateString('no-NO', {year: '2-digit', month: '2-digit', day: '2-digit'})
    }
    return (
        <div>
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
                    {avtale.tilskuddPeriode.map((perioden, index) => {
                        const valgtrad = perioden.id === periode?.id;
                        return (
                        <tr
                            key={index}
                            className={cls.element('tilskuddsperiode-rad', valgtrad ? 'valgtrad' : '')}
                            onClick={() => setPeriode(perioden)}
                        >
                            <td>{perioden.løpenummer}</td>
                            <td aria-label={`Startdato ${perioden.startDato} og sluttdato ${perioden.sluttDato}`}>
                                {localDateTimeFormat(perioden.startDato)} - {localDateTimeFormat(perioden.sluttDato)}
                            </td>
                            <td>{formatterPenger(perioden.beløp)}</td>
                            <td>{formatterProsent(perioden.lonnstilskuddProsent)}</td>
                            <td>{formatterDato(perioden.kanBesluttesFom, NORSK_DATO_FORMAT)}</td>
                            <td>
                                <EtikettStatus tilskuddsperiodestatus={perioden.status} />
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    );
};

export default BeslutterTilskuddsPerioder;
